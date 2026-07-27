import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedModels } from "@/lib/queries/catalogue";
import { ModelSearchForm } from "@/components/models/model-search-form";

export const metadata: Metadata = {
  title: "Modèles — Youngtimer Garage",
  description:
    "Explorez les modèles youngtimer et classiques modernes référencés sur Youngtimer Garage.",
};

export default async function ModelesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const models = await getPublishedModels(q);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Modèles</h1>
      <p className="mt-2 text-black/70">
        Le catalogue youngtimer, classé par marque et modèle.
      </p>

      <div className="mt-6">
        <ModelSearchForm defaultValue={q} />
      </div>

      <ul className="mt-8 divide-y divide-black/10">
        {models.map((model) => (
          <li key={model.id} className="py-3">
            <Link
              href={`/modeles/${model.car_makes?.slug}/${model.slug}`}
              className="font-medium underline"
            >
              {model.car_makes?.name} {model.name}
            </Link>
            {model.description ? (
              <p className="mt-1 text-sm text-black/60">{model.description}</p>
            ) : null}
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
