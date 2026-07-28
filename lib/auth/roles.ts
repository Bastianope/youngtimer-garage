import { createClient } from "@/lib/supabase/server";

/**
 * Vérifie le rôle admin/editor côté serveur en appelant la fonction
 * SQL `is_admin_or_editor()` (SECURITY DEFINER, cf. migration 0002).
 * Ne jamais dupliquer cette logique côté client — RLS reste la seule
 * source de vérité pour l'autorisation réelle ; cette fonction ne sert
 * qu'à décider de l'affichage (redirection, UI admin).
 */
export async function isAdminOrEditor(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("is_admin_or_editor");

  if (error) {
    return false;
  }

  return Boolean(data);
}
