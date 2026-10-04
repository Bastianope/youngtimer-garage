import { createClient } from "@/lib/supabase/server";
import { getCachedUser } from "@/lib/supabase/get-user";
import { getVehicleThumbnails } from "@/lib/queries/garage-dashboard";

export type VehicleSale = {
  id: string;
  vehicleId: string;
  priceAmount: number;
  mileageKm: number | null;
  location: string | null;
  country: string;
  description: string | null;
  // null pour les visiteurs non connectés : la colonne ne leur est pas accessible
  contact: string | null;
  status: "active" | "sold" | "closed";
  expiresAt: string;
  expiresSoon: boolean;
  createdAt: string;
  isMine: boolean;
};

export type VehicleForSale = VehicleSale & {
  makeName: string;
  modelName: string;
  modelYear: number | null;
  photoUrl: string | null;
};

type SaleRow = {
  id: string;
  vehicle_id: string;
  price_amount: number | string;
  mileage_km: number | null;
  location: string | null;
  country: string;
  description: string | null;
  contact?: string | null;
  user_id?: string;
  status: "active" | "sold" | "closed";
  expires_at: string;
  created_at: string;
};

type SaleWithVehicleRow = SaleRow & {
  vehicles: {
    model_year: number | null;
    car_generations: { car_models: { name: string; car_makes: { name: string } } };
  };
};

const SOON_MS = 15 * 24 * 3600 * 1000;
const PUBLIC_COLUMNS = "id, vehicle_id, price_amount, mileage_km, location, country, description, status, expires_at, created_at";

function mapSale(row: SaleRow, userId: string | null): VehicleSale {
  return {
    id: row.id,
    vehicleId: row.vehicle_id,
    priceAmount: Number(row.price_amount),
    mileageKm: row.mileage_km,
    location: row.location,
    country: row.country,
    description: row.description,
    contact: row.contact ?? null,
    status: row.status,
    expiresAt: row.expires_at,
    expiresSoon: new Date(row.expires_at).getTime() - Date.now() < SOON_MS,
    createdAt: row.created_at,
    isMine: userId !== null && row.user_id === userId,
  };
}

// Annonce en cours pour un véhicule (visible du public si le véhicule est public)
export async function getVehicleSale(vehicleId: string): Promise<VehicleSale | null> {
  const supabase = await createClient();
  const { data: auth } = await getCachedUser();
  const userId = auth.user?.id ?? null;
  const columns = userId ? `${PUBLIC_COLUMNS}, contact, user_id` : PUBLIC_COLUMNS;

  const { data, error } = await supabase
    .from("vehicle_listings")
    .select(columns)
    .eq("vehicle_id", vehicleId)
    .eq("status", "active")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getVehicleSale error:", error);
    return null;
  }
  return data ? mapSale(data as unknown as SaleRow, userId) : null;
}

// Véhicules en vente, éventuellement limités à un modèle du catalogue
export async function getVehiclesForSale(filter?: { makeSlug: string; modelSlug: string }): Promise<VehicleForSale[]> {
  const supabase = await createClient();
  const { data: auth } = await getCachedUser();
  const userId = auth.user?.id ?? null;
  const columns = userId ? `${PUBLIC_COLUMNS}, contact, user_id` : PUBLIC_COLUMNS;

  let query = supabase
    .from("vehicle_listings")
    .select(
      `${columns}, vehicles!inner(model_year, privacy_level, car_generations!inner(car_models!inner(name, slug, car_makes!inner(name, slug))))`,
    )
    .eq("status", "active")
    .eq("vehicles.privacy_level", "public")
    .gt("expires_at", new Date().toISOString());

  if (filter) {
    query = query
      .eq("vehicles.car_generations.car_models.slug", filter.modelSlug)
      .eq("vehicles.car_generations.car_models.car_makes.slug", filter.makeSlug);
  }

  const { data, error } = await query.order("created_at", { ascending: false }).limit(100);
  if (error) {
    console.error("getVehiclesForSale error:", error);
    return [];
  }

  const rows = (data ?? []) as unknown as SaleWithVehicleRow[];
  const photos = await getVehicleThumbnails(rows.map((r) => r.vehicle_id));

  return rows.map((row) => ({
    ...mapSale(row, userId),
    makeName: row.vehicles.car_generations.car_models.car_makes.name,
    modelName: row.vehicles.car_generations.car_models.name,
    modelYear: row.vehicles.model_year,
    photoUrl: photos[row.vehicle_id] ?? null,
  }));
}
