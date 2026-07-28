import { createClient } from "@/lib/supabase/server";
import { updateLocationPreferenceAction } from "@/lib/actions/garage";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "region_name, department_name, city, postal_code, location_precision, public_location_enabled",
    )
    .eq("id", auth.user?.id ?? "")
    .maybeSingle();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Profil</h1>
      <p className="mt-2 text-black/70">
        Connecté en tant que {auth.user?.email}.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Localisation</h2>
        <p className="mt-1 text-sm text-black/60">
          Ta position exacte n&apos;est jamais publique. Ces informations
          servent uniquement à te proposer du contenu pertinent près de
          chez toi.
        </p>

        <form action={updateLocationPreferenceAction} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="regionName">
                Région
              </label>
              <input
                id="regionName"
                name="regionName"
                defaultValue={profile?.region_name ?? ""}
                className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="departmentName"
              >
                Département
              </label>
              <input
                id="departmentName"
                name="departmentName"
                defaultValue={profile?.department_name ?? ""}
                className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="city">
                Ville
              </label>
              <input
                id="city"
                name="city"
                defaultValue={profile?.city ?? ""}
                className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="postalCode">
                Code postal
              </label>
              <input
                id="postalCode"
                name="postalCode"
                defaultValue={profile?.postal_code ?? ""}
                className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium"
              htmlFor="locationPrecision"
            >
              Précision affichée publiquement
            </label>
            <select
              id="locationPrecision"
              name="locationPrecision"
              defaultValue={profile?.location_precision ?? "department"}
              className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
            >
              <option value="country">Pays</option>
              <option value="region">Région</option>
              <option value="department">Département</option>
              <option value="city">Ville</option>
              <option value="approximate">Approximative</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="publicLocationEnabled"
              defaultChecked={profile?.public_location_enabled ?? true}
            />
            Afficher ma localisation approximative aux autres membres
          </label>

          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Enregistrer
          </button>
        </form>
      </section>
    </div>
  );
}
