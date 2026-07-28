import "server-only";
import { createClient } from "@/lib/supabase/server";

export type VehiclePrivacyLevel = "private" | "unlisted" | "public";

export type VehicleGenerationSearchResult = {
  generationId: string;
  generationLabel: string;
  modelId: string;
  modelName: string;
  makeName: string;
  slugMake: string;
  slugModel: string;
};

export type VehicleVersionOption = {
  id: string;
  label: string;
};

export type CreateVehicleInput = {
  generationId: string;
  versionId: string | null;
  vin: string | null;
  chassisNumber: string | null;
  modelYear: number | null;
  mileageKm: number | null;
  privacyLevel: VehiclePrivacyLevel;
};

export type VehicleWithModel = {
  id: string;
  vin: string | null;
  chassisNumber: string | null;
  modelYear: number | null;
  mileageKm: number | null;
  privacyLevel: VehiclePrivacyLevel;
  createdAt: string;
  generationLabel: string;
  modelName: string;
  makeName: string;
  slugMake: string;
  slugModel: string;
};

export async function searchPublishedGenerations(q: string): Promise<VehicleGenerationSearchResult[]> {
  if (!q || q.trim().length < 2) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car_generations")
    .select(
      "id, label, car_models!inner(id, name, slug, status, car_makes!inner(name, slug))"
    )
    .eq("car_models.status", "published")
    .ilike("car_models.name", `%${q.trim()}%`)
    .limit(20);

  if (error) throw error;
  if (!data) return [];

  return data.map((row: any) => ({
    generationId: row.id,
    generationLabel: row.label,
    modelId: row.car_models.id,
    modelName: row.car_models.name,
    makeName: row.car_models.car_makes.name,
    slugMake: row.car_models.car_makes.slug,
    slugModel: row.car_models.slug,
  }));
}

export async function getVersionsForGenerationOptions(generationId: string): Promise<VehicleVersionOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car_versions")
    .select("id, label")
    .eq("generation_id", generationId)
    .order("label", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => ({ id: row.id, label: row.label }));
}

export async function createVehicleWithOwnership(input: CreateVehicleInput): Promise<string> {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error("Utilisateur non authentifié");

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      generation_id: input.generationId,
      version_id: input.versionId,
      vin: input.vin,
      chassis_number: input.chassisNumber,
      model_year: input.modelYear,
      mileage_km: input.mileageKm,
      privacy_level: input.privacyLevel,
    })
    .select("id")
    .single();

  if (vehicleError || !vehicle) throw vehicleError ?? new Error("Création du véhicule échouée");

  const { error: ownershipError } = await supabase.from("vehicle_ownerships").insert({
    vehicle_id: vehicle.id,
    user_id: userData.user.id,
    is_current: true,
    started_at: new Date().toISOString().slice(0, 10),
  });

  if (ownershipError) throw ownershipError;

  return vehicle.id as string;
}

export async function getVehiclesForCurrentOwner(): Promise<VehicleWithModel[]> {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, vin, chassis_number, model_year, mileage_km, privacy_level, created_at, car_generations!inner(label, car_models!inner(name, slug, car_makes!inner(name, slug)))"
    )
    .eq("current_owner_user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    vin: row.vin,
    chassisNumber: row.chassis_number,
    modelYear: row.model_year,
    mileageKm: row.mileage_km,
    privacyLevel: row.privacy_level,
    createdAt: row.created_at,
    generationLabel: row.car_generations.label,
    modelName: row.car_generations.car_models.name,
    makeName: row.car_generations.car_models.car_makes.name,
    slugMake: row.car_generations.car_models.car_makes.slug,
    slugModel: row.car_generations.car_models.slug,
  }));
}

export async function getVehicleByIdForOwner(vehicleId: string): Promise<VehicleWithModel | null> {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, vin, chassis_number, model_year, mileage_km, privacy_level, created_at, car_generations!inner(label, car_models!inner(name, slug, car_makes!inner(name, slug)))"
    )
    .eq("id", vehicleId)
    .eq("current_owner_user_id", userData.user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row: any = data;
  return {
    id: row.id,
    vin: row.vin,
    chassisNumber: row.chassis_number,
    modelYear: row.model_year,
    mileageKm: row.mileage_km,
    privacyLevel: row.privacy_level,
    createdAt: row.created_at,
    generationLabel: row.car_generations.label,
    modelName: row.car_generations.car_models.name,
    makeName: row.car_generations.car_models.car_makes.name,
    slugMake: row.car_generations.car_models.car_makes.slug,
    slugModel: row.car_generations.car_models.slug,
  };
}
