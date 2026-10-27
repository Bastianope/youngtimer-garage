import Link from "next/link";
import type { Metadata } from "next";
import { getAllDossiers } from "@/lib/dossiers";
import { CATEGORY_LABELS } from "@/lib/dossiers/types";

export const metadata: Metadata = {
  title: "Dossiers youngtimers : histoires de modèles, guides d'achat, rallyes | Youngtimer Garage",
  description:
    "Les dossiers de Youngtimer Garage : histoire des modèles cultes, guides d'achat avec points de vigilance et cotes, grands rallyes de voitures de collection.",
  alternates: { canonical: "/dossiers" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function DossiersPage() {
  const dossiers = getAllDossiers();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Dossiers</h1>
      <p className="mt-2 text-black/70">
        Histoires de modèles, guides d&apos;achat et grands rendez-vous : des articles sourcés, écrits pour les
        passionnés de youngtimers.
      </p>

      <ul className="mt-8 space-y-4">
        {dossiers.map((dossier) => (
          <li key={dossier.slug}>
            <Link
              href={`/dossiers/${dossier.slug}`}
              className="block rounded-md border border-black/10 p-4 transition-colors hover:border-black/30"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#C81E1E]">
                {CATEGORY_LABELS[dossier.category]}
              </p>
              <h2 className="mt-1 text-lg font-semibold">{dossier.title}</h2>
              <p className="mt-1 text-sm text-black/70">{dossier.description}</p>
              <p className="mt-2 text-xs text-black/50">Mis à jour le {formatDate(dossier.updatedAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
