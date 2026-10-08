import { createClient } from "@/lib/supabase/server";

export type ModelInsight = {
  description: string | null;
  coverImageUrl: string | null;
  priceText: string | null;
  forSaleCount: number;
};

type SaleRow = { vehicles: { car_generations: { model_id: string } } };

// Description, photo, prix observés et nombre de voitures en vente, pour les modèles recherchés ou rêvés
export async function getModelInsights(modelIds: string[]): Promise<Record<string, ModelInsight>> {
  const ids = [...new Set(modelIds)];
  if (ids.length === 0) return {};
  const supabase = await createClient();

  const [models, notes, sales] = await Promise.all([
    supabase.from("car_models").select("id, description, cover_image_url").in("id", ids),
    supabase
      .from("model_market_notes")
      .select("car_model_id, price_range_text, created_at")
      .in("car_model_id", ids)
      .neq("verification_status", "perime")
      .order("created_at", { ascending: false }),
    supabase
      .from("vehicle_listings")
      .select("id, vehicles!inner(privacy_level, car_generations!inner(model_id))")
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .eq("vehicles.privacy_level", "public")
      .in("vehicles.car_generations.model_id", ids),
  ]);

  const result: Record<string, ModelInsight> = {};
  for (const m of models.data ?? []) {
    result[m.id] = { description: m.description, coverImageUrl: m.cover_image_url, priceText: null, forSaleCount: 0 };
  }
  for (const n of notes.data ?? []) {
    const insight = result[n.car_model_id];
    if (insight && insight.priceText === null) insight.priceText = n.price_range_text;
  }
  for (const s of (sales.data ?? []) as unknown as SaleRow[]) {
    const insight = result[s.vehicles.car_generations.model_id];
    if (insight) insight.forSaleCount += 1;
  }
  return result;
}
