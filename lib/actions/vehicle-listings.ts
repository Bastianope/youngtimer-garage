"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendListingAlerts } from "@/lib/alerts/send-listing-alerts";

const VALIDITY_DAYS = 90;
const COUNTRIES = ["France", "Belgique", "Suisse", "Luxembourg"] as const;

const saleSchema = z.object({
  price: z.number().min(0).max(10000000),
  mileage: z.number().int().min(0).max(3000000).optional(),
  location: z.string().trim().max(80).optional(),
  country: z.enum(COUNTRIES),
  contact: z.string().trim().min(3).max(200),
  description: z.string().trim().max(4000).optional(),
});

const FIELD_CODES: Record<string, string> = {
  price: "prix",
  mileage: "km",
  location: "lieu",
  country: "pays",
  contact: "contact",
  description: "details",
};

function vehiclePath(vehicleId: string) {
  return `/vehicules/${vehicleId}`;
}

function optionalText(formData: FormData, key: string): string | undefined {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

// Montant saisi librement : « 12 500 », « 12 500 € », « 12500,00 »… On garde le premier nombre
function parseAmount(raw: string | undefined): number | undefined {
  const match = raw?.match(/\d[\d\s.,]*/);
  if (!match) return undefined;
  let cleaned = match[0].replace(/\s/g, "").replace(/,/g, ".").replace(/\.+$/, "");
  const lastDot = cleaned.lastIndexOf(".");
  if (lastDot !== -1) cleaned = cleaned.slice(0, lastDot).replace(/\./g, "") + cleaned.slice(lastDot);
  return Number(cleaned);
}

// Kilométrage : on ne garde que les chiffres (« 182 000 km » → 182000)
function parseKm(raw: string | undefined): number | undefined {
  const digits = raw?.replace(/\D/g, "") ?? "";
  return digits.length > 0 ? Number(digits) : undefined;
}

function expiryDate() {
  return new Date(Date.now() + VALIDITY_DAYS * 24 * 3600 * 1000).toISOString();
}

function refresh(vehicleId: string) {
  revalidatePath(vehiclePath(vehicleId));
  revalidatePath("/annonces");
}

export async function createVehicleListingAction(vehicleId: string, formData: FormData): Promise<void> {
  const path = vehiclePath(vehicleId);
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/auth/connexion?next=${encodeURIComponent(path)}`);

  const parsed = saleSchema.safeParse({
    price: parseAmount(optionalText(formData, "price")),
    mileage: parseKm(optionalText(formData, "mileage")),
    location: optionalText(formData, "location"),
    country: formData.get("country"),
    contact: String(formData.get("contact") ?? ""),
    description: optionalText(formData, "description"),
  });
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => String(issue.path[0] ?? ""));
    console.warn("createVehicleListingAction: champs refusés", fields);
    redirect(`${path}?vente=invalide&champ=${FIELD_CODES[fields[0]] ?? "inconnu"}#vente`);
  }

  // L'annonce n'est visible que si la fiche du véhicule est publique
  const { data: updated, error: visibilityError } = await supabase
    .from("vehicles")
    .update({ privacy_level: "public" })
    .eq("id", vehicleId)
    .eq("current_owner_user_id", auth.user.id)
    .select("id");
  if (visibilityError || !updated || updated.length === 0) {
    console.error("createVehicleListingAction visibility error:", visibilityError);
    redirect(`${path}?vente=erreur#vente`);
  }

  const d = parsed.data;
  const { data: created, error } = await supabase.from("vehicle_listings").insert({
    vehicle_id: vehicleId,
    user_id: auth.user.id,
    price_amount: d.price,
    mileage_km: d.mileage ?? null,
    location: d.location ?? null,
    country: d.country,
    contact: d.contact,
    description: d.description ?? null,
    histovec_available: formData.get("histovec") === "on",
    expires_at: expiryDate(),
  }).select("id").single();
  if (error || !created) {
    console.error("createVehicleListingAction error:", error);
    redirect(`${path}?vente=${error?.code === "23505" ? "deja" : "erreur"}#vente`);
  }

  // Alertes e-mail envoyées après la réponse : le vendeur n'attend pas
  after(() => sendListingAlerts(created.id));

  refresh(vehicleId);
  redirect(`${path}?vente=publiee#vente`);
}

// Les droits réels sont vérifiés par la base (RLS) : seul le vendeur peut modifier son annonce
export async function markVehicleSoldAction(vehicleId: string, listingId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("vehicle_listings").update({ status: "sold" }).eq("id", listingId);
  refresh(vehicleId);
}

export async function withdrawVehicleListingAction(vehicleId: string, listingId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("vehicle_listings").update({ status: "closed" }).eq("id", listingId);
  refresh(vehicleId);
}

export async function renewVehicleListingAction(vehicleId: string, listingId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("vehicle_listings").update({ expires_at: expiryDate() }).eq("id", listingId);
  refresh(vehicleId);
}
