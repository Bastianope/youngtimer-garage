import { createClient } from "@/lib/supabase/server";

export type PriceRange = { min: number | null; max: number | null; sourceNote: string | null };

// Fourchette de prix observés d'un modèle (note de marché la plus récente)
export async function getModelPriceRange(makeSlug: string, modelSlug: string): Promise<PriceRange | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("model_market_notes")
    .select("price_range_min, price_range_max, source_note, created_at, car_models!inner(slug, car_makes!inner(slug))")
    .eq("car_models.slug", modelSlug)
    .eq("car_models.car_makes.slug", makeSlug)
    .neq("verification_status", "perime")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getModelPriceRange error:", error);
    return null;
  }
  if (!data) return null;

  return {
    min: data.price_range_min === null ? null : Number(data.price_range_min),
    max: data.price_range_max === null ? null : Number(data.price_range_max),
    sourceNote: data.source_note,
  };
}
