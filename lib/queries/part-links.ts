import { createClient } from "@/lib/supabase/server";

export type PartLink = { label: string; url: string };

// Liens vers des boutiques de pièces propres à un modèle (Octoclassic…), triés par l'administrateur
export async function getModelPartLinks(modelId: string): Promise<PartLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("model_part_links")
    .select("label, url")
    .eq("model_id", modelId)
    .order("sort_order")
    .order("label");
  if (error) {
    console.error("getModelPartLinks error:", error);
    return [];
  }
  return data ?? [];
}
