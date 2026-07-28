import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getModelByIdForAdmin, getPublishedModels } from "@/lib/queries/catalogue";
import { addGarageItemAction } from "@/lib/actions/garage";
import { GarageModelSearchForm } from "@/components/garage/garage-model-search-form";

type SearchParams = { q?: string; modelId?: string };

export default async function AjouterVoiturePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    redirect("/auth/connexion");
  }

  const { q, modelId } = await searchParams;

  if (modelId) {
    const model = await getModelByIdForAdmin(modelId);

    // getModelByIdForAdmin ne filtre pas sur published_at (fonction pensée
    // pour l'admin) : un utilisateur ne doit pouvoir ajouter à son Garage
    // qu'un modèle réellement publié, vérification explicite ici.
    if (!model || !model.published_at) {
      redirect("/garage/ajouter");
    }

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/garage/ajouter" className="text-sm underline">
          ← Changer de modèle
        </Link>
        <h1 className="mt-4 text-2xl font-bold">
          {model.car_makes?.name} {model.name}
        </h1>

        <form action={addGarageItemAction} className="mt-6 space-y-4">
          <input type="hidden" name="modelId" value={model.id} />

          <fieldset>
            <legend className="text-sm font-medium">
              Ce modèle, c&apos;est :
            </legend>
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="status" value="owned" defaultChecked />
                Je la possède
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="status" value="searching" />
                Je la cherche
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="status" value="dream" />
                Je la rêve
              </label>
            </div>
          </fieldset>

          <div>
            <label className="block text-sm font-medium" htmlFor="notes">
              Notes (optionnel)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 w-full rounded-md border border-black/20 p-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Ajouter au Garage
          </button>
        </form>
      </div>
    );
  }

  const models = await getPublishedModels(q);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Ajouter une voiture</h1>
      <p className="mt-2 text-black/70">
        Recherche le modèle à ajouter à ton Garage.
      </p>

      <div className="mt-6">
        <GarageModelSearchForm defaultValue={q} />
      </div>

      <ul className="mt-8 divide-y divide-black/10">
        {models.map((model) => (
          <li key={model.id} className="py-3">
            <Link
              href={`/garage/ajouter?modelId=${model.id}`}
              className="font-medium underline"
            >
              {model.car_makes?.name} {model.name}
            </Link>
          </li>
        ))}
        {models.length === 0 ? (
          <li className="py-3 text-sm text-black/50">
            {q
              ? `Aucun modèle ne correspond à "${q}".`
              : "Aucun modèle publié pour l'instant."}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
