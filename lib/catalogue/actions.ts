"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  generationSchema,
  makeSchema,
  modelSchema,
  slugify,
  versionSchema,
} from "@/lib/validation/catalogue";

export type CatalogueActionResult = {
  error?: string;
};

/**
 * Toutes ces actions s'appuient sur les policies RLS `admin write` de la
 * migration 0002 comme unique garde-fou réel : si l'utilisateur n'est pas
 * admin/editor, Supabase refuse l'écriture indépendamment de ce que fait
 * ce code. Le contrôle de rôle affiché dans l'UI (lib/auth/roles.ts) n'est
 * qu'un confort d'affichage, jamais une autorisation.
 */

export async function createMake(
  _prevState: CatalogueActionResult,
  formData: FormData,
): Promise<CatalogueActionResult> {
  const parsed = makeSchema.safeParse({
    name: formData.get("name"),
    countryOrigin: formData.get("countryOrigin") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("car_makes").insert({
    name: parsed.data.name,
    slug: slugify(parsed.data.name),
    country_origin: parsed.data.countryOrigin ?? null,
    created_by: userData.user?.id ?? null,
  });

  if (error) {
    return { error: `Impossible de créer la marque : ${error.message}` };
  }

  revalidatePath("/admin/marques");
  redirect("/admin/marques");
}

export async function createModel(
  _prevState: CatalogueActionResult,
  formData: FormData,
): Promise<CatalogueActionResult> {
  const parsed = modelSchema.safeParse({
    makeId: formData.get("makeId"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("car_models")
    .insert({
      make_id: parsed.data.makeId,
      name: parsed.data.name,
      slug: slugify(parsed.data.name),
      description: parsed.data.description ?? null,
      created_by: userData.user?.id ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return { error: `Impossible de créer le modèle : ${error.message}` };
  }

  revalidatePath("/admin/modeles");
  redirect(`/admin/modeles/${data.id}`);
}

export async function togglePublishModel(modelId: string, publish: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("car_models")
    .update({ published_at: publish ? new Date().toISOString() : null })
    .eq("id", modelId);

  if (error) {
    throw new Error(`Impossible de mettre à jour la publication : ${error.message}`);
  }

  revalidatePath("/admin/modeles");
  revalidatePath(`/admin/modeles/${modelId}`);
  revalidatePath("/modeles");
}

export async function updateModelCoverImage(modelId: string, imageUrl: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("car_models")
    .update({ cover_image_url: imageUrl })
    .eq("id", modelId);

  if (error) {
    throw new Error(`Impossible de mettre à jour l'image : ${error.message}`);
  }

  revalidatePath(`/admin/modeles/${modelId}`);
  revalidatePath("/modeles");
}

export async function createGeneration(
  _prevState: CatalogueActionResult,
  formData: FormData,
): Promise<CatalogueActionResult> {
  const parsed = generationSchema.safeParse({
    modelId: formData.get("modelId"),
    name: formData.get("name"),
    yearStart: formData.get("yearStart") || undefined,
    yearEnd: formData.get("yearEnd") || undefined,
    bodyType: formData.get("bodyType") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("car_generations").insert({
    model_id: parsed.data.modelId,
    name: parsed.data.name,
    year_start: parsed.data.yearStart ?? null,
    year_end: parsed.data.yearEnd ?? null,
    body_type: parsed.data.bodyType ?? null,
    created_by: userData.user?.id ?? null,
  });

  if (error) {
    return { error: `Impossible de créer la génération : ${error.message}` };
  }

  revalidatePath(`/admin/modeles/${parsed.data.modelId}`);
  return {};
}

export async function createVersion(
  _prevState: CatalogueActionResult,
  formData: FormData,
): Promise<CatalogueActionResult> {
  const parsed = versionSchema.safeParse({
    generationId: formData.get("generationId"),
    name: formData.get("name"),
    engineDescription: formData.get("engineDescription") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.from("car_versions").insert({
    generation_id: parsed.data.generationId,
    name: parsed.data.name,
    engine_description: parsed.data.engineDescription ?? null,
    created_by: userData.user?.id ?? null,
  });

  if (error) {
    return { error: `Impossible de créer la version : ${error.message}` };
  }

  const modelId = formData.get("modelId");
  if (typeof modelId === "string") {
    revalidatePath(`/admin/modeles/${modelId}`);
  }
  return {};
}
