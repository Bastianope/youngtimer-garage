/**
 * Logique de rafraîchissement de session Supabase, appelée depuis
 * `proxy.ts` à la racine (la convention Next.js "middleware.ts" est
 * dépréciée depuis Next.js 16 au profit de "proxy.ts" — ce fichier
 * garde son nom pour rester cohérent avec la documentation Supabase,
 * mais n'a plus de lien direct avec l'ancienne convention de nommage).
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/utils/env";

/**
 * Routes qui exigent un utilisateur connecté.
 * Correspond aux routes privées listées dans la spec (§3, §MVP scope) :
 * Garage et Profil. /explorer et /modeles restent publics.
 */
const PROTECTED_PATHS = ["/garage", "/profil", "/admin"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

/**
 * Rafraîchit la session Supabase sur chaque requête et redirige les
 * utilisateurs non authentifiés hors des routes privées.
 *
 * Important : ne jamais utiliser getSession() côté serveur pour une
 * décision d'autorisation — getUser() revalide le token auprès de
 * Supabase Auth, contrairement à getSession() qui ne fait que lire un
 * cookie potentiellement périmé/forgé.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();

  if (!data.user && isProtectedPath(request.nextUrl.pathname)) {
    const redirectUrl = new URL("/auth/connexion", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
