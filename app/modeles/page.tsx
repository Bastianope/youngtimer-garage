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

const PATCHWORK_IMAGES = [
  "/images/bmwe30-plate-blurred.jpg",
  "/images/peugeot205-cti-plates-blurred.jpg",
  "/images/porsche-boxster-plate-blurred.jpg",
  "/images/bmwe24.jpg",
  "/images/Alfa3.jpg",
  "/images/Alfa1.jpg",
  "/images/gtturbo.jpg",
  "/images/e31.jpg",
  "/images/clio.jpg",
  "/images/mercedessl.jpg",
];

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
        className="pointer-events-none fixed inset-0 -z-10 grid grid-cols-3 gap-1 opacity-[0.07] sm:grid-cols-5"
      >
        {PATCHWORK_IMAGES.map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image src={src} alt="" fill className="object-cover grayscale" />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[#F4EFE3]/90"
      />

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
    </div>
  );
}