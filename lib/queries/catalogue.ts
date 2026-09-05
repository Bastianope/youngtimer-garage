import { createClient } from "@/lib/supabase/server";
import type {
  CarGeneration,
  CarMake,
  CarModelWithMake,
  CarVersion,
} from "@/types/catalogue";

/**
 * Modèles publiés, avec la marque associée. Utilisé par /modeles.
 * Le tri (créés récemment d'abord) et la pagination minimale (limite
 * fixe) suffisent pour le volume de démonstration de la Phase 1.
 */
export async function getPublishedModels(searchQuery?: string) {
  const supabase = await createClient();
  const baseSelect = "*, car_makes!inner(id, name, slug)";

  if (!searchQuery || searchQuery.trim().length === 0) {
    const { data, error } = await supabase
      .from("car_models")
      .select(baseSelect)
      .not("published_at", "is", null)
      .order("name")
      .limit(50);

    if (error) throw new Error(`Impossible de charger les modèles : ${error.message}`);
    return (data ?? []) as CarModelWithMake[];
  }

  const term = searchQuery.trim();

  const [byModelName, byMakeName] = await Promise.all([
    supabase
      .from("car_models")
      .select(baseSelect)
      .not("published_at", "is", null)
      .ilike("name", `%${term}%`)
      .order("name")
      .limit(50),
    supabase
      .from("car_models")
      .select(baseSelect)
      .not("published_at", "is", null)
      .ilike("car_makes.name", `%${term}%`)
      .order("name")
      .limit(50),
  ]);

  if (byModelName.error) throw new Error(`Impossible de charger les modèles : ${byModelName.error.message}`);
  if (byMakeName.error) throw new Error(`Impossible de charger les modèles : ${byMakeName.error.message}`);

  const merged = new Map<string, CarModelWithMake>();
  for (const row of [...(byModelName.data ?? []), ...(byMakeName.data ?? [])] as CarModelWithMake[]) {
    merged.set(row.id, row);
  }

  return Array.from(merged.values());
}

export async function getPublishedModelBySlug(makeSlug: string, modelSlug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_models")
    .select("*, car_makes!inner(id, name, slug)")
    .eq("slug", modelSlug)
    .eq("car_makes.slug", makeSlug)
    .not("published_at", "is", null)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de charger le modèle : ${error.message}`);
  }

  return data as CarModelWithMake | null;
}

export async function getGenerationsForModel(modelId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_generations")
    .select("*")
    .eq("model_id", modelId)
    .order("year_start", { nullsFirst: false });

  if (error) {
    throw new Error(`Impossible de charger les générations : ${error.message}`);
  }

  return (data ?? []) as CarGeneration[];
}

export async function getVersionsForGeneration(generationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_versions")
    .select("*")
    .eq("generation_id", generationId)
    .order("name");

  if (error) {
    throw new Error(`Impossible de charger les versions : ${error.message}`);
  }

  return (data ?? []) as CarVersion[];
}

/** Admin : toutes les marques, publiées ou non n'ayant pas de sens ici (les marques n'ont pas de statut publié). */
export async function getAllMakes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_makes")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(`Impossible de charger les marques : ${error.message}`);
  }

  return (data ?? []) as CarMake[];
}

/** Admin : tous les modèles, publiés ou brouillons (RLS autorise l'admin à tout voir). */
export async function getAllModelsForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_models")
    .select("*, car_makes(id, name, slug)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Impossible de charger les modèles : ${error.message}`);
  }

  return (data ?? []) as CarModelWithMake[];
}

export async function getModelByIdForAdmin(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("car_models")
    .select("*, car_makes(id, name, slug)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de charger le modèle : ${error.message}`);
  }

  return data as CarModelWithMake | null;
}
