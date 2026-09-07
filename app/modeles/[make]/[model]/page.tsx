import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getGenerationsForModel,
  getPublishedModelBySlug,
  getVersionsForGeneration,
} from "@/lib/queries/catalogue";
import { ModelFollowButton } from "@/components/models/model-follow-button";
import { MarketNotesSection } from "@/components/models/market-notes-section";

type PageParams = { make: string; model: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { make, model: modelSlug } = await params;
  const model = await getPublishedModelBySlug(make, modelSlug);

  if (!model) {
    return { title: "Modèle introuvable — Youngtimer Garage" };
  }

  return {
    title: `${model.car_makes?.name} ${model.name} — Youngtimer Garage`,
    description:
      model.description ??
      `Découvrez le ${model.car_makes?.name} ${model.name} sur Youngtimer Garage.`,
  };
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { make, model: modelSlug } = await params;
  const model = await getPublishedModelBySlug(make, modelSlug);

  if (!model) {
    notFound();
  }

  const generations = await getGenerationsForModel(model.id);
  const versionsByGeneration = await Promise.all(
    generations.map((generation) => getVersionsForGeneration(generation.id)),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {model.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={model.cover_image_url}
          alt={`${model.car_makes?.name} ${model.name}`}
          className="mb-6 h-64 w-full rounded-md object-cover"
        />
      ) : null}

      <div className="mt-4">
        <ModelFollowButton modelId={model.id} />
      </div>

      <h1 className="text-2xl font-bold">
        {model.car_makes?.name} {model.name}
      </h1>

      {model.description ? (
        <p className="mt-3 text-black/70">{model.description}</p>
      ) : null}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Versions</h2>
        <div className="mt-3 space-y-4">
          {generations.map((generation, index) => (
            <div key={generation.id}>
              <p className="font-medium">
                {generation.name}
                {generation.year_start
                  ? ` (${generation.year_start}${
                      generation.year_end ? `–${generation.year_end}` : ""
                    })`
                  : ""}
              </p>
              <ul className="mt-1 list-inside list-disc text-sm text-black/70">
                {versionsByGeneration[index].map((version) => (
                  <li key={version.id}>
                    {version.name}
                    {version.engine_description
                      ? ` — ${version.engine_description}`
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {generations.length === 0 ? (
            <p className="text-sm text-black/50">
              Aucune génération renseignée pour l&apos;instant.
            </p>
          ) : null}
        </div>
      </section>

<MarketNotesSection carModelId={model.id} />

{/* Sections réservées pour les phases suivantes : annonces, vidéos,
    pièces, guides, événements, professionnels, communauté. */}
    </div>
  );
}
