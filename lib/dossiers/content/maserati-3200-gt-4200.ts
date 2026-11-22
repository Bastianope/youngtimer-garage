import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 22/11/2026 (Wikipedia, Classics World, Hagerty UK, Motor1 France).
// Prix Motor1 de 2019 pour la 3200 GT, Hagerty UK pour la 4200 : ordres de grandeur, pas une cote.
export const maserati3200Gt4200: Dossier = {
  slug: "maserati-3200-gt-coupe-spyder-4200-achat",
  category: "modele",
  title: "Maserati 3200 GT et Coupé/Spyder 4200 : le grand tourisme italien à prix de youngtimer",
  seoTitle: "Maserati 3200 GT et 4200 : histoire, points faibles et achat",
  description:
    "Maserati 3200 GT (1998-2002) et Coupé, Spyder et GranSport 4200 (2001-2007) : V8 biturbo ou atmosphérique, boîte Cambiocorsa, points à vérifier et prix.",
  publishedAt: "2026-11-22",
  updatedAt: "2026-11-22",
  intro:
    "Un V8 italien, une ligne signée Giugiaro et des feux arrière en boomerang : la 3200 GT a relancé Maserati à la fin des années 1990, et ses héritières 4200 ont démocratisé le V8 atmosphérique conçu avec Ferrari. Leur cote reste raisonnable, à condition de bien choisir.",
  blocks: [
    { type: "h2", id: "histoire", text: "1998 : la renaissance sous l'ère Fiat-Ferrari" },
    {
      type: "p",
      text: "Rachetée par Fiat en 1993, Maserati passe sous la coupe de Ferrari en 1997. Premier fruit de ce rapprochement, la **3200 GT** est présentée au **Mondial de Paris en octobre 1998**. Giorgetto Giugiaro (Italdesign) dessine la carrosserie, Enrico Fumia l'intérieur. Ses **feux arrière en boomerang à LED** deviennent sa signature.",
    },
    {
      type: "p",
      text: "Sous le capot, le **V8 3,2 litres biturbo** hérité du Shamal développe **370 ch**. Maserati en produit **4 795** jusqu'en 2002 : 2 689 en boîte manuelle six rapports, 2 106 en automatique quatre rapports (GTA).",
    },
    {
      type: "p",
      text: "Le **Spyder** (2001) puis le **Coupé** (2002), dits 4200, reprennent la silhouette avec des feux arrière classiques et un **V8 4,2 litres atmosphérique F136 de 390 ch**, développé avec Ferrari. La boîte est manuelle ou **Cambiocorsa**, une robotisée à palettes. La **GranSport** (2004) monte à 400 ch avec la suspension pilotée Skyhook de série.",
    },
    {
      type: "table",
      head: ["Modèle", "Années", "Moteur", "Production"],
      rows: [
        ["3200 GT", "1998-2002", "V8 3,2 biturbo, 370 ch", "4 795"],
        ["Spyder 4200", "2001-2007", "V8 4,2 atmosphérique, 390 ch", "3 889"],
        ["Coupé 4200", "2002-2007", "V8 4,2 atmosphérique, 390 ch", "6 449"],
        ["GranSport", "2004-2007", "V8 4,2, 400 ch", "2 613 coupés et 472 Spyder"],
      ],
      caption: "Source : Wikipedia (articles Maserati 3200 GT et Maserati Coupé).",
    },

    { type: "h2", id: "3200-gt", text: "3200 GT : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Jeu axial du vilebrequin** : s'il apparaît, c'est souvent une réfection moteur.",
        "**Boîtier papillon** électronique, consommation d'huile, fuites d'huile et de liquide de refroidissement.",
        "**Courroie de distribution** tous les 3 ans ou 50 000 km, à vérifier sur factures.",
        "**Triangles inférieurs avant** fissurés, et le rappel sur le berceau de direction.",
        "**Feux arrière LED** avec des segments éteints : plus de 1 000 € le feu.",
        "**Amortisseurs** d'origine introuvables neufs : il faut passer par des adaptations.",
      ],
    },

    { type: "h2", id: "4200", text: "Coupé et Spyder 4200 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Embrayage Cambiocorsa** : il s'use vite en ville. Demandez le pourcentage d'usure relevé à la valise.",
        "Distribution par chaîne, plus robuste, mais **fuites aux couvre-culasses** fréquentes.",
        "**Berceau avant** qui peut rouiller de l'intérieur, et le rappel sur les vis de crémaillère.",
        "**Amortisseurs Skyhook** introuvables neufs.",
        "**Clé maîtresse rouge** : indispensable pour programmer de nouvelles clés.",
        "Spyder : étanchéité et fonctionnement de la capote. Électronique capricieuse sur les premiers millésimes (2002-2004).",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Une boîte manuelle est rare sur la 4200** : la plupart des voitures sont en Cambiocorsa. Une manuelle avec un historique complet se paie plus cher, et c'est justifié.",
    },

    { type: "h2", id: "prix", text: "Quel budget ?" },
    {
      type: "p",
      text: "En 2019, Motor1 France situait une 3200 GT à restaurer entre **8 500 et 10 000 €**, en bon état entre **10 000 et 13 200 €**, et autour de **30 000 €** pour un exemplaire de concours. Pour la 4200, Hagerty UK donne environ **6 000 à 8 000 £** pour une voiture correcte, **10 000 à 15 000 £** en bon état et **20 000 à 30 000 £** pour une GranSport. Comparez avec les annonces de la [fiche 3200 GT](/modeles/maserati/3200-gt#annonces) et de la [fiche Coupé 4200](/modeles/maserati/coupe-4200#annonces).",
    },
    {
      type: "p",
      text: "Pour une Maserati plus ancienne, lisez aussi notre dossier sur la [Maserati Biturbo](/dossiers/maserati-biturbo-histoire-famille-achat).",
    },
  ],
  sources: [
    { title: "Wikipedia — Maserati 3200 GT", url: "https://en.wikipedia.org/wiki/Maserati_3200_GT" },
    { title: "Wikipedia — Maserati Coupé", url: "https://en.wikipedia.org/wiki/Maserati_Coup%C3%A9" },
    { title: "Classics World — Maserati 3200GT and 4200GT buyer's guide", url: "https://classicsworld.co.uk/guides/maserati-3200gt-4200gt-buyers-guide/" },
    { title: "Hagerty UK — The Maserati 4200, 25 years on", url: "https://www.hagerty.co.uk/articles/the-maserati-4200-25-years-on/" },
    { title: "Motor1 — Guide d'achat Maserati 3200 GT", url: "https://fr.motor1.com/features/345386/guide-achat-maserati-3200-gt-1998-2002/" },
  ],
  models: [
    { make: "maserati", model: "3200-gt", label: "Maserati 3200 GT" },
    { make: "maserati", model: "coupe-4200", label: "Maserati Coupé 4200" },
    { make: "maserati", model: "spyder-4200", label: "Maserati Spyder 4200" },
    { make: "maserati", model: "gransport", label: "Maserati GranSport" },
  ],
};
