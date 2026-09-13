import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { env } from "@/lib/utils/env";

/**
 * Client Supabase pour Server Components, Server Actions et Route Handlers.
 *
 * Mis en cache via React cache() : sans ça, chaque appelant sur une même
 * requête (Server Action, getCachedUser(), les queries) créait sa propre
 * instance de client. Deux clients distincts appelant chacun l'API Auth
 * de Supabase sur la même requête peuvent se disputer la rotation du
 * même refresh token, l'un des deux se retrouvant alors avec un token
 * invalidé — provoquant des 42501 intermittents côté RLS.
 *
 * Note : dans un Server Component (rendu), l'écriture de cookies échoue
 * silencieusement (Next.js l'interdit hors Server Action/Route Handler) —
 * c'est un comportement normal documenté par Supabase, géré par le
 * middleware qui se charge du rafraîchissement de session.
 */
export const createClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Appelé depuis un Server Component sans possibilité d'écrire
            // des cookies. Sans conséquence si le middleware rafraîchit
            // la session sur chaque requête.
          }
        },
      },
    },
  );
});