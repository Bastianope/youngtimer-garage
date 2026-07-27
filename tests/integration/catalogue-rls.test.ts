import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  canRunIntegrationTests,
  createAdminClient,
  createAnonClient,
  createTestUser,
  deleteTestUser,
  type TestUser,
} from "./setup/supabase-test-clients";

/**
 * Valide les policies RLS de public.car_makes / car_models (migration
 * 0002_catalogue.sql) contre une instance Supabase locale réelle.
 * Ignoré automatiquement si aucune instance locale n'est configurée.
 */
describe.skipIf(!canRunIntegrationTests)("RLS — catalogue", () => {
  let admin: TestUser;
  let regularUser: TestUser;
  let makeId: string;

  beforeAll(async () => {
    admin = await createTestUser();
    regularUser = await createTestUser();

    const service = createAdminClient();
    await service
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", admin.id);

    const { data: make } = await service
      .from("car_makes")
      .insert({ name: "Test Make", slug: `test-make-${admin.id.slice(0, 8)}` })
      .select("id")
      .single();
    makeId = make!.id;
  });

  afterAll(async () => {
    const service = createAdminClient();
    await service.from("car_makes").delete().eq("id", makeId);
    await deleteTestUser(admin.id);
    await deleteTestUser(regularUser.id);
  });

  it("un admin peut créer un modèle en brouillon (non publié)", async () => {
    const { data, error } = await admin.client
      .from("car_models")
      .insert({ make_id: makeId, name: "Test Model", slug: "test-model-draft" })
      .select("id, published_at")
      .single();

    expect(error).toBeNull();
    expect(data?.published_at).toBeNull();
  });

  it("un utilisateur non-admin ne peut pas créer de modèle", async () => {
    const { data, error } = await regularUser.client
      .from("car_models")
      .insert({ make_id: makeId, name: "Should Fail", slug: "should-fail" })
      .select("id");

    // RLS bloque le INSERT : soit une erreur, soit aucune ligne créée.
    expect(data === null || (data?.length ?? 0) === 0).toBe(true);
    if (!error) {
      expect(data).toEqual([]);
    }
  });

  it("un utilisateur non-admin ne peut pas lire un modèle non publié", async () => {
    const service = createAdminClient();
    const { data: draft } = await service
      .from("car_models")
      .insert({ make_id: makeId, name: "Draft Only", slug: "draft-only" })
      .select("id")
      .single();

    const { data, error } = await regularUser.client
      .from("car_models")
      .select("id")
      .eq("id", draft!.id)
      .maybeSingle();

    expect(error).toBeNull();
    expect(data).toBeNull();

    await service.from("car_models").delete().eq("id", draft!.id);
  });

  it("un visiteur anonyme peut lire un modèle publié", async () => {
    const service = createAdminClient();
    const { data: published } = await service
      .from("car_models")
      .insert({
        make_id: makeId,
        name: "Published Model",
        slug: "published-model",
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    const anonClient = createAnonClient();
    const { data, error } = await anonClient
      .from("car_models")
      .select("id")
      .eq("id", published!.id)
      .maybeSingle();

    expect(error).toBeNull();
    expect(data?.id).toBe(published!.id);

    await service.from("car_models").delete().eq("id", published!.id);
  });

  it("un visiteur anonyme ne peut pas modifier un modèle", async () => {
    const service = createAdminClient();
    const { data: published } = await service
      .from("car_models")
      .insert({
        make_id: makeId,
        name: "Protected Model",
        slug: "protected-model",
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    const anonClient = createAnonClient();
    const { data, error } = await anonClient
      .from("car_models")
      .update({ name: "Hacked" })
      .eq("id", published!.id)
      .select("id");

    expect(error === null ? data : []).toEqual([]);

    await service.from("car_models").delete().eq("id", published!.id);
  });
});
