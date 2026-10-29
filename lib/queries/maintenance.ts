import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { IntervalOverride, ItemCategory, MaintenanceItemType } from "@/lib/maintenance/schedule";

export const DOCUMENTS_BUCKET = "vehicle-documents";

export type VehicleReminders = {
  ctDueDate: string | null;
  warrantyEndDate: string | null;
  warrantyEndMileageKm: number | null;
  insuranceRenewalDate: string | null;
};

export type MaintenanceDocument = {
  id: string;
  maintenanceRecordId: string | null;
  label: string | null;
  docType: string | null;
  isPdf: boolean;
  url: string | null;
  createdAt: string;
};

export async function getMaintenanceItemTypes(): Promise<MaintenanceItemType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_item_types")
    .select("code, label, category, default_interval_km, default_interval_months, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    code: r.code as string,
    label: r.label as string,
    category: r.category as ItemCategory,
    defaultIntervalKm: r.default_interval_km as number | null,
    defaultIntervalMonths: r.default_interval_months as number | null,
  }));
}

// Codes des éléments remplacés, par entretien (RLS : propriétaire, ou entretien public d'un véhicule public)
export async function getRecordItemCodes(recordIds: string[]): Promise<Record<string, string[]>> {
  const result: Record<string, string[]> = {};
  if (recordIds.length === 0) return result;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_record_items")
    .select("maintenance_record_id, item_type_code")
    .in("maintenance_record_id", recordIds);
  if (error) throw error;
  for (const row of data ?? []) {
    const id = row.maintenance_record_id as string;
    (result[id] ??= []).push(row.item_type_code as string);
  }
  return result;
}

export async function getIntervalOverrides(vehicleId: string): Promise<Record<string, IntervalOverride>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_maintenance_intervals")
    .select("item_type_code, interval_km, interval_months")
    .eq("vehicle_id", vehicleId);
  if (error) throw error;
  const result: Record<string, IntervalOverride> = {};
  for (const row of data ?? []) {
    result[row.item_type_code as string] = {
      intervalKm: row.interval_km as number | null,
      intervalMonths: row.interval_months as number | null,
    };
  }
  return result;
}

export async function getVehicleReminders(vehicleId: string): Promise<VehicleReminders> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_reminders")
    .select("ct_due_date, warranty_end_date, warranty_end_mileage_km, insurance_renewal_date")
    .eq("vehicle_id", vehicleId)
    .maybeSingle();
  if (error) throw error;
  return {
    ctDueDate: data?.ct_due_date ?? null,
    warrantyEndDate: data?.warranty_end_date ?? null,
    warrantyEndMileageKm: data?.warranty_end_mileage_km ?? null,
    insuranceRenewalDate: data?.insurance_renewal_date ?? null,
  };
}

// Factures et documents du véhicule, avec liens signés valables 1 h (propriétaire uniquement)
export async function getMaintenanceDocuments(vehicleId: string): Promise<MaintenanceDocument[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_documents")
    .select("id, storage_path, doc_type, label, maintenance_record_id, created_at")
    .eq("vehicle_id", vehicleId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  const rows = data ?? [];
  const signed = new Map<string, string>();
  if (rows.length > 0) {
    const { data: urls } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .createSignedUrls(rows.map((r) => r.storage_path as string), 3600);
    for (const u of urls ?? []) {
      if (u.path && u.signedUrl) signed.set(u.path, u.signedUrl);
    }
  }

  return rows.map((r) => {
    const path = r.storage_path as string;
    return {
      id: r.id as string,
      maintenanceRecordId: r.maintenance_record_id as string | null,
      label: r.label as string | null,
      docType: r.doc_type as string | null,
      isPdf: path.toLowerCase().endsWith(".pdf"),
      url: signed.get(path) ?? null,
      createdAt: r.created_at as string,
    };
  });
}
