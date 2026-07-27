import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  canRunIntegrationTests,
  createAnonClient,
  createTestUser,
  deleteTestUser,
  type TestUser,
} from "./setup/supabase-test-clients";

/**
 * Valide les policies RLS de public.profiles (migration 0001_init.sql)
 * contre une instance Supabase locale réelle — pas des mocks.
 *
 * Ignoré automatiquement si aucune instance Supabase locale n'est
 * configurée (voir setup/supabase-test-clients.ts).
 */
describe.skipIf(!canRunIntegrationTests)("RLS — public.profiles", () => {
  let userA: TestUser;
  let userB: TestUser;

  beforeAll(async () => {
    userA = await createTestUser();
    userB = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser(userA.id);
    await deleteTestUser(userB.id);
  });

  it("l'utilisateur A peut lire son propre profil", async () => {
    const { data, error } = await userA.client
      .from("profiles")
      .select("id")
      .eq("id", userA.id)
      .single();

    expect(error).toBeNull();
    expect(data?.id).toBe(userA.id);
  });

  it("l'utilisateur A peut modifier son propre profil", async () => {
    const { data, error } = await userA.client
      .from("profiles")
      .update({ display_name: "Profil de A" })
      .eq("id", userA.id)
      .select("display_name")
      .single();

    expect(error).toBeNull();
    expect(data?.display_name).toBe("Profil de A");
  });

  it("l'utilisateur A ne peut pas lire le profil de B", async () => {
    const { data, error } = await userA.client
      .from("profiles")
      .select("id")
      .eq("id", userB.id)
      .maybeSingle();

    // RLS filtre la ligne plutôt que de renvoyer une erreur explicite :
    // la requête réussit mais ne retourne aucune ligne.
    expect(error).toBeNull();
    expect(data).toBeNull();
  });

  it("l'utilisateur A ne peut pas modifier le profil de B", async () => {
    const { data, error } = await userA.client
      .from("profiles")
      .update({ display_name: "Piraté par A" })
      .eq("id", userB.id)
      .select("display_name");

    // Aucune ligne mise à jour (RLS bloque le UPDATE), sans erreur explicite.
    expect(error).toBeNull();
    expect(data).toEqual([]);

    const clientB = createAnonClient();
    const { error: signInError } = await clientB.auth.signInWithPassword({
      email: userB.email,
      password: userB.password,
    });
    expect(signInError).toBeNull();

    const { data: bProfile } = await clientB
      .from("profiles")
      .select("display_name")
      .eq("id", userB.id)
      .single();

    expect(bProfile?.display_name).not.toBe("Piraté par A");
  });

  it("un utilisateur non authentifié ne peut pas accéder aux profils", async () => {
    const anonymousClient = createAnonClient();

    const { data, error } = await anonymousClient
      .from("profiles")
      .select("id")
      .eq("id", userA.id)
      .maybeSingle();

    expect(error).toBeNull();
    expect(data).toBeNull();
  });
});
