import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Automobile Sportive, Essais Autos, CarJager).
// Les volumes de production d'une petite marque artisanale varient selon les sources : on cite chaque chiffre.
// Les prix sont rares et peu datés : simples repères.
export const venturi: Dossier = {
  slug: "venturi-coupe-260-atlantique-histoire-achat",
  category: "modele",
  title: "Venturi : l'histoire de la GT française, du coupé 200 à l'Atlantique 300, et comment en acheter une",
  seoTitle: "Venturi 260 et Atlantique : histoire, modèles, entretien et prix",
  description:
    "Venturi, la GT française de 1984 à 2000 : coupés 200 et 260, Transcup, 400 GT, Atlantique 300, moteur V6 PRV, points à vérifier et repères de prix.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Deux anciens d'Heuliez qui veulent construire la GT française capable de rivaliser avec Porsche : c'est l'histoire de Venturi. Produites à quelques centaines d'exemplaires dans les Pays de la Loire, ses voitures sont parmi les youngtimers français les plus rares. Voici l'histoire de la marque, ses modèles et ce qu'il faut savoir avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1984 : la naissance de MVS" },
    {
      type: "p",
      text: "**Gérard Godefroy** (style) et **Claude Poiraud** (technique), tous deux anciens d'Heuliez, présentent leur projet « Ventury » au **Salon de Paris en octobre 1984**. La Manufacture de Voitures de Sport (**MVS**) est fondée pour le produire. La première voiture est livrée en **mai 1987**, à Raymond Gouloumès, alors président de l'Automobile Club de l'Ouest.",
    },
    {
      type: "p",
      text: "Le prototype utilisait un 4 cylindres turbo de Peugeot 505. La série reçoit le **V6 PRV turbo de l'Alpine GTA**, garanti par Renault. Produite d'abord à **Cholet**, la marque s'installe en **1991 à Couëron**, près de Nantes, dans une usine de 500 voitures par an. Elle s'engage même en Formule 1 en 1992, avant de traverser plusieurs changements d'actionnaires dans les années 1990.",
    },
    {
      type: "facts",
      rows: [
        { label: "Période", value: "1987 à la fin des années 1990 pour les GT de série" },
        { label: "Usines", value: "Cholet, puis Couëron (Loire-Atlantique) à partir de 1991" },
        { label: "Moteur", value: "V6 PRV turbo, d'origine Renault" },
        { label: "Production", value: "Quelques centaines d'exemplaires au total ; **592** coupés 200, 260 et Transcup selon Essais Autos" },
      ],
    },

    { type: "h2", id: "modeles", text: "Les modèles" },
    {
      type: "table",
      head: ["Modèle", "Années", "Moteur et puissance", "À savoir"],
      rows: [
        ["Coupé 200 (« 210 »)", "1987 et après", "V6 PRV 2,5 l turbo, 200 ch", "Le modèle de base, châssis très réussi"],
        ["Transcup", "Présenté en 1988", "V6 PRV turbo", "Cabriolet à toit amovible, très rare"],
        ["260 (APC)", "1990 et après", "V6 PRV 2,85 l turbo, 260 ch", "Plus radical ; version catalysée présentée à Genève en 1990"],
        ["260 Atlantique", "1991", "V6 PRV 2,85 l turbo, 260 ch", "Série allégée de 25 exemplaires"],
        ["400 GT", "1994 (route)", "V6 PRV biturbo, environ 400 ch", "Dérivée de la 400 Trophy de course ; freins carbone ; 13 exemplaires selon Essais Autos"],
        ["Atlantique 300", "Présentée en 1995", "V6 PRV 3,0 l : 210 ch atmosphérique, 281 ch turbo, 310 ch biturbo", "Dernière GT de la marque, une soixantaine d'exemplaires selon Essais Autos"],
      ],
      caption: "D'après Automobile Sportive, Essais Autos et CarJager. Les chiffres de poids de la 260 Atlantique varient selon les sources (105 à 165 kg de moins que la 260 de série).",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "p",
      text: "La bonne nouvelle : la **mécanique vient de la grande série**. Le V6 PRV est réputé fiable et endurant, et une bonne partie des pièces mécaniques se trouve facilement. La mauvaise : la **carrosserie et les pièces spécifiques** sont rares. Selon Essais Autos, une grande partie du stock et les moules de carrosserie ont été rachetés par la société Extrême Limite.",
    },
    {
      type: "table",
      head: ["Point", "Ce qu'il faut savoir", "Conseil"],
      rows: [
        ["V6 PRV", "Fiable, mais difficile d'accès en position centrale arrière", "Entretien par un spécialiste habitué au PRV ; voir aussi notre dossier Alpine GTA pour les pannes typiques du V6"],
        ["Turbo", "Temps de réponse marqué, surtout sur l'Atlantique 300 mono-turbo", "Écoute les sifflements, cherche la fumée bleue"],
        ["Géométrie (Atlantique 300)", "Tendance à se dérégler rapidement", "Contrôle de la géométrie et des silentblocs"],
        ["Carrosserie", "Panneaux spécifiques, introuvables neufs", "Méfiance envers les réparations après choc"],
        ["Usage circuit", "Beaucoup ont roulé sur piste", "Historique et inspection sur pont indispensables, surtout pour une 400 GT"],
      ],
      caption: "D'après Essais Autos. Le refroidissement du V6 PRV, sensible sur l'Alpine GTA, mérite aussi une vérification attentive.",
    },

    { type: "h2", id: "achat", text: "Acheter une Venturi : les conseils" },
    {
      type: "list",
      items: [
        "**Passe par la communauté** : le club [Communauté Venturi](https://www.communaute-venturi.fr/) connaît l'historique de nombreux exemplaires",
        "**Numéro de série et papiers** : sur des séries de 25 exemplaires, l'authenticité fait toute la valeur",
        "**Carrosserie** : les pièces spécifiques coûtent cher et se trouvent mal, un choc mal réparé pèse lourd",
        "**Factures** de turbo, de refroidissement et de géométrie",
        "**Essai** : montée en température, comportement du turbo, freinage et tenue de cap",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une Venturi ?" },
    {
      type: "table",
      head: ["Modèle", "Repère de prix", "Source"],
      rows: [
        ["Coupé 200", "environ 30 000 €", "Essais Autos (2022)"],
        ["260 APC", "environ 37 000 €, estimation jugée sous-évaluée", "CarJager, citant La Vie de l'Auto"],
        ["260 Atlantique", "55 000 à 65 000 € demandés", "CarJager"],
        ["260 LM bien entretenue", "plus de 60 000 €", "Essais Autos (2022)"],
        ["Transcup", "environ 70 000 €", "Essais Autos (2022)"],
        ["400 GT", "plus de 150 000 €, transactions très rares", "Essais Autos (2022)"],
      ],
      caption: "Repères anciens ou non datés, sur un marché de quelques ventes par an. Chaque voiture se négocie au cas par cas.",
    },
    {
      type: "p",
      text: "Suis le marché sur les fiches [Venturi 260](/modeles/venturi/260) et [Venturi Atlantique](/modeles/venturi/atlantique), avec l'alerte pour être prévenu d'une nouvelle annonce.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Communauté Venturi](https://www.communaute-venturi.fr/) : le club français de la marque",
        "À lire aussi : [Alpine GTA et A610](/dossiers/alpine-gta-a610-histoire-v6-turbo-achat), qui partagent le V6 PRV turbo",
      ],
    },
  ],
  sources: [
    { title: "Automobile Sportive – Historique Venturi", url: "https://www.automobile-sportive.com/guide/venturi/historiqueventuri.php" },
    { title: "Essais Autos – Guide d'achat : quelle Venturi choisir ? (2022)", url: "https://www.essais-autos.com/2022/06/guide-d-achat-quelle-venturi-choisir.html" },
    { title: "CarJager – Venturi 260 Atlantique : tout pour le sport", url: "https://www.carjager.com/blog/article/venturi-260-atlantique-tout-pour-le-sport.html" },
  ],
  models: [
    { make: "venturi", model: "260", label: "Venturi 260" },
    { make: "venturi", model: "atlantique", label: "Venturi Atlantique" },
  ],
};
