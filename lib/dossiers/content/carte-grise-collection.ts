import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Service-Public.fr vérifié le 19/06/2026, FFVE, L'Automobiliste du 07/11/2026,
// Le Guide Auto Pratique du 14/08/2026, VPN Autos, Club des Juristes). Règles susceptibles d'évoluer :
// à revérifier à chaque mise à jour, en particulier les ZFE.
export const carteGriseCollection: Dossier = {
  slug: "carte-grise-collection-conditions-demarches-avantages",
  category: "pratique",
  title: "Carte grise de collection : conditions, démarches, avantages et limites",
  seoTitle: "Carte grise collection 2026 : conditions, FFVE, prix et ZFE",
  description:
    "Carte grise de collection en 2026 : les 3 conditions, l'attestation FFVE, la démarche ANTS, le coût, le contrôle technique tous les 5 ans et les règles en ZFE.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Contrôle technique espacé, carte grise moins chère, dérogations dans la plupart des ZFE : la mention « véhicule de collection » a de vrais avantages. Mais elle n'est accessible qu'à partir de 30 ans, et seulement pour une voiture restée d'origine. Voici les conditions, la démarche pas à pas et ce que ça change vraiment.",
  blocks: [
    {
      type: "callout",
      tone: "info",
      text: "**Youngtimer ne veut pas dire « collection ».** Sur Youngtimer Garage, une voiture est youngtimer dès 20 ans. La carte grise de collection, elle, n'est possible qu'**à partir de 30 ans**. Une 205 GTI de 1994 y a droit, une 206 de 2002 pas encore.",
    },

    { type: "h2", id: "conditions", text: "Les 3 conditions à remplir" },
    {
      type: "list",
      items: [
        "**Avoir 30 ans ou plus**, à compter de la fabrication ou de la première mise en circulation",
        "**Ne plus être produit** : le type du véhicule (case D.2 de la carte grise) ne doit plus être fabriqué. La FFVE donne l'exemple de la Fiat 500 de 1960, dont le type n'a rien à voir avec celui de la Fiat 500 actuelle",
        "**Être resté d'origine** : les caractéristiques techniques ne doivent pas avoir été modifiées. Les véhicules modifiés illégalement sont exclus, selon la FFVE",
      ],
    },
    {
      type: "p",
      text: "La mention n'est **ni automatique ni obligatoire** (Service-Public.fr) : une voiture de plus de 30 ans peut très bien garder une carte grise normale.",
    },

    { type: "h2", id: "demarche", text: "La démarche pas à pas" },
    {
      type: "table",
      head: ["Étape", "Ce qu'il faut faire", "À savoir"],
      rows: [
        ["1. Attestation", "Demander une attestation au constructeur, à son représentant en France ou à la FFVE", "Environ 60 € plus 12 € de frais de dossier, 6 à 8 semaines de délai selon Le Guide Auto Pratique"],
        ["2. Contrôle technique", "Passer un contrôle technique récent", "Exigé pour les véhicules de moins de 3,5 t mis en circulation depuis le 1er janvier 1960"],
        ["3. Demande", "Faire la demande sur le site de l'ANTS, dans un point numérique ou chez un professionnel habilité", "Plus possible au guichet de la préfecture"],
        ["4. En attendant", "Le certificat provisoire permet de rouler", "Valable un mois, uniquement en France"],
      ],
      caption: "D'après Service-Public.fr (vérifié le 19 juin 2026) et Le Guide Auto Pratique (14 août 2026).",
    },
    { type: "h3", text: "Les documents demandés" },
    {
      type: "list",
      items: [
        "Pièce d'identité et justificatif de domicile de moins de 6 mois",
        "Formulaire cerfa n° 13750",
        "Carte grise actuelle, ou à défaut une pièce prouvant l'origine de propriété",
        "Procès-verbal de contrôle technique (véhicule de 1960 et après, moins de 3,5 t)",
        "Attestation du constructeur ou de la FFVE",
        "En cas d'achat récent : attestation d'assurance et permis de conduire",
        "Véhicule importé : quitus fiscal (Union européenne) ou certificat 846 A (hors Union européenne)",
      ],
    },

    { type: "h2", id: "avantages", text: "Ce que ça change" },
    {
      type: "table",
      head: ["", "Carte grise normale", "Carte grise de collection"],
      rows: [
        ["Contrôle technique", "Tous les 2 ans", "**Tous les 5 ans** ; dispense totale avant 1960"],
        ["Taxe régionale de la carte grise", "Plein tarif", "**Réduite de 50 %** selon Le Guide Auto Pratique"],
        ["Plaques", "Fond blanc", "Plaques noires d'époque possibles, pas obligatoires"],
        ["Zones à faibles émissions", "Selon la vignette Crit'Air", "Dérogation dans la plupart des ZFE, selon les règles locales"],
        ["Circulation", "Libre", "Libre, en France et à l'étranger, sans limite de jours"],
      ],
      caption: "Le coût total de la carte grise dépend de la région : le prix du cheval fiscal va d'environ 27 € en Corse à 55 € en Île-de-France en 2026. Service-Public.fr propose un simulateur.",
    },

    { type: "h2", id: "zfe", text: "Voiture de collection et ZFE" },
    {
      type: "p",
      text: "Il n'existe **pas d'exemption nationale automatique** : chaque zone à faibles émissions fixe ses propres règles par arrêté. En pratique, selon un recensement de VPN Autos (avril 2026), toutes les grandes métropoles concernées accordent une dérogation aux véhicules de collection, mais avec des conditions différentes :",
    },
    {
      type: "list",
      items: [
        "**Carte grise de collection exigée** : Grand Paris, Marseille-Aix, Toulouse, Rouen",
        "**Carte grise de collection ou autre dérogation** : Lyon (par exemple un forfait « petit rouleur » de 52 jours par an)",
        "**Dérogation permanente** : Grenoble, Strasbourg",
        "**Dérogation sur justificatifs** : Montpellier",
        "**Dérogation temporaire** de 3 ans : Bordeaux",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Le cadre des ZFE bouge.** Le 21 mai 2026, le Conseil constitutionnel a censuré la suppression des ZFE votée dans la loi de simplification, pour une raison de procédure. Les ZFE restent donc en place, mais le débat n'est pas clos. Vérifie toujours l'arrêté de la métropole où tu roules avant d'y entrer.",
    },

    { type: "h2", id: "limites", text: "Les limites à connaître" },
    {
      type: "list",
      items: [
        "**Une voiture modifiée peut être refusée** : préparation moteur, suspensions ou jantes non d'origine peuvent bloquer l'attestation",
        "**Délai** : comptez près de deux mois entre la demande d'attestation et la carte grise définitive",
        "**Voiture de transport avec chauffeur** : le contrôle technique redevient annuel, même en collection",
        "**Assurance** : la carte grise de collection n'est pas obligatoire pour un contrat « collection », mais les assureurs posent souvent d'autres conditions (âge du conducteur, kilométrage annuel, voiture secondaire). Voir notre [guide de l'assurance youngtimer](/dossiers/assurance-youngtimer-collection-contrats-conditions)",
      ],
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Service-Public.fr – Certificat d'immatriculation de collection](https://www.service-public.gouv.fr/particuliers/vosdroits/F1925) : la fiche officielle et le simulateur de coût",
        "[FFVE – Éligibilité à la carte grise de collection](https://support.ffve.org/portal/fr/kb/articles/mon-v%C3%A9hicule-a-plus-de-30-ans-est-il-%C3%A9ligible-%C3%A0-la-carte-grise-de-collection)",
        "Enregistre la date de ton prochain contrôle technique dans [Mon Garage](/garage) : le carnet te prévient avant l'échéance",
      ],
    },
  ],
  sources: [
    { title: "Service-Public.fr – Comment obtenir un certificat d'immatriculation véhicule de collection ?", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1925" },
    { title: "FFVE – Mon véhicule de plus de 30 ans est-il éligible à la carte grise de collection ?", url: "https://support.ffve.org/portal/fr/kb/articles/mon-v%C3%A9hicule-a-plus-de-30-ans-est-il-%C3%A9ligible-%C3%A0-la-carte-grise-de-collection" },
    { title: "L'Automobiliste – Voiture de collection : les trois conditions et les démarches (novembre 2026)", url: "https://lautomobiliste.fr/07/11/2026/voiture-collection-conditions-carte-grise-controle-technique-novembre-2026/" },
    { title: "Le Guide Auto Pratique – Carte grise collection 2026 : prix, conditions FFVE et démarche ANTS", url: "https://lejournalauto.com/categorie/collection/carte-grise-collection-2026-conditions-avantages-demarche" },
    { title: "VPN Autos – ZFE et voiture de collection : quel impact ?", url: "https://blog.vpn-autos.com/zfe-et-voiture-de-collection-quel-impact-18357/" },
    { title: "Club des Juristes – Le Conseil constitutionnel retoque la suppression des ZFE", url: "https://www.leclubdesjuristes.com/en-bref/le-conseil-constitutionnel-retoque-la-suppression-des-zfe-15980/" },
  ],
  models: [],
};
