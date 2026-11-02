import type { Dossier } from "@/lib/dossiers/types";
import { rallyes2027 } from "@/lib/dossiers/content/rallyes-2027";
import { golf1 } from "@/lib/dossiers/content/golf-1";
import { guideBmwE38E46 } from "@/lib/dossiers/content/guide-bmw-e38-e46";
import { peugeot205Gti } from "@/lib/dossiers/content/peugeot-205-gti";
import { golf2Gti } from "@/lib/dossiers/content/golf-2-gti";
import { bmwE30 } from "@/lib/dossiers/content/bmw-e30";
import { renault5GtTurbo } from "@/lib/dossiers/content/renault-5-gt-turbo";
import { renaultClioWilliams } from "@/lib/dossiers/content/renault-clio-williams";

// Ordre d'affichage : le plus récent d'abord
const DOSSIERS: Dossier[] = [
  rallyes2027,
  guideBmwE38E46,
  golf1,
  peugeot205Gti,
  golf2Gti,
  bmwE30,
  renault5GtTurbo,
  renaultClioWilliams,
].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getAllDossiers(): Dossier[] {
  return DOSSIERS;
}

export function getDossierBySlug(slug: string): Dossier | undefined {
  return DOSSIERS.find((dossier) => dossier.slug === slug);
}

// Dossiers qui parlent d'un modèle du catalogue (encart sur la fiche modèle)
export function getDossiersForModel(makeSlug: string, modelSlug: string): Dossier[] {
  return DOSSIERS.filter((dossier) =>
    dossier.models.some((link) => link.make === makeSlug && link.model === modelSlug),
  );
}
