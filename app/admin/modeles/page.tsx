import Link from "next/link";
import { getAllMakes, getAllModelsForAdmin } from "@/lib/queries/catalogue";
import { CreateModelForm } from "@/components/admin/create-model-form";

export default async function AdminModelesPage() {
  const [models, makes] = await Promise.all([
    getAllModelsForAdmin(),
    getAllMakes(),
  ]);

  return (
    <div>
      <h2 className="text-base font-semibold">Nouveau modèle</h2>
      <div className="mt-3">
        <CreateModelForm makes={makes} />
      </div>

      <h2 className="mt-8 text-base font-semibold">
        Modèles existants ({models.length})
      </h2>
      <ul className="mt-3 divide-y divide-black/10">
        {models.map((model) => (
          <li key={model.id} className="flex items-center justify-between py-2 text-sm">
            <Link href={`/admin/modeles/${model.id}`} className="underline">
              {model.car_makes?.name} {model.name}
            </Link>
            <span
              className={
                model.published_at
                  ? "text-green-700"
                  : "text-black/50"
              }
            >
              {model.published_at ? "Publié" : "Brouillon"}
            </span>
          </li>
        ))}
        {models.length === 0 ? (
          <li className="py-2 text-sm text-black/50">
            Aucun modèle pour l&apos;instant.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
