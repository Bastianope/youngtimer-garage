"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  addGarageItemSchema,
  updateGarageItemStatusSchema,
} from "@/lib/validation/garage";
import { updateLocationSchema } from "@/lib/validation/profile";

export async function addGarageItemAction(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/auth/connexion");

  const parsed = addGarageItemSchema.safeParse({
    modelId: formData.get("modelId"),
    status: formData.get("status"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Formulaire d'ajout invalide.");
  }

  const { modelId, status, notes } = parsed.data;

  const { error } = await supabase.from("garage_items").insert({
    user_id: auth.user.id,
    model_id: modelId,
    status,
    notes: notes ?? null,
  });

  if (error) {
    throw new Error(`Impossible d'ajouter au Garage : ${error.message}`);
  }

  revalidatePath("/garage");
  redirect("/garage");
}

export async function updateGarageItemStatusAction(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/auth/connexion");

  const parsed = updateGarageItemStatusSchema.safeParse({
    itemId: formData.get("itemId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error("Requête de changement de statut invalide.");
  }

  const { itemId, status } = parsed.data;

  const { error } = await supabase
    .from("garage_items")
    .update({ status })
    .eq("id", itemId)
    .eq("user_id", auth.user.id);

  if (error) {
    throw new Error(`Impossible de mettre à jour le statut : ${error.message}`);
  }

  revalidatePath("/garage");
}

export async function deleteGarageItemAction(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/auth/connexion");

  const itemId = formData.get("itemId");
  if (typeof itemId !== "string" || itemId.length === 0) {
    throw new Error("Identifiant manquant.");
  }

  const { error } = await supabase
    .from("garage_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", auth.user.id);

  if (error) {
    throw new Error(`Impossible de supprimer l'élément : ${error.message}`);
  }

  revalidatePath("/garage");
}

export async function toggleModelFollowAction(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/auth/connexion");

  const modelId = formData.get("modelId");
  if (typeof modelId !== "string" || modelId.length === 0) {
    throw new Error("Identifiant de modèle manquant.");
  }

  const { data: existing, error: readError } = await supabase
    .from("model_follows")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("model_id", modelId)
    .maybeSingle();

  if (readError) {
    throw new Error(`Impossible de vérifier le suivi : ${readError.message}`);
  }

  if (existing) {
    const { error } = await supabase
      .from("model_follows")
      .delete()
      .eq("id", existing.id);
    if (error) {
      throw new Error(`Impossible de ne plus suivre ce modèle : ${error.message}`);
    }
  } else {
    const { error } = await supabase
      .from("model_follows")
      .insert({ user_id: auth.user.id, model_id: modelId });
    if (error) {
      throw new Error(`Impossible de suivre ce modèle : ${error.message}`);
    }
  }

  revalidatePath("/modeles");
}

export async function updateLocationPreferenceAction(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/auth/connexion");

  const parsed = updateLocationSchema.safeParse({
    regionName: formData.get("regionName") || undefined,
    departmentName: formData.get("departmentName") || undefined,
    city: formData.get("city") || undefined,
    postalCode: formData.get("postalCode") || undefined,
    locationPrecision: formData.get("locationPrecision"),
    publicLocationEnabled: formData.get("publicLocationEnabled") === "on",
  });

  if (!parsed.success) {
    throw new Error("Formulaire de localisation invalide.");
  }

  const {
    regionName,
    departmentName,
    city,
    postalCode,
    locationPrecision,
    publicLocationEnabled,
  } = parsed.data;

  const { error } = await supabase
    .from("profiles")
    .update({
      region_name: regionName ?? null,
      department_name: departmentName ?? null,
      city: city ?? null,
      postal_code: postalCode ?? null,
      location_precision: locationPrecision,
      public_location_enabled: publicLocationEnabled,
    })
    .eq("id", auth.user.id);

  if (error) {
    throw new Error(`Impossible de mettre à jour la localisation : ${error.message}`);
  }

  revalidatePath("/profil");
}
