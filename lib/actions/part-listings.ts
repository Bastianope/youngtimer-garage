"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const VALIDITY_DAYS = 90;
const MAX_PER_DAY = 10;

const listingSchema = z.object({
  kind: z.enum(["wanted", "for_sale"]),
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(2000).optional(),
  price: z.number().min(0).max(100000).optional(),
  location: z.string().trim().max(80).optional(),
  contact: z.string().trim().min(3).max(200),
});

function modelPath(makeSlug: string, modelSlug: string) {
  return `/modeles/${makeSlug}/${modelSlug}`;
}

function optionalText(formData: FormData, key: string): string | undefined {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

// Prix saisi librement : « 70 », « 70 € », « 1 200,50 € », « env. 80 € »…
// On garde le premier nombre ; sans chiffre (« à débattre »), pas de prix
function parsePrice(raw: string | undefined): number | undefined {
  const match = raw?.match(/\d[\d\s.,]*/);
  if (!match) return undefined;
  let cleaned = match[0].replace(/\s/g, "").replace(/,/g, ".").replace(/\.+$/, "");
  const lastDot = cleaned.lastIndexOf(".");
  if (lastDot !== -1) cleaned = cleaned.slice(0, lastDot).replace(/\./g, "") + cleaned.slice(lastDot);
  return Number(cleaned);
}

// Champ fautif transmis à la page pour afficher un message précis
const FIELD_CODES: Record<string, string> = {
  kind: "type",
  title: "titre",
  description: "details",
  price: "prix",
  location: "lieu",
  contact: "contact",
};

function expiryDate() {
  return new Date(Date.now() + VALIDITY_DAYS * 24 * 3600 * 1000).toISOString();
}

export async function createPartListingAction(
  carModelId: string,
  makeSlug: string,
  modelSlug: string,
  formData: FormData,
): Promise<void> {
  const path = modelPath(makeSlug, modelSlug);
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/auth/connexion?next=${encodeURIComponent(path)}`);

  const parsed = listingSchema.safeParse({
    kind: formData.get("kind"),
    title: String(formData.get("title") ?? ""),
    description: optionalText(formData, "description"),
    price: parsePrice(optionalText(formData, "price")),
    location: optionalText(formData, "location"),
    contact: String(formData.get("contact") ?? ""),
  });
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => String(issue.path[0] ?? ""));
    console.warn("createPartListingAction: champs refusés", fields);
    redirect(`${path}?annonce=invalide&champ=${FIELD_CODES[fields[0]] ?? "inconnu"}#annonces`);
  }

  // Anti-spam : nombre d'annonces limité par 24 heures
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await supabase
    .from("part_listings")
    .select("id", { count: "exact", head: true })
    .eq("user_id", auth.user.id)
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_PER_DAY) redirect(`${path}?annonce=limite#annonces`);

  const d = parsed.data;
  const { error } = await supabase.from("part_listings").insert({
    car_model_id: carModelId,
    user_id: auth.user.id,
    kind: d.kind,
    title: d.title,
    description: d.description ?? null,
    price_amount: d.price ?? null,
    location: d.location ?? null,
    contact: d.contact,
    expires_at: expiryDate(),
  });
  if (error) {
    console.error("createPartListingAction error:", error);
    redirect(`${path}?annonce=erreur#annonces`);
  }

  revalidatePath(path);
  redirect(`${path}?annonce=publiee#annonces`);
}

// Les droits réels sont vérifiés par la base (RLS) : propriétaire, ou admin pour la suppression
export async function closePartListingAction(listingId: string, makeSlug: string, modelSlug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("part_listings").update({ status: "closed" }).eq("id", listingId);
  revalidatePath(modelPath(makeSlug, modelSlug));
}

export async function renewPartListingAction(listingId: string, makeSlug: string, modelSlug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("part_listings").update({ status: "active", expires_at: expiryDate() }).eq("id", listingId);
  revalidatePath(modelPath(makeSlug, modelSlug));
}

export async function deletePartListingAction(listingId: string, makeSlug: string, modelSlug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("part_listings").delete().eq("id", listingId);
  revalidatePath(modelPath(makeSlug, modelSlug));
}
