import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Retro Motor, Wikipédia, ClassicDoctor, PassionYoungtimer).
// Les prix sont des estimations de marché, pas une cote officielle.
export const mercedes190e: Dossier = {
  slug: "mercedes-190e-w201-histoire-moteurs-achat",
  category: "modele",
  title: "Mercedes 190E (W201) : l'histoire de la « Baby Benz », ses moteurs et comment bien l'acheter",
  seoTitle: "Mercedes 190E W201 : histoire, moteurs, 2.3-16, problèmes et prix",
  description:
    "La Mercedes 190 W201 de 1982 à 1993 : moteurs essence et diesel, 2.6 six cylindres, 2.3-16 et Evolution, points à vérifier et prix observés en 2026.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Avec la 190, Mercedes descend pour la première fois sur le terrain de la BMW Série 3, sans rien céder sur la qualité. Près de 1,9 million d'exemplaires plus tard, la « Baby Benz » est devenue l'un des youngtimers les plus faciles à vivre. Voici son histoire, ses moteurs, et ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1982 : la plus petite des Mercedes" },
    {
      type: "p",
      text: "La W201 arrive en concession en **décembre 1982**, d'abord avec un 2 litres à carburateur (190, 90 ch) ou à injection (190E, 122 ch). Selon Retro Motor, son développement aurait coûté plus de 600 millions de livres. Elle inaugure un **essieu arrière multibras** qui donne à cette berline compacte une tenue de route de grande routière.",
    },
    {
      type: "p",
      text: "La gamme s'étoffe vite : diesel « chuchotant » 190D, puis **190E 2.6 six cylindres** en 1985. Le restylage de **1988** ajoute les protections latérales, revoit l'intérieur et allonge légèrement la voiture. La production s'arrête en **1993**, et la Classe C (W202) prend le relais.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "Décembre 1982 à 1993, à Sindelfingen puis Brême" },
        { label: "Total", value: "Environ **1,88 million** d'exemplaires (1 879 630 selon Retro Motor)" },
        { label: "Phases", value: "Phase 1 jusqu'en 1988, phase 2 restylée ensuite" },
        { label: "Sportives", value: "**2.3-16** (1983), **2.5-16** (1988), **Evolution I** (1989) et **Evolution II** (1990), 502 exemplaires chacune" },
      ],
    },

    { type: "h2", id: "moteurs", text: "Quel moteur choisir ?" },
    {
      type: "table",
      head: ["Famille", "Versions", "Ce qu'il faut savoir"],
      rows: [
        ["4 cylindres essence (M102)", "190 (90 ch), 190E 1.8, 190E 2.0 (122 ch)", "Les plus courantes et les plus abordables ; chaîne de distribution à surveiller"],
        ["6 cylindres essence (M103)", "190E 2.6 (164 ch, 158 ch catalysé)", "La plus agréable au quotidien, plus chère à l'achat"],
        ["Diesel", "190D 2.0, 2.5, 2.5 Turbo", "Lents mais réputés endurants"],
        ["16 soupapes", "2.3-16 (185 ch), 2.5-16 (environ 200 ch)", "Culasse développée avec Cosworth, valeur de collection"],
      ],
      caption: "Puissances d'après Retro Motor et Wikipédia, selon les marchés et la présence d'un catalyseur.",
    },
    {
      type: "p",
      text: "La **190E 2.0** reste le meilleur compromis entre prix, pièces et agrément. La **2.6** apporte la douceur du six cylindres. Les **diesels** séduisent par leur endurance, mais leur lenteur et les restrictions de circulation dans certaines grandes villes sont à prendre en compte.",
    },

    { type: "h2", id: "seize-soupapes", text: "Les 16 soupapes, des 190 à part" },
    {
      type: "p",
      text: "Présentée au Salon de Francfort en **septembre 1983**, la **2.3-16** reçoit une culasse 16 soupapes conçue avec Cosworth. En mai 1984, à l'inauguration du nouveau Nürburgring, c'est au volant d'une 2.3-16 qu'Ayrton Senna gagne la course de démonstration. Suivent la 2.5-16 (1988) puis les **Evolution I** (1989) et **Evolution II** (1990), produites à **502 exemplaires** chacune pour homologuer la voiture en DTM.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Méfiance envers les fausses 16 soupapes** : kit carrosserie posé sur une 190E 2.0. Vérifie le numéro de série et les caractéristiques de la carte grise avant de discuter du prix.",
    },

    { type: "h2", id: "pannes", text: "Entretien et pannes courantes : symptôme, cause, solution" },
    {
      type: "table",
      head: ["Symptôme", "Cause probable", "Solution et ordre de prix"],
      rows: [
        ["Cliquetis ou bruit de chaîne au démarrage à froid (4 cylindres)", "Chaîne ou tendeur de distribution usé", "Remplacement préventif, peu coûteux selon PassionYoungtimer"],
        ["Ralenti qui oscille, moteur qui cale ou trous à l'accélération", "Injection K-Jetronic ou KE-Jetronic déréglée, durites d'injection", "Diagnostic et réglage, 600 à 2 000 € avec pièces selon ClassicDoctor"],
        ["Température qui monte au-dessus de 100 °C, mayonnaise dans le liquide", "Radiateur, viscocoupleur ou joint de culasse", "Joint de culasse : 1 200 à 2 500 € selon ClassicDoctor"],
        ["Claquements sourds à l'arrière, voiture imprécise à haute vitesse", "Silentblocs de l'essieu multibras usés", "Remplacement complet : 1 000 à 2 500 € selon ClassicDoctor"],
        ["Fuites d'huile sous le moteur", "Joint de carter ou de cache-culbuteurs", "Remplacement des joints, intervention courante"],
        ["Verrouillage centralisé capricieux", "Pompe pneumatique de centralisation", "Réparation ou échange de la pompe"],
        ["À-coups ou patinage de la boîte automatique", "Huile de boîte jamais vidangée", "Vidange de la boîte ; au-delà, diagnostic spécialisé"],
      ],
      caption: "D'après ClassicDoctor et PassionYoungtimer. Pour les procédures, réglages et couples de serrage, la revue technique du modèle reste la référence.",
    },

    { type: "h2", id: "achat", text: "Acheter une 190 : les points à vérifier" },
    {
      type: "callout",
      tone: "info",
      text: "**« Increvable », oui, mais pas sans entretien.** Une 190 négligée pendant quinze ans coûte cher à remettre à niveau. Les factures récentes valent plus qu'un faible kilométrage affiché.",
    },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "Points de levage (cric), bas de caisse et longerons",
        "Fond de coffre sous la moquette, puits de roue de secours et logements de feux arrière",
        "Bords d'ailes avant et bas de portes",
        "Plancher sous la batterie et ancrages du train arrière",
        "Compte 1 500 à 5 000 € pour une vraie réparation de tôlerie, selon ClassicDoctor",
      ],
    },
    { type: "h3", text: "Mécanique" },
    {
      type: "list",
      items: [
        "4 cylindres M102 : bruit de chaîne ou de tendeur au démarrage à froid, remplacement préventif peu coûteux",
        "Fuites d'huile au joint de carter et au cache-culbuteurs, poussoirs hydrauliques qui claquent à froid",
        "Injection K-Jetronic ou KE-Jetronic : ralenti instable ou trous à l'accélération, souvent un réglage à refaire",
        "Refroidissement : l'aiguille ne doit jamais dépasser 100 °C, même au ralenti prolongé ; vérifie radiateur, durites et viscocoupleur",
        "2.6 (M103) : joint de culasse à surveiller",
        "Boîte automatique : vidanges régulières indispensables",
      ],
    },
    { type: "h3", text: "Trains roulants, électricité et intérieur" },
    {
      type: "list",
      items: [
        "Essieu multibras : ses nombreux silentblocs s'usent, d'où des claquements et une conduite imprécise ; 1 000 à 2 500 € pour tout refaire",
        "Jeu dans la direction : un léger jeu se règle, un jeu important coûte cher",
        "Lève-vitres, faisceau du coffre et pompe de verrouillage centralisé pneumatique",
        "Mousse du siège conducteur affaissée, ciel de toit décollé, boiseries fendues",
        "Kilométrage : un compteur à 89 000 km peut en cacher 389 000, recoupe avec les procès-verbaux de contrôle technique et le carnet",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une 190 en 2026 ?" },
    {
      type: "table",
      head: ["État", "4 cylindres et diesel", "190E 2.6", "2.3-16 et 2.5-16", "Source"],
      rows: [
        ["D'usage, saine", "3 500 à 7 000 €", "6 000 à 10 000 €", "30 000 à 45 000 €", "PassionYoungtimer, 2026"],
        ["Bel état, historique suivi", "8 000 à 14 000 €", "11 000 à 18 000 €", "45 000 à 65 000 €", "PassionYoungtimer, 2026"],
        ["Exceptionnelle, faible kilométrage", "16 000 € et plus", "20 000 € et plus", "70 000 € et plus", "PassionYoungtimer, 2026"],
      ],
      caption: "Estimations de marché, pas une cote officielle. ClassicDoctor situe l'Evolution II entre 150 000 et plus de 300 000 €.",
    },
    {
      type: "p",
      text: "Le budget le plus sûr reste une 190E 2.0 phase 2 bien suivie. Suis le marché sur la [fiche 190E (W201)](/modeles/mercedes-benz/190e-w201), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : notre dossier [BMW Série 3 E30](/dossiers/bmw-serie-3-e30-histoire-moteurs-achat), sa grande rivale",
        "Pour les pièces : les liens neufs et occasion de la [fiche 190E (W201)](/modeles/mercedes-benz/190e-w201#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Retro Motor – Mercedes-Benz 190: the story of a modern classic", url: "https://retromotor.co.uk/features/mercedes-benz-190-35-years" },
    { title: "Wikipédia (miroir IPFS) – Mercedes-Benz W201", url: "https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Mercedes-Benz_W201" },
    { title: "ClassicDoctor – Mercedes 190 E W201 : guide d'achat", url: "https://classicdoctor.fr/guide-achat-mercedes-190e-w201/" },
    { title: "PassionYoungtimer – Mercedes 190E W201 : cote et pièges", url: "https://www.passionyoungtimer.fr/fiche-mercedes-190e.html" },
  ],
  models: [{ make: "mercedes-benz", model: "190e-w201", label: "Mercedes-Benz 190E (W201)" }],
};
