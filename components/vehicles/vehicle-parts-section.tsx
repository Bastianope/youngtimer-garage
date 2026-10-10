import Link from "next/link";

type Props = {
  modelLabel: string;
  makeSlug: string;
  modelSlug: string;
  partsSearchUrl: string | null;
};

function hostName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "un site spécialisé";
  }
}

// Raccourcis vers les pièces de la voiture : recherche externe du bon modèle et petites annonces du site
export function VehiclePartsSection({ modelLabel, makeSlug, modelSlug, partsSearchUrl }: Props) {
  return (
    <section id="pieces" className="mt-8 scroll-mt-20 rounded-md border border-neutral-200 p-4">
      <h2 className="text-lg font-semibold">Pièces pour ta {modelLabel}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {partsSearchUrl && (
          <a
            href={partsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-black px-3 py-2 text-sm text-white"
          >
            Pièces d&apos;occasion sur {hostName(partsSearchUrl)}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <Link
          href={`/modeles/${makeSlug}/${modelSlug}#annonces`}
          className="inline-flex items-center rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          Je cherche une pièce : annonces entre passionnés
        </Link>
      </div>
      {partsSearchUrl && (
        <p className="mt-2 text-xs text-neutral-500">La recherche s&apos;ouvre directement sur ton modèle, dans un nouvel onglet.</p>
      )}
    </section>
  );
}
