import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

/**
 * Ces tests d'intégration s'exécutent contre une instance Supabase LOCALE
 * (via `supabase start`, cf. README pour la commande complète) — jamais
 * contre le projet de production/développement distant.
 *
 * Variables attendues (à placer dans .env.test.local, jamais committé) :
 * - SUPABASE_TEST_URL           (par défaut : instance locale standard)
 * - SUPABASE_TEST_ANON_KEY      (clé anon de l'instance locale)
 * - SUPABASE_TEST_SERVICE_ROLE_KEY (clé service_role de l'instance LOCALE
 *   uniquement — utilisée seulement pour créer les utilisateurs de test,
 *   jamais exposée à l'application)
 *
 * Si ces variables ne sont pas définies, les tests sont ignorés (skip)
 * plutôt que de faire échouer la CI : la Phase 0 n'exige pas qu'une
 * instance Supabase locale soit disponible dans tous les environnements
 * d'exécution.
 */

export const TEST_URL = process.env.SUPABASE_TEST_URL ?? "http://127.0.0.1:54321";
export const TEST_ANON_KEY = process.env.SUPABASE_TEST_ANON_KEY;
export const TEST_SERVICE_ROLE_KEY = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY;

export const canRunIntegrationTests = Boolean(
  TEST_ANON_KEY && TEST_SERVICE_ROLE_KEY,
);

export function createAdminClient(): SupabaseClient {
  if (!TEST_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_TEST_SERVICE_ROLE_KEY manquant — voir tests/integration/setup/supabase-test-clients.ts",
    );
  }
  return createClient(TEST_URL, TEST_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function createAnonClient(): SupabaseClient {
  if (!TEST_ANON_KEY) {
    throw new Error(
      "SUPABASE_TEST_ANON_KEY manquant — voir tests/integration/setup/supabase-test-clients.ts",
    );
  }
  return createClient(TEST_URL, TEST_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export type TestUser = {
  id: string;
  email: string;
  password: string;
  client: SupabaseClient;
};

/**
 * Crée un utilisateur de test via l'API admin (service role) puis se
 * connecte avec un client "anon" classique — pour que les requêtes de
 * test passent bien par le même chemin RLS qu'un utilisateur réel.
 */
export async function createTestUser(): Promise<TestUser> {
  const admin = createAdminClient();
  const email = `test-${randomUUID()}@example.test`;
  const password = randomUUID();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw new Error(`Impossible de créer l'utilisateur de test: ${error?.message}`);
  }

  const client = createAnonClient();
  const { error: signInError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    throw new Error(`Impossible de connecter l'utilisateur de test: ${signInError.message}`);
  }

  return { id: data.user.id, email, password, client };
}

export async function deleteTestUser(userId: string): Promise<void> {
  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(userId);
}
