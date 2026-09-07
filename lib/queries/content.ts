import { createClient } from "@/lib/supabase/server";

export type MarketNote = {
  id: string;
  carModelId: string;
  contributorId: string | null;
  priceRangeText: string;
  priceRangeMin: number | null;
  priceRangeMax: number | null;
  vigilancePoints: string[];
  sourceType: string;
  sourceUrl: string | null;
  sourceNote: string | null;
  verificationStatus: "a_verifier" | "verifie" | "perime";
  verifiedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
};

export async function getModelMarketNotes(
  carModelId: string
): Promise<MarketNote[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("model_market_notes")
    .select("*")
    .eq("car_model_id", carModelId)
    .neq("verification_status", "perime")
    .order("verification_status", { ascending: true }) // 'a_verifier' < 'verifie' alphabétiquement, donc on inverse ci-dessous
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getModelMarketNotes error:", error);
    return [];
  }

  // Tri applicatif : notes vérifiées d'abord, puis contributions en attente
  const sorted = (data ?? []).sort((a, b) => {
    if (a.verification_status === b.verification_status) return 0;
    if (a.verification_status === "verifie") return -1;
    if (b.verification_status === "verifie") return 1;
    return 0;
  });

  return sorted.map((row) => ({
    id: row.id,
    carModelId: row.car_model_id,
    contributorId: row.contributor_id,
    priceRangeText: row.price_range_text,
    priceRangeMin: row.price_range_min,
    priceRangeMax: row.price_range_max,
    vigilancePoints: row.vigilance_points,
    sourceType: row.source_type,
    sourceUrl: row.source_url,
    sourceNote: row.source_note,
    verificationStatus: row.verification_status,
    verifiedAt: row.verified_at,
    reviewedBy: row.reviewed_by,
    createdAt: row.created_at,
  }));
}