import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  getGenerationsForModel,
  getPublishedModelBySlug,
  getVersionsForGeneration,
} from "@/lib/queries/catalogue";
import { ModelFollowButton } from "@/components/models/model-follow-button";
import { MarketNotesSection } from "@/components/models/market-notes-section";
import { ModelImageUpload } from "@/components/admin/model-image-upload";
import type { CarGeneration } from "@/types/catalogue";

type PageParams = { make: string; model: string };

const YOUNGTIMER_THRESHOLD_YEARS = 20;

function getYoungtimerStatus(generations: CarGeneration[]) {
  if (generations.length === 0) return null;

  const currentYear = new Date().getFullYear();

  const referenceYear = generations.reduce<number | null>((latest, generation) => {
    const generationReference = generation.year_end ?? (generation.year_start ? currentYear : null);
    if (generationReference === null) return latest;
    return latest === null ? generationReference : Math.max(latest, generationReference);
  }, null);

  if (referenceYear === null) return null;

  const age = currentYear - referenceYear;

  return {
    isYoungtimer: age >= YOUNGTIMER_THRESHOLD_YEARS,
    yearsUntil: YOUNGTIMER_THRESHOLD_YEARS - age,
  };
}

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

  const youngtimerStatus = getYoungtimerStatus(generations);

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(auth.user);

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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold">
          {model.car_makes?.name} {model.name}
        </h1>
        {youngtimerStatus?.isYoungtimer ? (
          <span className="rounded-full border border-black/20 px-3 py-1 text-xs">
            Youngtimer
          </span>
        ) : null}
        {youngtimerStatus && !youngtimerStatus.isYoungtimer && youngtimerStatus.yearsUntil > 0 ? (
          <span className="rounded-full border border-black/20 px-3 py-1 text-xs text-black/60">
            Youngtimer dans {youngtimerStatus.yearsUntil} an{youngtimerStatus.yearsUntil > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      {model.description ? (
        <p className="mt-3 text-black/70">{model.description}</p>
      ) : null}

      {isAuthenticated ? (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">Photo du modèle</p>
          <ModelImageUpload modelId={model.id} currentImageUrl={model.cover_image_url} />
        </div>
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