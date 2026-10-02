"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateLocationSchema } from "@/lib/validation/profile";

// upsert plutôt qu'update : si la ligne profil manque, elle est créée au lieu
// d'un enregistrement qui "réussit" sans rien modifier
export async function saveProfileAction(formData: FormData) {
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
  if (!parsed.success) redirect("/profil?erreur=formulaire");

  const d = parsed.data;
  const { error } = await supabase.from("profiles").upsert(
    {
      id: auth.user.id,
      region_name: d.regionName ?? null,
      department_name: d.departmentName ?? null,
      city: d.city ?? null,
      postal_code: d.postalCode ?? null,
      location_precision: d.locationPrecision,
      public_location_enabled: d.publicLocationEnabled,
    },
    { onConflict: "id" },
  );

  if (error) {
    redirect(`/profil?erreur=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/profil");
  redirect("/profil?enregistre=1");
}
