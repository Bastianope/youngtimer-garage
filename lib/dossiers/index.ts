import type { Dossier } from "@/lib/dossiers/types";
import { rallyes2027 } from "@/lib/dossiers/content/rallyes-2027";
import { golf1 } from "@/lib/dossiers/content/golf-1";
import { guideBmwE38E46 } from "@/lib/dossiers/content/guide-bmw-e38-e46";
import { peugeot205Gti } from "@/lib/dossiers/content/peugeot-205-gti";
import { golf2Gti } from "@/lib/dossiers/content/golf-2-gti";
import { bmwE30 } from "@/lib/dossiers/content/bmw-e30";
import { renault5GtTurbo } from "@/lib/dossiers/content/renault-5-gt-turbo";
import { renaultClioWilliams } from "@/lib/dossiers/content/renault-clio-williams";
import { mercedes190e } from "@/lib/dossiers/content/mercedes-190e";
import { mazdaMx5Na } from "@/lib/dossiers/content/mazda-mx5-na";
import { porsche944 } from "@/lib/dossiers/content/porsche-944";
import { carteGriseCollection } from "@/lib/dossiers/content/carte-grise-collection";
import { assuranceYoungtimer } from "@/lib/dossiers/content/assurance-youngtimer";
import { alpineGtaA610 } from "@/lib/dossiers/content/alpine-gta-a610";
import { renaultSportSpider } from "@/lib/dossiers/content/renault-sport-spider";
import { venturi } from "@/lib/dossiers/content/venturi";
import { peugeot405T16 } from "@/lib/dossiers/content/peugeot-405-t16";
import { lanciaThema832 } from "@/lib/dossiers/content/lancia-thema-832";
import { bmwE31 } from "@/lib/dossiers/content/bmw-e31";

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
  mercedes190e,
  mazdaMx5Na,
  porsche944,
  carteGriseCollection,
  assuranceYoungtimer,
  alpineGtaA610,
  renaultSportSpider,
  venturi,
  peugeot405T16,
  lanciaThema832,
  bmwE31,
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
