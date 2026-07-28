import { createClient } from "@/lib/supabase/server";

export type GarageStatus = "dream" | "searching" | "owned" | "archived";

export type GarageItemWithModel = {
  id: string;
  user_id: string;
  model_id: string;
  vehicle_id: string | null;
  status: GarageStatus;
  title_override: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  car_models: {
    id: string;
    name: string;
    slug: string;
    car_makes: { name: string; slug: string } | null;
  } | null;
};

export async function getGarageItemsForCurrentUser(): Promise<GarageItemWithModel[]> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return [];

  const { data, error } = await supabase
    .from("garage_items")
    .select("*, car_models(id, name, slug, car_makes(name, slug))")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Impossible de charger le Garage : ${error.message}`);
  }

  return (data ?? []) as GarageItemWithModel[];
}

export async function isModelFollowedByCurrentUser(modelId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return false;

  const { data, error } = await supabase
    .from("model_follows")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("model_id", modelId)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de vérifier le suivi du modèle : ${error.message}`);
  }

  return data !== null;
}
