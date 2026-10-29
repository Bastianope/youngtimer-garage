"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DOCUMENTS_BUCKET } from "@/lib/queries/maintenance";
import { replaceRecordItems, setCtFromInspection } from "@/lib/maintenance/records";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : null;
}

function int(formData: FormData, key: string): number | null {
  const value = text(formData, key);
  if (value === null) return null;
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function money(formData: FormData, key: string): number | null {
  const value = text(formData, key);
  if (value === null) return null;
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function done(vehicleId: string) {
  revalidatePath(`/vehicules/${vehicleId}`);
}

function checkPath(vehicleId: string, storagePath: string) {
  if (!storagePath.startsWith(`${vehicleId}/`) || storagePath.includes("..")) {
    throw new Error("Chemin de fichier invalide");
  }
}

// ---------- Compléter / modifier un entretien ----------

export async function updateMaintenanceAction(vehicleId: string, recordId: string, formData: FormData): Promise<void> {
  const supabase = await createClient();
  const performedAt = text(formData, "date");
  const category = text(formData, "category") ?? "other";
  const { error } = await supabase
    .from("maintenance_records")
    .update({
      performed_at: performedAt,
      mileage_km: int(formData, "mileageKm"),
      category,
      description: text(formData, "description"),
      cost_amount: money(formData, "costAmount"),
      is_public: formData.get("isPublic") === "on",
    })
    .eq("id", recordId)
    .eq("vehicle_id", vehicleId);
  if (error) throw new Error(`Entretien non mis à jour : ${error.message}`);

  await replaceRecordItems(recordId, formData.getAll("items").map(String));
  if (category === "inspection" && performedAt) await setCtFromInspection(vehicleId, performedAt);
  done(vehicleId);
}

// ---------- Facture prise en photo à la sortie du garage ----------
// Crée un entretien « fait aujourd'hui » et y rattache la facture ; l'utilisateur complète ensuite.

export async function quickInvoiceAction(vehicleId: string, input: { storagePath: string }): Promise<string> {
  checkPath(vehicleId, input.storagePath);
  const supabase = await createClient();
  const date = today();

  const { data: record, error } = await supabase
    .from("maintenance_records")
    .insert({
      vehicle_id: vehicleId,
      status: "completed",
      performed_at: date,
      category: "other",
      description: null,
      is_public: false,
    })
    .select("id")
    .single();
  if (error || !record) throw new Error(`Entretien non créé : ${error?.message ?? "erreur inconnue"}`);

  const { error: docError } = await supabase.from("vehicle_documents").insert({
    vehicle_id: vehicleId,
    maintenance_record_id: record.id,
    storage_path: input.storagePath,
    doc_type: "invoice",
    label: "Facture",
  });
  if (docError) throw new Error(`Facture non enregistrée : ${docError.message}`);

  done(vehicleId);
  return record.id as string;
}

// ---------- Ajouter un document à un entretien existant ----------

export async function attachDocumentAction(
  vehicleId: string,
  input: { storagePath: string; maintenanceRecordId: string | null; label: string | null; docType: string },
): Promise<void> {
  checkPath(vehicleId, input.storagePath);
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_documents").insert({
    vehicle_id: vehicleId,
    maintenance_record_id: input.maintenanceRecordId,
    storage_path: input.storagePath,
    doc_type: input.docType,
    label: input.label,
  });
  if (error) throw new Error(`Document non enregistré : ${error.message}`);
  done(vehicleId);
}

export async function deleteDocumentAction(vehicleId: string, documentId: string): Promise<void> {
  const supabase = await createClient();
  const { data: doc, error: readError } = await supabase
    .from("vehicle_documents")
    .select("storage_path")
    .eq("id", documentId)
    .eq("vehicle_id", vehicleId)
    .maybeSingle();
  if (readError) throw new Error(`Suppression impossible : ${readError.message}`);
  if (!doc) return;

  await supabase.storage.from(DOCUMENTS_BUCKET).remove([doc.storage_path as string]);
  const { error } = await supabase.from("vehicle_documents").delete().eq("id", documentId);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  done(vehicleId);
}

// ---------- Échéances : CT, garantie, assurance + type de véhicule ----------

export async function saveRemindersAction(vehicleId: string, formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_reminders").upsert(
    {
      vehicle_id: vehicleId,
      ct_due_date: text(formData, "ctDueDate"),
      warranty_end_date: text(formData, "warrantyEndDate"),
      warranty_end_mileage_km: int(formData, "warrantyEndMileageKm"),
      insurance_renewal_date: text(formData, "insuranceRenewalDate"),
    },
    { onConflict: "vehicle_id" },
  );
  if (error) throw new Error(`Échéances non enregistrées : ${error.message}`);

  const vehicleType = formData.get("vehicleType") === "van" ? "van" : "car";
  const { error: typeError } = await supabase.from("vehicles").update({ vehicle_type: vehicleType }).eq("id", vehicleId);
  if (typeError) throw new Error(`Type de véhicule non enregistré : ${typeError.message}`);
  done(vehicleId);
}

// ---------- Intervalles personnalisés ----------
// Champs « km_<code> » et « mo_<code> », préremplis avec l'intervalle en vigueur.
// Seules les valeurs différentes de l'intervalle indicatif sont enregistrées.

export async function saveIntervalsAction(
  vehicleId: string,
  defaults: { code: string; km: number | null; months: number | null }[],
  formData: FormData,
): Promise<void> {
  const supabase = await createClient();
  const rows = defaults
    .map((d) => ({
      vehicle_id: vehicleId,
      item_type_code: d.code,
      interval_km: int(formData, `km_${d.code}`),
      interval_months: int(formData, `mo_${d.code}`),
      defaultKm: d.km,
      defaultMonths: d.months,
    }))
    .filter((r) => r.interval_km !== r.defaultKm || r.interval_months !== r.defaultMonths)
    .map((r) => ({
      vehicle_id: r.vehicle_id,
      item_type_code: r.item_type_code,
      interval_km: r.interval_km,
      interval_months: r.interval_months,
    }));

  const { error: deleteError } = await supabase.from("vehicle_maintenance_intervals").delete().eq("vehicle_id", vehicleId);
  if (deleteError) throw new Error(`Intervalles non enregistrés : ${deleteError.message}`);
  if (rows.length > 0) {
    const { error } = await supabase.from("vehicle_maintenance_intervals").insert(rows);
    if (error) throw new Error(`Intervalles non enregistrés : ${error.message}`);
  }
  done(vehicleId);
}
