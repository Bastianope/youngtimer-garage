import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Automobile Sportive, CarJager, L'argus).
// Marché très étroit : les prix sont des repères tirés d'annonces et d'articles datés.
export const peugeot405T16: Dossier = {
  slug: "peugeot-405-t16-histoire-technique-pannes-achat",
  category: "modele",
  title: "Peugeot 405 T16 : la berline turbo à quatre roues motrices, ses points faibles et comment l'acheter",
  seoTitle: "Peugeot 405 T16 : histoire, overboost, boîte de transfert et prix",
  description:
    "La Peugeot 405 T16 de 1993 à 1995 : 1 046 exemplaires, 2.0 turbo de 200 ch avec overboost à 220 ch, quatre roues motrices, points faibles et prix observés.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Elle porte le nom des 405 T16 victorieuses au Paris-Dakar et à Pikes Peak, mais ressemble presque trait pour trait à une 405 Mi16. Sous le capot, un 2 litres turbo à géométrie variable de 200 ch, et une transmission intégrale permanente. Produite à 1 046 exemplaires, c'est l'une des Peugeot de série les plus rares. Voici son histoire, sa technique et ses points faibles.",
  blocks: [
    { type: "h2", id: "histoire", text: "1992 : une 405 de série à la hauteur de son nom" },
    {
      type: "p",
      text: "Présentée au **Mondial de Paris 1992**, la 405 T16 est livrée à partir d'**avril 1993**. Elle reprend le nom des prototypes de course qui ont gagné **Pikes Peak en 1988 et 1989** et le **Paris-Dakar en 1989 et 1990**. Seuls le logo et les jantes la distinguent vraiment d'une 405 Mi16, selon CarJager. La gendarmerie en aurait commandé une dizaine pour ses brigades d'intervention.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1993 à 1995" },
        { label: "Total", value: "**1 046** exemplaires, dont environ **395** vendus en France et 80 seulement en 1995 (Automobile Sportive)" },
        { label: "Prix neuf", value: "217 000 francs en 1994" },
        { label: "Puissance fiscale", value: "9 CV" },
      ],
    },

    { type: "h2", id: "technique", text: "La technique" },
    {
      type: "table",
      head: ["Élément", "Caractéristique"],
      rows: [
        ["Moteur", "2.0 turbo XU10J4TEZ, 200 ch à 5 000 tr/min, 288 Nm à 2 600 tr/min"],
        ["Turbo", "Garrett VAT25 à géométrie variable"],
        ["Overboost", "220 ch et 318 Nm pendant 45 secondes"],
        ["Transmission", "Intégrale permanente, répartition 53/47, viscocoupleur Ferguson et Torsen arrière ; boîte 5 vitesses issue de la 605 V6"],
        ["Suspension arrière", "Correction d'assiette électrohydraulique d'origine Citroën"],
        ["Freins", "Disques ventilés de 283 mm à l'avant, pleins de 250 mm à l'arrière"],
        ["Poids", "1 340 kg"],
        ["Performances", "235 km/h, 0 à 100 km/h en 7 s, 1 000 m départ arrêté en 28 s"],
      ],
      caption: "Données Automobile Sportive.",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "callout",
      tone: "warning",
      text: "**La boîte de transfert est le point faible connu**, insuffisamment renforcée d'origine, surtout en conduite sportive. Des renforts existent. Peugeot ne fournit plus les pièces spécifiques, et beaucoup ne sont plus fabriquées : selon Automobile Sportive, le moteur seul peut coûter presque autant qu'un bel exemplaire.",
    },
    {
      type: "table",
      head: ["Intervention ou symptôme", "Cause ou intervalle", "Solution"],
      rows: [
        ["Distribution", "Tous les 5 ans ou 60 000 km", "À faire d'office sans facture récente"],
        ["Turbo et collecteur d'échappement", "Généralement à refaire vers 150 000 km", "Réfection du turbo VAT25 et du collecteur"],
        ["Bruits ou à-coups de transmission en virage", "Boîte de transfert fatiguée", "Remplacement ou renfort par un spécialiste"],
        ["Usure prématurée", "Différentiel central", "Contrôle par un spécialiste avant achat"],
        ["Moteur qui manque de pêche ou à-coups", "Turbo à géométrie variable qui fonctionne mal", "Diagnostic du pilotage du turbo"],
        ["Arrière qui s'affaisse à l'arrêt", "Correction d'assiette électrohydraulique", "Contrôle des sphères et du circuit"],
      ],
      caption: "D'après Automobile Sportive et L'argus. Le moteur est réputé très endurant ; ses poussoirs hydrauliques ne demandent pas de réglage.",
    },

    { type: "h2", id: "achat", text: "Acheter une 405 T16 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Factures de la boîte de transfert, de l'embrayage et du turbo** : les trois postes les plus lourds",
        "**Authenticité** : une Mi16 ou Mi16x4 maquillée en T16 est possible ; vérifie carte grise, numéro de série et moteur",
        "**Overboost** : il doit se déclencher franchement à pleine charge",
        "**Correction d'assiette** : la voiture doit garder sa hauteur à l'arrière",
        "**Spécialistes** : rapproche-toi d'un spécialiste ou d'un club 405 avant l'achat, les pièces se trouvent par réseau",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une 405 T16 ?" },
    {
      type: "table",
      head: ["Repère", "Prix", "Source"],
      rows: [
        ["Exemplaire courant, estimation", "environ 38 000 €", "Estimation Youngtimers citée par L'argus, juillet 2024"],
        ["Une des premières livrées, 95 000 km, transfert et boîte refaits", "43 000 € demandés", "L'argus, juillet 2024"],
        ["Cote en 2012, pour comparaison", "environ 8 000 €", "Automobile Sportive"],
      ],
      caption: "Peu de ventes par an : chaque voiture se juge à son historique. La cote a fortement progressé en dix ans.",
    },
    {
      type: "p",
      text: "Suis les annonces sur la [fiche 405](/modeles/peugeot/405) et active l'alerte pour être prévenu.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : [Peugeot 205 GTI](/dossiers/peugeot-205-gti-histoire-1-6-1-9-achat), l'autre sportive Peugeot des années 80",
        "Pour les pièces : les liens neufs et occasion de la [fiche 405](/modeles/peugeot/405#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Automobile Sportive – Peugeot 405 T16 (1993-1995)", url: "https://www.automobile-sportive.com/guide/peugeot/405t16.php" },
    { title: "CarJager – Peugeot 405 T16 : la performance sous une robe discrète", url: "https://www.carjager.com/blog/article/peugeot-405-t16-la-performance-sous-une-robe-discrete.html" },
    { title: "L'argus – Peugeot 405 T16, un des premiers exemplaires à vendre (juillet 2024)", url: "https://www.largus.fr/actualite-automobile/peugeot-405-t16-un-des-premiers-exemplaires-de-la-berline-sportive-a-vendre-30034940.html" },
  ],
  models: [{ make: "peugeot", model: "405", label: "Peugeot 405" }],
};
