import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCachedUser } from "@/lib/supabase/get-user";

export type VehiclePrivacyLevel = "private" | "unlisted" | "public";

export type VehicleGenerationSearchResult = {
  generationId: string;
  generationName: string;
  modelId: string;
  modelName: string;
  makeName: string;
  slugMake: string;
  slugModel: string;
};

export type VehicleVersionOption = {
  id: string;
  name: string;
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
  generationName: string;
  modelName: string;
  makeName: string;
  slugMake: string;
  slugModel: string;
};

type PublishedGenerationRow = {
  id: string;
  name: string;
  car_models: {
    id: string;
    name: string;
    slug: string;
    car_makes: { name: string; slug: string };
  };
};

type VehicleRow = {
  id: string;
  vin: string | null;
  chassis_number: string | null;
  model_year: number | null;
  mileage_km: number | null;
  privacy_level: VehiclePrivacyLevel;
  created_at: string;
  car_generations: {
    name: string;
    car_models: {
      name: string;
      slug: string;
      car_makes: { name: string; slug: string };
    };
  };
};

function mapGenerationRow(row: PublishedGenerationRow): VehicleGenerationSearchResult {
  return {
    generationId: row.id,
    generationName: row.name,
    modelId: row.car_models.id,
    modelName: row.car_models.name,
    makeName: row.car_models.car_makes.name,
    slugMake: row.car_models.car_makes.slug,
    slugModel: row.car_models.slug,
  };
}

function mapVehicleRow(row: VehicleRow): VehicleWithModel {
  return {
    id: row.id,
    vin: row.vin,
    chassisNumber: row.chassis_number,
    modelYear: row.model_year,
    mileageKm: row.mileage_km,
    privacyLevel: row.privacy_level,
    createdAt: row.created_at,
    generationName: row.car_generations.name,
    modelName: row.car_generations.car_models.name,
    makeName: row.car_generations.car_models.car_makes.name,
    slugMake: row.car_generations.car_models.car_makes.slug,
    slugModel: row.car_generations.car_models.slug,
  };
}

export async function searchPublishedGenerations(q: string): Promise<VehicleGenerationSearchResult[]> {
  if (!q || q.trim().length < 2) return [];

  const supabase = await createClient();
  const term = q.trim();
  const baseSelect =
    "id, name, car_models!inner(id, name, slug, published_at, car_makes!inner(name, slug))";

  const [byModelName, byMakeName] = await Promise.all([
    supabase
      .from("car_generations")
      .select(baseSelect)
      .not("car_models.published_at", "is", null)
      .ilike("car_models.name", `%${term}%`)
      .limit(20),
    supabase
      .from("car_generations")
      .select(baseSelect)
      .not("car_models.published_at", "is", null)
      .ilike("car_models.car_makes.name", `%${term}%`)
      .limit(20),
  ]);

  if (byModelName.error) throw byModelName.error;
  if (byMakeName.error) throw byMakeName.error;

  const merged = new Map<string, PublishedGenerationRow>();
  for (const row of [
    ...((byModelName.data ?? []) as unknown as PublishedGenerationRow[]),
    ...((byMakeName.data ?? []) as unknown as PublishedGenerationRow[]),
  ]) {
    merged.set(row.id, row);
  }

  return Array.from(merged.values()).map(mapGenerationRow);
}

export async function getVersionsForGenerationOptions(generationId: string): Promise<VehicleVersionOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car_versions")
    .select("id, name")
    .eq("generation_id", generationId)
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => ({ id: row.id, name: row.name }));
}

export async function createVehicleWithOwnership(input: CreateVehicleInput): Promise<string> {
  const supabase = await createClient();

  const { data: userData, error: userError } = await getCachedUser();
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

  const { data: userData } = await getCachedUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, vin, chassis_number, model_year, mileage_km, privacy_level, created_at, car_generations!inner(name, car_models!inner(name, slug, car_makes!inner(name, slug)))"
    )
    .eq("current_owner_user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!data) return [];

  return (data as unknown as VehicleRow[]).map(mapVehicleRow);
}

export async function getVehicleByIdForOwner(vehicleId: string): Promise<VehicleWithModel | null> {
  const supabase = await createClient();

  const { data: userData } = await getCachedUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, vin, chassis_number, model_year, mileage_km, privacy_level, created_at, car_generations!inner(name, car_models!inner(name, slug, car_makes!inner(name, slug)))"
    )
    .eq("id", vehicleId)
    .eq("current_owner_user_id", userData.user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapVehicleRow(data as unknown as VehicleRow);
}

export async function getVehicleByIdPublic(vehicleId: string): Promise<VehicleWithModel | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, vin, chassis_number, model_year, mileage_km, privacy_level, created_at, car_generations!inner(name, car_models!inner(name, slug, car_makes!inner(name, slug)))"
    )
    .eq("id", vehicleId)
    .eq("privacy_level", "public")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapVehicleRow(data as unknown as VehicleRow);
}