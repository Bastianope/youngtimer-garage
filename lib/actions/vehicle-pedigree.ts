"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { PRIVATE_BUCKET, PUBLIC_BUCKET } from "@/lib/queries/vehicle-pedigree";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : null;
}

function int(formData: FormData, key: string): number | null {
  const value = text(formData, key);
  if (value === null) return null;
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n) : null;
}

function money(formData: FormData, key: string): number | null {
  const value = text(formData, key);
  if (value === null) return null;
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function done(vehicleId: string) {
  revalidatePath(`/vehicules/${vehicleId}`);
}

// ---------- Entretiens ----------

export async function addMaintenanceAction(vehicleId: string, formData: FormData): Promise<void> {
  const supabase = await createClient();
  const status = formData.get("status") === "planned" ? "planned" : "completed";
  const date = text(formData, "date");
  const mileage = int(formData, "mileageKm");

  const { error } = await supabase.from("maintenance_records").insert({
    vehicle_id: vehicleId,
    status,
    performed_at: status === "completed" ? date : null,
    mileage_km: status === "completed" ? mileage : null,
    due_date: status === "planned" ? date : null,
    due_mileage_km: status === "planned" ? mileage : null,
    category: text(formData, "category") ?? "other",
    description: text(formData, "description"),
    cost_amount: money(formData, "costAmount"),
    is_public: formData.get("isPublic") === "on",
  });
  if (error) throw new Error(`Entretien non enregistré : ${error.message}`);
  done(vehicleId);
}

export async function markMaintenanceDoneAction(vehicleId: string, recordId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("maintenance_records")
    .update({ status: "completed", performed_at: new Date().toISOString().slice(0, 10) })
    .eq("id", recordId)
    .eq("vehicle_id", vehicleId);
  if (error) throw new Error(`Mise à jour impossible : ${error.message}`);
  done(vehicleId);
}

export async function deleteMaintenanceAction(vehicleId: string, recordId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("maintenance_records").delete().eq("id", recordId).eq("vehicle_id", vehicleId);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  done(vehicleId);
}

// ---------- Historique : événements ----------

export async function addEventAction(vehicleId: string, formData: FormData): Promise<void> {
  const title = text(formData, "title");
  if (!title) throw new Error("Titre requis");
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_events").insert({
    vehicle_id: vehicleId,
    event_type: text(formData, "eventType") ?? "note",
    event_date: text(formData, "eventDate"),
    title,
    description: text(formData, "description"),
    is_public: formData.get("isPublic") === "on",
  });
  if (error) throw new Error(`Événement non enregistré : ${error.message}`);
  done(vehicleId);
}

export async function deleteEventAction(vehicleId: string, eventId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_events").delete().eq("id", eventId).eq("vehicle_id", vehicleId);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  done(vehicleId);
}

// ---------- Historique : propriétaires ----------

export async function addPreviousOwnerAction(vehicleId: string, formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_ownerships").insert({
    vehicle_id: vehicleId,
    user_id: null,
    is_current: false,
    owner_label: text(formData, "ownerLabel") ?? "Ancien propriétaire",
    started_at: text(formData, "startedAt"),
    ended_at: text(formData, "endedAt"),
    notes: text(formData, "notes"),
  });
  if (error) throw new Error(`Propriétaire non enregistré : ${error.message}`);
  done(vehicleId);
}

export async function deletePreviousOwnerAction(vehicleId: string, ownershipId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicle_ownerships")
    .delete()
    .eq("id", ownershipId)
    .eq("vehicle_id", vehicleId)
    .eq("is_current", false);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  done(vehicleId);
}

// ---------- Photos ----------

export async function registerPhotoAction(
  vehicleId: string,
  input: { storagePath: string; isPublic: boolean; caption: string | null },
): Promise<void> {
  if (!input.storagePath.startsWith(`${vehicleId}/`)) throw new Error("Chemin de photo invalide");
  const supabase = await createClient();
  const { error } = await supabase.from("vehicle_media").insert({
    vehicle_id: vehicleId,
    storage_path: input.storagePath,
    is_public: input.isPublic,
    caption: input.caption,
  });
  if (error) throw new Error(`Photo non enregistrée : ${error.message}`);
  done(vehicleId);
}

export async function deletePhotoAction(vehicleId: string, photoId: string): Promise<void> {
  const supabase = await createClient();
  const { data: photo, error: readError } = await supabase
    .from("vehicle_media")
    .select("storage_path, is_public")
    .eq("id", photoId)
    .eq("vehicle_id", vehicleId)
    .maybeSingle();
  if (readError) throw new Error(`Suppression impossible : ${readError.message}`);
  if (!photo) return;

  await supabase.storage.from(photo.is_public ? PUBLIC_BUCKET : PRIVATE_BUCKET).remove([photo.storage_path]);
  const { error } = await supabase.from("vehicle_media").delete().eq("id", photoId);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  done(vehicleId);
}
