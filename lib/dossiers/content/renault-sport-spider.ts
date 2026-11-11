import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Renault The Originals, Automobile Sportive, annonces L'argus et LeParking).
// Les prix sont des prix demandés relevés dans les annonces, pas une cote officielle.
export const renaultSportSpider: Dossier = {
  slug: "renault-sport-spider-histoire-pare-brise-achat",
  category: "modele",
  title: "Renault Sport Spider : l'histoire, saute-vent ou pare-brise, et comment bien l'acheter",
  seoTitle: "Renault Sport Spider : histoire, saute-vent, pare-brise et prix",
  description:
    "Le Renault Sport Spider de 1996 à 1999 : 1 726 exemplaires, châssis aluminium, 2.0 de 150 ch, saute-vent ou pare-brise, Trophy, points à vérifier et prix en 2026.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Pas de toit, pas d'ABS, pas de direction assistée, et sur les premiers exemplaires, pas même de pare-brise : le Renault Sport Spider est la voiture la plus radicale jamais vendue par Renault. Produit à 1 726 exemplaires à Dieppe, il est devenu un objet de collection. Voici son histoire, ses deux versions et ce qu'il faut vérifier avant d'en acheter un.",
  blocks: [
    { type: "h2", id: "histoire", text: "1995 : une barquette pour relancer Renault Sport" },
    {
      type: "p",
      text: "Dévoilé au **Salon de Genève 1995**, le Spider est assemblé dans l'ancienne usine **Alpine de Dieppe**, de **1996 à 1999**. Son **châssis en aluminium soudé** porte une carrosserie composite et, en position centrale arrière, le **2 litres 16 soupapes F7R de 150 ch**, le moteur de la Clio Williams. Il est lancé à **199 500 francs**.",
    },
    {
      type: "p",
      text: "Les premiers Spider n'ont qu'un **saute-vent**, un déflecteur qui envoie l'air au-dessus de la tête : casque conseillé. Une version **pare-brise**, avec essuie-glace et capote d'appoint, suit pour élargir la clientèle. Le Spider sert aussi de base à une coupe monomarque, le **Spider Trophy**, disputée en lever de rideau de Grands Prix de Formule 1.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1996 à 1999, à Dieppe" },
        { label: "Total", value: "**1 726** exemplaires, dont environ 80 à 90 Trophy de course selon les sources" },
        { label: "Moteur", value: "F7R 2.0 16 soupapes, 150 ch à 6 000 tr/min, 185 Nm à 4 500 tr/min" },
        { label: "En France", value: "Environ **500** exemplaires vendus selon Automobile Sportive" },
      ],
    },

    { type: "h2", id: "versions", text: "Saute-vent ou pare-brise ?" },
    {
      type: "table",
      head: ["", "Saute-vent", "Pare-brise"],
      rows: [
        ["Poids constructeur", "930 kg", "965 kg"],
        ["0 à 100 km/h", "6,9 s", "7,2 s"],
        ["Vitesse maxi", "213 km/h", "204 km/h"],
        ["Protection", "Aucune : casque ou lunettes conseillés", "Pare-brise, essuie-glace, capote d'appoint limitée à environ 90 km/h"],
        ["Rareté", "Environ un quart de la production", "La majorité des exemplaires"],
      ],
      caption: "Données Automobile Sportive. Renault annonçait moins de 790 kg dans ses premières brochures, avant que le poids réel ne soit connu.",
    },
    {
      type: "p",
      text: "Le **saute-vent** est la version la plus pure et la plus rare, recherchée par les collectionneurs. Le **pare-brise** se vit plus facilement sur route. Dans les deux cas, le confort reste rudimentaire : pas de chauffage réglable, réglage de dossier peu pratique.",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "p",
      text: "Mécaniquement, le Spider est simple : son moteur et une partie de ses pièces sont partagés avec la Clio Williams, la Mégane Coupé 16V et la Renault 11. La difficulté vient des **pièces spécifiques** (carrosserie, châssis, accastillage) : selon Automobile Sportive, Alpine a cédé le stock et les moules restants en Allemagne.",
    },
    {
      type: "table",
      head: ["Point", "Ce qu'il faut savoir", "Conseil"],
      rows: [
        ["Moteur F7R", "Robuste s'il est entretenu", "Distribution et pompe à eau selon les préconisations, comme sur la Clio Williams ; consommation d'huile à surveiller"],
        ["Freinage", "Pas d'ABS", "Pneus et disques en bon état indispensables"],
        ["Châssis aluminium", "Ne rouille pas, mais se déforme en cas de choc", "Contrôle de la géométrie et des points d'ancrage après tout accident"],
        ["Carrosserie composite", "Panneaux spécifiques difficiles à trouver", "Méfiance envers les réparations de fortune après une sortie de route"],
        ["Capote (pare-brise)", "Qualité médiocre d'origine", "Vérifie l'état et la présence de toutes les pièces"],
        ["Différentiel", "Pas d'autobloquant", "Motricité limitée en sortie de virage serré, c'est d'origine"],
      ],
      caption: "D'après Automobile Sportive. Pour les intervalles et procédures du moteur F7R, voir aussi notre [dossier Clio Williams](/dossiers/renault-clio-williams-histoire-series-authenticite-achat).",
    },

    { type: "h2", id: "achat", text: "Acheter un Spider : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Historique d'accidents** : le Spider se conduit sur circuit, une sortie de route abîme châssis et carrosserie",
        "**Numéro de série et papiers** : un ancien Trophy ou une version modifiée doit être déclaré comme tel",
        "**Pièces présentes** : saute-vent ou pare-brise, capote, couvre-tonneau, protections ; les pièces manquantes sont rares",
        "**Kilométrage** : la plupart roulent peu ; un très faible kilométrage doit être cohérent avec les factures",
        "**Essai** : boîte, embrayage et freins ; la voiture doit freiner droit sans ABS",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte un Spider en 2026 ?" },
    {
      type: "table",
      head: ["Relevé", "Prix demandés", "Source"],
      rows: [
        ["13 annonces en France", "40 990 à 69 000 €, médiane 45 900 €", "L'argus Occasion, novembre 2026"],
        ["24 annonces en Europe", "39 950 à 69 000 €, la plupart entre 40 000 et 50 000 €", "LeParking, novembre 2026"],
        ["Saute-vent faible kilométrage", "environ 49 500 à 60 000 €", "L'argus Occasion, novembre 2026"],
      ],
      caption: "Prix demandés, pas des prix de vente. Les annonces les plus chères correspondent à des voitures quasi neuves.",
    },
    {
      type: "p",
      text: "Avec moins de 2 000 exemplaires produits, chaque Spider se juge à son historique. Suis le marché sur la [fiche Spider](/modeles/renault/spider), avec les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Renault The Originals – Spider](https://theoriginals.renault.com/en/spider) : la page officielle de Renault",
        "À lire aussi : [Alpine GTA et A610](/dossiers/alpine-gta-a610-histoire-v6-turbo-achat), les dernières Alpine assemblées à Dieppe avant le Spider",
        "Pour les pièces : les liens neufs et occasion de la [fiche Spider](/modeles/renault/spider#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Renault The Originals – Renault Sport Spider", url: "https://theoriginals.renault.com/en/spider" },
    { title: "Automobile Sportive – Renault Spider (1995-1999)", url: "https://www.automobile-sportive.com/guide/renault/spider.php" },
    { title: "L'argus Occasion – Renault Spider d'occasion", url: "https://occasion.largus.fr/auto/renault/spider/" },
    { title: "LeParking – Renault Spider d'occasion", url: "https://www.leparking.fr/voiture-occasion/renault-spider.html" },
  ],
  models: [{ make: "renault", model: "spider", label: "Renault Spider" }],
};
