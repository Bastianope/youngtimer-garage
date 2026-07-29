import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

/**
 * Version mise en cache de supabase.auth.getUser(), scopée à la requête
 * serveur en cours (via React cache()). Sans cette dé-duplication,
 * chaque appelant (SiteHeader, les queries, les Server Actions) crée son
 * propre client et déclenche son propre appel réseau vers Supabase Auth
 * sur la même requête. Plusieurs de ces appels en quasi-parallèle (ex.
 * une Server Action suivie du re-rendu du layout) peuvent alors se
 * disputer la rotation du même refresh token, provoquant des erreurs
 * RLS 42501 intermittentes.
 */
export const getCachedUser = cache(async () => {
  const supabase = await createClient();
  return supabase.auth.getUser();
});