// Liens vers les sites partenaires (pièces neuves, assurance), réunis ici pour pouvoir
// remplacer une adresse par un lien d'affiliation sans toucher aux pages.
// Les sites de pièces neuves démarrent par l'immatriculation ou le modèle :
// on renvoie vers leur accueil, c'est là que la compatibilité est vérifiée.

export type PartnerLink = { label: string; url: string; hint?: string };

export const NEW_PARTS_LINKS: PartnerLink[] = [
  { label: "Oscaro", url: "https://www.oscaro.com/" },
  { label: "Autodoc", url: "https://www.auto-doc.fr/" },
  { label: "Mister Auto", url: "https://www.mister-auto.com/" },
  { label: "Daparto", url: "https://www.daparto.fr/", hint: "comparateur" },
];

export const INSURANCE_COMPARATORS: PartnerLink[] = [
  { label: "LeLynx", url: "https://www.lelynx.fr/assurance-auto/" },
  { label: "LesFurets", url: "https://www.lesfurets.com/assurance-auto" },
  { label: "Assurland", url: "https://www.assurland.com/" },
];

// Paramètre de suivi ajouté aux liens sortants (à remplacer par les identifiants d'affiliation)
export function withSource(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "youngtimer-garage");
    return u.toString();
  } catch {
    return url;
  }
}
