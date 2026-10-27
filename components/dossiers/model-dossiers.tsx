import Link from "next/link";
import { getDossiersForModel } from "@/lib/dossiers";

// Encart de la fiche modèle : les dossiers qui en parlent
export function ModelDossiers({ makeSlug, modelSlug }: { makeSlug: string; modelSlug: string }) {
  const dossiers = getDossiersForModel(makeSlug, modelSlug);
  if (dossiers.length === 0) return null;

  return (
    <aside className="mt-4 rounded-md border border-black/10 p-3">
      <p className="text-sm font-semibold">À lire dans nos dossiers</p>
      <ul className="mt-1 space-y-1 text-sm">
        {dossiers.map((dossier) => (
          <li key={dossier.slug}>
            <Link href={`/dossiers/${dossier.slug}`} className="text-[#C81E1E] underline underline-offset-2">
              {dossier.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
