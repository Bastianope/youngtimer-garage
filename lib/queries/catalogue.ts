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
  let query = supabase
    .from("car_models")
    .select("*, car_makes!inner(id, name, slug)")
    .not("published_at", "is", null)
    .order("name")
    .limit(50);

  if (searchQuery && searchQuery.trim().length > 0) {
      const term = searchQuery.trim();
    query = query.or(`name.ilike.%${term}%,car_makes.name.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Impossible de charger les modèles : ${error.message}`);
  }

  return (data ?? []) as CarModelWithMake[];
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
