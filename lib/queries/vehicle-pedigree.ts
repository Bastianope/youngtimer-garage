import { createClient } from "@/lib/supabase/server";

export const PUBLIC_BUCKET = "vehicle-media-public";
export const PRIVATE_BUCKET = "vehicle-media-private";

export type VehiclePhoto = { id: string; url: string; caption: string | null; isPublic: boolean; storagePath: string };

export type MaintenanceRecord = {
  id: string;
  status: "completed" | "planned";
  performedAt: string | null;
  mileageKm: number | null;
  dueDate: string | null;
  dueMileageKm: number | null;
  category: string;
  description: string | null;
  costAmount: number | null;
  isPublic: boolean;
};

export type VehicleEvent = { id: string; eventType: string; eventDate: string | null; title: string; description: string | null; isPublic: boolean };

export type VehicleOwnership = { id: string; ownerLabel: string | null; startedAt: string | null; endedAt: string | null; isCurrent: boolean; notes: string | null };

export async function getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_media")
    .select("id, storage_path, caption, is_public, position, created_at")
    .eq("vehicle_id", vehicleId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;

  const rows = data ?? [];
  const privatePaths = rows.filter((r) => !r.is_public).map((r) => r.storage_path as string);
  const signed = new Map<string, string>();
  if (privatePaths.length > 0) {
    const { data: urls } = await supabase.storage.from(PRIVATE_BUCKET).createSignedUrls(privatePaths, 3600);
    for (const u of urls ?? []) {
      if (u.path && u.signedUrl) signed.set(u.path, u.signedUrl);
    }
  }

  return rows.flatMap((r) => {
    const path = r.storage_path as string;
    const url = r.is_public
      ? supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(path).data.publicUrl
      : signed.get(path);
    if (!url) return [];
    return [{ id: r.id as string, url, caption: r.caption as string | null, isPublic: r.is_public as boolean, storagePath: path }];
  });
}

export async function getMaintenanceRecords(vehicleId: string): Promise<MaintenanceRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("maintenance_records")
    .select("id, status, performed_at, mileage_km, due_date, due_mileage_km, category, description, cost_amount, is_public")
    .eq("vehicle_id", vehicleId)
    .order("performed_at", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    status: r.status === "planned" ? "planned" : "completed",
    performedAt: r.performed_at,
    mileageKm: r.mileage_km,
    dueDate: r.due_date,
    dueMileageKm: r.due_mileage_km,
    category: r.category,
    description: r.description,
    costAmount: r.cost_amount === null ? null : Number(r.cost_amount),
    isPublic: r.is_public,
  }));
}

export async function getVehicleEvents(vehicleId: string): Promise<VehicleEvent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_events")
    .select("id, event_type, event_date, title, description, is_public")
    .eq("vehicle_id", vehicleId)
    .order("event_date", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    eventType: r.event_type,
    eventDate: r.event_date,
    title: r.title,
    description: r.description,
    isPublic: r.is_public,
  }));
}

// Lecture réservée au propriétaire (RLS)
export async function getVehicleOwnerships(vehicleId: string): Promise<VehicleOwnership[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_ownerships")
    .select("id, owner_label, started_at, ended_at, is_current, notes")
    .eq("vehicle_id", vehicleId)
    .order("started_at", { ascending: true, nullsFirst: true });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    ownerLabel: r.owner_label,
    startedAt: r.started_at,
    endedAt: r.ended_at,
    isCurrent: r.is_current,
    notes: r.notes,
  }));
}
