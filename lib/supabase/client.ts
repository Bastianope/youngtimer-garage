import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/utils/env";

/**
 * Client Supabase pour le navigateur (Client Components uniquement).
 * Utilise l'approche SSR actuelle de @supabase/ssr — jamais les anciens
 * auth-helpers dépréciés.
 */
export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
