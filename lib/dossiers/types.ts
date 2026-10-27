// Contenu éditorial des dossiers, versionné dans le code (relu avant publication).
// Dans les textes : [libellé](/chemin ou https://…) crée un lien, **texte** met en gras.

export type DossierBlock =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; rows: { label: string; value: string }[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; text: string; tone?: "info" | "warning" };

export type DossierCategory = "rallyes" | "modele" | "guide-achat";

export type DossierSource = { title: string; url: string };

export type DossierModelLink = { make: string; model: string; label: string };

export type Dossier = {
  slug: string;
  category: DossierCategory;
  title: string;
  // Titre pour Google (60 à 65 caractères conseillés)
  seoTitle: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  blocks: DossierBlock[];
  sources: DossierSource[];
  // Fiches modèles du catalogue liées (maillage interne dans les deux sens)
  models: DossierModelLink[];
};

export const CATEGORY_LABELS: Record<DossierCategory, string> = {
  rallyes: "Rallyes et événements",
  modele: "Histoire d'un modèle",
  "guide-achat": "Guide d'achat",
};
