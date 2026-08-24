import Image from "next/image";
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
    <div className="relative isolate">
      {/* Patchwork de fond */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
      >
        <Image
          src="/images/patchwork-modeles.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div aria-hidden className="fixed inset-0 -z-10 bg-[#F4EFE3]/90" />

      <div className="relative mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-bold">Modèles</h1>
        <p className="mt-2 text-black/70">
          Le catalogue youngtimer, classé par marque et modèle.
        </p>

        <div className="mt-6">
          <ModelSearchForm defaultValue={q} />
        </div>

        <ul className="mt-8 divide-y divide-black/10">
          {models.map((model) => (
            <li key={model.id} className="flex items-center gap-4 py-3">
              {model.cover_image_url ? (
                <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={model.cover_image_url}
                    alt={`${model.car_makes?.name} ${model.name}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-24 flex-shrink-0 rounded-md bg-black/5" />
              )}

              <div>
                <Link
                  href={`/modeles/${model.car_makes?.slug}/${model.slug}`}
                  className="font-medium underline"
                >
                  {model.car_makes?.name} {model.name}
                </Link>
                {model.description ? (
                  <p className="mt-1 text-sm text-black/60">{model.description}</p>
                ) : null}
              </div>
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
    </div>
  );
}