import { createClient } from "@/lib/supabase/server";
import { getCachedUser } from "@/lib/supabase/get-user";

export type PartListing = {
  id: string;
  kind: "wanted" | "for_sale";
  title: string;
  description: string | null;
  priceAmount: number | null;
  location: string | null;
  // null pour les visiteurs non connectés : la colonne ne leur est pas accessible
  contact: string | null;
  status: "active" | "closed";
  expiresAt: string;
  // expire dans moins de 15 jours : on propose de prolonger
  expiresSoon: boolean;
  createdAt: string;
  isMine: boolean;
};

type Row = {
  id: string;
  kind: "wanted" | "for_sale";
  title: string;
  description: string | null;
  price_amount: number | string | null;
  location: string | null;
  contact?: string | null;
  user_id?: string;
  status: "active" | "closed";
  expires_at: string;
  created_at: string;
};

const SOON_MS = 15 * 24 * 3600 * 1000;

const PUBLIC_COLUMNS = "id, kind, title, description, price_amount, location, status, expires_at, created_at";

function mapRow(row: Row, userId: string | null): PartListing {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    description: row.description,
    priceAmount: row.price_amount === null ? null : Number(row.price_amount),
    location: row.location,
    contact: row.contact ?? null,
    status: row.status,
    expiresAt: row.expires_at,
    expiresSoon: new Date(row.expires_at).getTime() - Date.now() < SOON_MS,
    createdAt: row.created_at,
    isMine: userId !== null && row.user_id === userId,
  };
}

export type ModelPartListings = {
  active: PartListing[];
  myInactive: PartListing[];
  userId: string | null;
};

export async function getPartListingsForModel(carModelId: string): Promise<ModelPartListings> {
  const supabase = await createClient();
  const { data: auth } = await getCachedUser();
  const userId = auth.user?.id ?? null;
  const columns = userId ? `${PUBLIC_COLUMNS}, contact, user_id` : PUBLIC_COLUMNS;
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("part_listings")
    .select(columns)
    .eq("car_model_id", carModelId)
    .eq("status", "active")
    .gt("expires_at", nowIso)
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) {
    console.error("getPartListingsForModel error:", error);
    return { active: [], myInactive: [], userId };
  }

  const active = ((data ?? []) as unknown as Row[]).map((row) => mapRow(row, userId));

  let myInactive: PartListing[] = [];
  if (userId) {
    const { data: mine } = await supabase
      .from("part_listings")
      .select(`${PUBLIC_COLUMNS}, contact, user_id`)
      .eq("car_model_id", carModelId)
      .eq("user_id", userId)
      .or(`status.eq.closed,expires_at.lte.${nowIso}`)
      .order("created_at", { ascending: false })
      .limit(20);
    myInactive = ((mine ?? []) as unknown as Row[]).map((row) => mapRow(row, userId));
  }

  return { active, myInactive, userId };
}
