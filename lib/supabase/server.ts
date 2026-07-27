import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/utils/env";

/**
 * Client Supabase pour Server Components, Server Actions et Route Handlers.
 *
 * Note : dans un Server Component (rendu), l'écriture de cookies échoue
 * silencieusement (Next.js l'interdit hors Server Action/Route Handler) —
 * c'est un comportement normal documenté par Supabase, géré par le
 * middleware qui se charge du rafraîchissement de session.
 */
export async function createClient() {
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
}
