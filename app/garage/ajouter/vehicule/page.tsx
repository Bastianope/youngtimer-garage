import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getModelByIdForAdmin, getGenerationsForModel } from "@/lib/queries/catalogue";
import { createOwnedVehicleAction } from "@/app/garage/ajouter/vehicule/actions";

export default async function AjouterVehiculePage({
  searchParams,
}: {
  searchParams: Promise<{ modelId?: string }>;
}) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    redirect("/auth/connexion");
  }

  const { modelId } = await searchParams;
  if (!modelId) {
    redirect("/garage/ajouter");
  }

  const model = await getModelByIdForAdmin(modelId);
  if (!model || !model.published_at) {
    redirect("/garage/ajouter");
  }

  const generations = await getGenerationsForModel(model.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href={`/garage/ajouter?modelId=${model.id}`} className="text-sm underline">
        ← Retour
      </Link>
      <h1 className="mt-4 text-2xl font-bold">
        {model.car_makes?.name} {model.name}
      </h1>
      <p className="mt-2 text-black/70">
        Renseigne les informations de ton véhicule. Ces détails constitueront le pédigree de ta voiture.
      </p>

      <form action={createOwnedVehicleAction} className="mt-6 space-y-4">
        <input type="hidden" name="modelId" value={model.id} />

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Génération</span>
          <select name="generationId" required className="w-full rounded-md border border-black/20 px-3 py-2 text-sm">
            <option value="">— À sélectionner —</option>
            {generations.map((generation) => (
              <option key={generation.id} value={generation.id}>
                {generation.name}
                {generation.year_start
                  ? ` (${generation.year_start}${generation.year_end ? `–${generation.year_end}` : ""})`
                  : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Année</span>
          <input type="number" name="modelYear" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Kilométrage</span>
          <input type="number" name="mileageKm" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">VIN (optionnel)</span>
          <input type="text" name="vin" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Numéro de châssis (optionnel)</span>
          <input type="text" name="chassisNumber" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Prix d&apos;achat en € (optionnel)</span>
          <input type="number" name="purchasePriceAmount" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Date d&apos;achat (optionnel)</span>
          <input type="date" name="purchaseDate" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Description et options (optionnel)</span>
          <textarea name="description" rows={4} className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Visibilité</span>
          <select name="privacyLevel" defaultValue="private" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm">
            <option value="private">Privé</option>
            <option value="unlisted">Non répertorié</option>
            <option value="public">Public</option>
          </select>
        </label>

        <button type="submit" className="w-full rounded-md bg-black px-4 py-2 text-sm text-white">
          Créer mon véhicule
        </button>
      </form>
    </div>
  );
}