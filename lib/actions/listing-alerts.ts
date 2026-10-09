"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

// guid : accepte aussi les identifiants fixés à la main dans les migrations du catalogue
const uuid = z.guid();

// Active ou désactive l'alerte e-mail d'un modèle pour le membre connecté
export async function toggleListingAlertAction(modelId: string, path: string): Promise<void> {
  const returnPath = path.startsWith("/modeles/") ? path : "/modeles";
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect(`/auth/connexion?next=${encodeURIComponent(returnPath)}`);
  if (!uuid.safeParse(modelId).success) redirect(`${returnPath}?alerte=erreur#alerte`);

  const { data: existing } = await supabase
    .from("listing_alerts")
    .select("id")
    .eq("model_id", modelId)
    .maybeSingle();

  const { error } = existing
    ? await supabase.from("listing_alerts").delete().eq("id", existing.id)
    : await supabase.from("listing_alerts").insert({ user_id: auth.user.id, model_id: modelId });

  if (error) {
    console.error("toggleListingAlertAction error:", error);
    redirect(`${returnPath}?alerte=erreur#alerte`);
  }

  revalidatePath(returnPath);
  revalidatePath("/profil");
  redirect(`${returnPath}?alerte=${existing ? "desactivee" : "activee"}#alerte`);
}

// Suppression depuis la page Profil
export async function deleteListingAlertAction(alertId: string): Promise<void> {
  const supabase = await createClient();
  if (uuid.safeParse(alertId).success) {
    await supabase.from("listing_alerts").delete().eq("id", alertId);
  }
  revalidatePath("/profil");
}

// Désinscription en un clic depuis l'e-mail, sans connexion : le jeton fait foi
export async function unsubscribeListingAlertAction(token: string): Promise<void> {
  if (!uuid.safeParse(token).success) redirect("/alertes/desabonnement?etat=invalide");

  const supabase = createServiceClient();
  const { error } = await supabase.from("listing_alerts").delete().eq("unsubscribe_token", token);
  if (error) {
    console.error("unsubscribeListingAlertAction error:", error);
    redirect("/alertes/desabonnement?etat=erreur");
  }
  redirect("/alertes/desabonnement?etat=ok");
}
