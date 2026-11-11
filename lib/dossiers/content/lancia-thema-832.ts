import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Automobile Sportive, Caradisiac avril 2025).
// Les prix sont des estimations de marché, pas une cote officielle.
export const lanciaThema832: Dossier = {
  slug: "lancia-thema-8-32-v8-ferrari-entretien-achat",
  category: "modele",
  title: "Lancia Thema 8.32 : la berline au V8 Ferrari, son entretien et comment bien l'acheter",
  seoTitle: "Lancia Thema 8.32 : V8 Ferrari, courroies, pannes et prix",
  description:
    "La Lancia Thema 8.32 de 1986 à 1992 : V8 Ferrari de 215 ch, série 1 et série 2, courroies tous les 40 000 km, pannes courantes, rouille et prix observés.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Une berline familiale sobre, avec un aileron qui sort d'un bouton et, sous le capot, un V8 dérivé de la Ferrari 308 : la Thema 8.32 est l'une des voitures les plus étonnantes des années 80. Produite à moins de 4 000 exemplaires, elle reste bien moins chère qu'une Ferrari, mais son entretien n'a rien d'une Lancia ordinaire. Voici ce qu'il faut savoir.",
  blocks: [
    { type: "h2", id: "histoire", text: "1986 : un cœur de Ferrari dans une Lancia" },
    {
      type: "p",
      text: "La Thema est lancée en 1984. Sa version **8.32**, pour 8 cylindres et 32 soupapes, est présentée au **Salon de Turin 1986**. Son **V8 à 90° de 2 927 cm³** dérive de celui de la Ferrari 308 Quattrovalvole, retravaillé par Lancia pour offrir plus de couple à bas régime. Intérieur en cuir Poltrona Frau et ronce de noyer en option, **aileron arrière rétractable** commandé depuis l'habitacle : elle est vendue **322 000 francs** en 1988.",
    },
    {
      type: "p",
      text: "Une **série 2** apparaît en **1990**, avec une calandre, des optiques et des rétroviseurs revus, et un catalyseur qui fait passer la puissance de 215 à 205 ch. La production s'arrête en **1992**.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1986 à 1992" },
        { label: "Total", value: "**3 971** exemplaires : 2 370 en série 1 et 1 601 en série 2 (Caradisiac)" },
        { label: "En France", value: "Environ **200** exemplaires vendus" },
        { label: "Moteur", value: "V8 Ferrari 2,9 l 32 soupapes, injection Bosch KE3-Jetronic, boîte manuelle 5 vitesses" },
      ],
    },

    { type: "h2", id: "versions", text: "Série 1 ou série 2 ?" },
    {
      type: "table",
      head: ["", "Série 1 (1986-1990)", "Série 2 (1990-1992)"],
      rows: [
        ["Puissance", "215 ch", "205 ch (catalysée)"],
        ["Couple", "285 Nm à 4 500 tr/min", "263 Nm à 5 000 tr/min"],
        ["0 à 100 km/h", "6,8 s", "7,2 s"],
        ["Vitesse maxi", "240 km/h", "235 km/h"],
        ["Équipement", "-", "Amortissement piloté Boge proposé"],
      ],
      caption: "Données Automobile Sportive. Poids annoncé : 1 405 kg. Puissance fiscale : 17 CV.",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "callout",
      tone: "warning",
      text: "**Les courroies de distribution se changent au moins tous les 40 000 km**, et l'opération demande généralement d'abaisser ou de déposer le moteur (Caradisiac). Sans facture récente, prévois-la dans le budget d'achat. Les pièces de distribution et la pompe à eau de qualité sont difficiles à trouver ; le club Lancia italien propose des pièces reconditionnées.",
    },
    {
      type: "table",
      head: ["Symptôme ou point", "Cause probable", "Solution"],
      rows: [
        ["Odeur d'essence, fuites", "Circuit d'alimentation qui a souffert d'une longue immobilisation", "Remplacement des durites et joints du circuit"],
        ["Contacts électriques intermittents", "Connexions fatiguées", "Fréquent mais rarement grave ; nettoyage et reprise des contacts"],
        ["Aileron qui ne sort plus", "Mécanisme de levage", "Contrôle et réparation du mécanisme"],
        ["Tableau de bord qui se rétracte et se décolle", "Vieillissement du revêtement", "Réfection de la planche, coûteuse"],
        ["Suspension qui talonne (série 2)", "Amortisseurs pilotés fatigués", "Pièces difficiles à trouver, à chercher via le club"],
        ["Ralenti instable", "Injection KE3-Jetronic déréglée", "Réglage par un spécialiste"],
      ],
      caption: "D'après Caradisiac et Automobile Sportive. Le moteur est réputé très solide, mais l'échappement, l'embrayage et la boîte coûtent cher.",
    },

    { type: "h2", id: "achat", text: "Acheter une Thema 8.32 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Factures de courroies** : le premier document à demander",
        "**Rouille** : bas de la lunette arrière, bas de caisse, passages de roues",
        "**Équipements électriques** : aileron, appuie-tête arrière, voyants du tableau de bord",
        "**Cuir et tableau de bord** : le cuir Poltrona Frau vieillit mal autour de la planche",
        "**Authenticité** : le moteur doit être le V8 d'origine, numéro concordant avec les papiers",
        "Vérifie qu'il ne s'agit pas d'une Thema V6 ou turbo maquillée : badges et jantes se remplacent facilement",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une Thema 8.32 ?" },
    {
      type: "table",
      head: ["État", "Prix observés", "Source"],
      rows: [
        ["Bon à excellent état", "15 000 à 30 000 €", "Caradisiac, avril 2025"],
        ["Exemplaire parfait", "au-delà de 30 000 €", "Caradisiac, avril 2025"],
      ],
      caption: "Estimations de marché, pas une cote officielle. Automobile Sportive citait 5 000 à 15 000 € quelques années plus tôt : la cote progresse.",
    },
    {
      type: "p",
      text: "Une 8.32 à prix bas sans factures de distribution coûte souvent plus cher au final qu'une voiture suivie. Suis le marché sur la [fiche Thema](/modeles/lancia/thema), avec l'alerte pour être prévenu.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : [Lancia Delta HF Integrale](/modeles/lancia/delta-hf-integrale), l'autre Lancia culte de l'époque",
        "Note les courroies et l'entretien dans [Mon Garage](/garage) : le carnet te prévient avant l'échéance",
      ],
    },
  ],
  sources: [
    { title: "Automobile Sportive – Lancia Thema 8.32 (1986-1992)", url: "https://www.automobile-sportive.com/guide/lancia/thema832.php" },
    { title: "Caradisiac – Lancia Thema 8.32, le mythe Ferrari à portée de main (avril 2025)", url: "https://www.caradisiac.com/lancia-thema-8-32-le-mythe-ferrari-a-portee-de-main-215068.htm" },
  ],
  models: [{ make: "lancia", model: "thema", label: "Lancia Thema" }],
};
