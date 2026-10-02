import { createClient } from "@/lib/supabase/server";
import { getCachedUser } from "@/lib/supabase/get-user";
import { PRIVATE_BUCKET, PUBLIC_BUCKET } from "@/lib/queries/vehicle-pedigree";

type VehicleJoin = {
  id: string;
  mileage_km: number | null;
  current_owner_user_id: string | null;
  car_generations: { car_models: { name: string; car_makes: { name: string } | null } | null } | null;
};

const VEHICLE_JOIN =
  "vehicles!inner(id, mileage_km, current_owner_user_id, car_generations(car_models(name, car_makes(name))))";

function vehicleName(v: VehicleJoin | VehicleJoin[] | null): string {
  const one = Array.isArray(v) ? v[0] : v;
  const model = one?.car_generations?.car_models;
  return model ? `${model.car_makes?.name ?? ""} ${model.name}`.trim() : "Véhicule";
}

function first(v: VehicleJoin | VehicleJoin[] | null): VehicleJoin | null {
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

export type TodoItem = {
  id: string;
  vehicleId: string;
  vehicleName: string;
  category: string;
  description: string | null;
  dueDate: string | null;
  dueMileageKm: number | null;
  overdue: boolean;
};

// Entretiens « à prévoir » de tous les véhicules de l'utilisateur
export async function getGarageTodos(): Promise<TodoItem[]> {
  const { data: auth } = await getCachedUser();
  if (!auth.user) return [];
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("maintenance_records")
    .select(`id, category, description, due_date, due_mileage_km, ${VEHICLE_JOIN}`)
    .eq("status", "planned")
    .eq("vehicles.current_owner_user_id", auth.user.id)
    .order("due_date", { ascending: true, nullsFirst: false })
    .limit(20);
  if (error) throw error;

  const today = new Date().toISOString().slice(0, 10);
  return (data ?? []).map((r) => {
    const v = first(r.vehicles as unknown as VehicleJoin | VehicleJoin[] | null);
    const overdueByDate = r.due_date !== null && r.due_date < today;
    const overdueByKm =
      r.due_mileage_km !== null && v?.mileage_km !== null && v?.mileage_km !== undefined && v.mileage_km >= r.due_mileage_km;
    return {
      id: r.id,
      vehicleId: v?.id ?? "",
      vehicleName: vehicleName(v),
      category: r.category,
      description: r.description,
      dueDate: r.due_date,
      dueMileageKm: r.due_mileage_km,
      overdue: overdueByDate || overdueByKm,
    };
  });
}

export type ActivityItem = {
  key: string;
  vehicleId: string;
  vehicleName: string;
  kind: "maintenance" | "event" | "photo";
  label: string;
  createdAt: string;
};

// Dernières entrées ajoutées : entretiens faits, moments marquants, photos
export async function getGarageActivity(limit = 8): Promise<ActivityItem[]> {
  const { data: auth } = await getCachedUser();
  if (!auth.user) return [];
  const supabase = await createClient();
  const uid = auth.user.id;

  const [maintenance, events, photos] = await Promise.all([
    supabase
      .from("maintenance_records")
      .select(`id, category, description, created_at, ${VEHICLE_JOIN}`)
      .eq("status", "completed")
      .eq("vehicles.current_owner_user_id", uid)
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("vehicle_events")
      .select(`id, title, created_at, ${VEHICLE_JOIN}`)
      .eq("vehicles.current_owner_user_id", uid)
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("vehicle_media")
      .select(`id, created_at, ${VEHICLE_JOIN}`)
      .eq("vehicles.current_owner_user_id", uid)
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const items: ActivityItem[] = [];
  for (const r of maintenance.data ?? []) {
    const v = first(r.vehicles as unknown as VehicleJoin | VehicleJoin[] | null);
    items.push({ key: `m-${r.id}`, vehicleId: v?.id ?? "", vehicleName: vehicleName(v), kind: "maintenance", label: r.description ?? r.category, createdAt: r.created_at });
  }
  for (const r of events.data ?? []) {
    const v = first(r.vehicles as unknown as VehicleJoin | VehicleJoin[] | null);
    items.push({ key: `e-${r.id}`, vehicleId: v?.id ?? "", vehicleName: vehicleName(v), kind: "event", label: r.title, createdAt: r.created_at });
  }
  for (const r of photos.data ?? []) {
    const v = first(r.vehicles as unknown as VehicleJoin | VehicleJoin[] | null);
    items.push({ key: `p-${r.id}`, vehicleId: v?.id ?? "", vehicleName: vehicleName(v), kind: "photo", label: "Nouvelle photo", createdAt: r.created_at });
  }

  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

// Première photo de chaque véhicule, pour les vignettes du garage
export async function getVehicleThumbnails(vehicleIds: string[]): Promise<Record<string, string>> {
  if (vehicleIds.length === 0) return {};
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicle_media")
    .select("vehicle_id, storage_path, is_public, position, created_at")
    .in("vehicle_id", vehicleIds)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return {};

  const firstByVehicle = new Map<string, { storage_path: string; is_public: boolean }>();
  for (const r of data ?? []) {
    if (!firstByVehicle.has(r.vehicle_id)) firstByVehicle.set(r.vehicle_id, r);
  }

  const result: Record<string, string> = {};
  for (const [vehicleId, media] of firstByVehicle) {
    if (media.is_public) {
      result[vehicleId] = supabase.storage.from(PUBLIC_BUCKET).getPublicUrl(media.storage_path).data.publicUrl;
    } else {
      const { data: signed } = await supabase.storage.from(PRIVATE_BUCKET).createSignedUrl(media.storage_path, 3600);
      if (signed?.signedUrl) result[vehicleId] = signed.signedUrl;
    }
  }
  return result;
}
