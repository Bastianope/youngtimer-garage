import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Retro Motor, Wikipédia, ClassicDoctor, avis Automobile Sportive).
// Les prix sont des estimations de marché, pas une cote officielle.
export const bmwE31: Dossier = {
  slug: "bmw-serie-8-e31-v12-v8-entretien-pannes-achat",
  category: "modele",
  title: "BMW Série 8 (E31) : l'histoire du grand coupé V12, son entretien et comment bien l'acheter",
  seoTitle: "BMW Série 8 E31 : 850i, 840Ci, 850CSi, pannes, entretien et prix",
  description:
    "La BMW Série 8 E31 de 1989 à 1999 : 850i V12, 840Ci V8, 850Ci et 850CSi, entretien du V12, pannes courantes avec ordres de prix et cote 2026 par version.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Phares escamotables, pas de montant central, V12 sous un capot interminable : la Série 8 est la plus spectaculaire des BMW des années 90. Moins de 31 000 exemplaires en dix ans, et une électronique en avance sur son temps, qui fait aujourd'hui toute la difficulté de son entretien. Voici son histoire, ses versions et ce qu'il faut vérifier avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1989 : la BMW la plus ambitieuse" },
    {
      type: "p",
      text: "Présentée au **Salon de Francfort 1989**, la 850i reçoit **5 000 commandes en huit jours**. Elle introduit chez BMW un **accélérateur électronique**, l'un des premiers sur une voiture de série, et un **essieu arrière multibras**. Une boîte manuelle 6 vitesses est spécialement développée pour elle. Mais elle arrive au début d'une crise économique, et ses ventes déçoivent face aux prévisions de 10 000 à 12 000 voitures par an.",
    },
    {
      type: "p",
      text: "La gamme s'élargit avec la **850CSi** de 381 ch (1992) et la **840Ci V8** (1993), tandis que la **850Ci** reçoit en 1994 un V12 porté à 5,4 litres. Un prototype **M8** de 1991, jamais commercialisé, a servi de base au V12 de la McLaren F1. La production s'arrête en **1999**.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1989 à 1999" },
        { label: "Total", value: "**30 621** exemplaires (Retro Motor)" },
        { label: "Carrosserie", value: "Coupé 2+2 sans montant central, phares escamotables" },
        { label: "Boîtes", value: "Manuelle 6 vitesses ou automatique ; selon Retro Motor, seule une Série 8 sur six a été vendue en manuelle" },
      ],
    },

    { type: "h2", id: "versions", text: "Quelle version choisir ?" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Années", "Exemplaires"],
      rows: [
        ["850i", "V12 M70 5,0 l", "300 ch", "1990-1994", "20 072"],
        ["840Ci", "V8 M60 4,0 l", "286 ch", "1992-1996", "4 728"],
        ["840Ci", "V8 M62 4,4 l", "286 ch", "1995-1999", "3 075"],
        ["850Ci", "V12 M73 5,4 l", "326 ch", "1992-1999", "1 218"],
        ["850CSi", "V12 S70 5,6 l", "381 ch", "1992-1996", "1 510"],
      ],
      caption: "D'après Wikipédia. Les années varient selon le marché et la date de commercialisation. Retro Motor donne 1 150 exemplaires pour la 850CSi, toutes en boîte manuelle et avec quatre roues directrices en Europe.",
    },
    {
      type: "p",
      text: "La **850i** est la plus répandue et la porte d'entrée vers le V12. La **840Ci** est plus simple à entretenir, avec un V8 moins gourmand. La **850CSi** est la version collector, et sa cote n'a plus rien à voir avec celle des autres.",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "callout",
      tone: "warning",
      text: "**Le V12 est en réalité deux six-cylindres**, chacun avec son circuit d'injection et sa gestion. C'est ce qui rend son entretien exigeant : chaque défaut se double. Selon ClassicDoctor, une réfection de distribution ou un calculateur à remplacer peut **dépasser 5 000 €**.",
    },
    {
      type: "table",
      head: ["Symptôme ou point", "Cause probable", "Solution et ordre de prix"],
      rows: [
        ["Ralenti instable à froid, moteur qui « boite »", "Une rangée du V12 qui fonctionne mal (injection, allumage)", "Diagnostic rangée par rangée par un spécialiste du V12"],
        ["Bruit de distribution", "Distribution fatiguée", "Réfection, jusqu'à plus de 5 000 € selon ClassicDoctor"],
        ["Pannes électriques diverses, voyants", "Faisceau moteur abîmé par la chaleur, réparations d'amateur", "Faisceau ou calculateur : plus de 3 000 € selon ClassicDoctor"],
        ["Passages de vitesses brutaux", "Boîte automatique jamais vidangée", "Vidange ; réfection au-delà de 3 500 € selon ClassicDoctor"],
        ["Suspension qui cogne, modes sans effet", "Amortisseurs pilotés EDC usés", "Train complet autour de 4 000 € selon ClassicDoctor"],
        ["Fuites d'huile", "Joints de cache-culbuteurs et de carter", "Remplacement des joints"],
        ["Température qui monte", "Circuit de refroidissement vieillissant", "Radiateur, durites et pompe à eau à refaire préventivement"],
      ],
      caption: "D'après ClassicDoctor et les avis de propriétaires publiés par Automobile Sportive (boîte, injecteurs, refroidissement, climatisation).",
    },
    {
      type: "p",
      text: "Pour les procédures détaillées, la documentation d'atelier BMW reste la référence. Les forums spécialisés, comme la communauté internationale [8er.org](https://8er.org/), aident à diagnostiquer les pannes propres au V12.",
    },

    { type: "h2", id: "achat", text: "Acheter une Série 8 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Historique complet** : factures d'entretien du moteur, de la boîte et du refroidissement",
        "**Démarrage à froid** : ralenti stable, aucun bruit de distribution",
        "**Électricité** : teste chaque équipement, cherche les épissures et le chatterton dans le compartiment moteur",
        "**Rouille** : bas des ailes arrière, passages de roues, pourtour du toit ouvrant, bas de caisse et fond de coffre sous la moquette ; 2 500 € et plus pour une reprise de structure selon ClassicDoctor",
        "**Boîte automatique** : passages en mode normal et sport, à froid et à chaud",
        "**Phares escamotables et vitres sans montant** : fonctionnement et étanchéité",
      ],
    },
    {
      type: "callout",
      tone: "info",
      text: "Sur une Série 8 négligée, les frais de remise en état peuvent vite dépasser la valeur maximale du modèle (ClassicDoctor). Un exemplaire plus cher mais suivi est presque toujours le meilleur achat.",
    },

    { type: "h2", id: "prix", text: "Combien coûte une Série 8 en 2026 ?" },
    {
      type: "table",
      head: ["Version", "Années", "Budget en France"],
      rows: [
        ["850i", "1989-1994", "20 000 à 45 000 €"],
        ["840Ci 4,0 l", "1993-1996", "22 000 à 45 000 €"],
        ["840Ci 4,4 l", "1995-1999", "25 000 à 50 000 €"],
        ["850Ci 5,4 l", "1994-1999", "30 000 à 65 000 €"],
        ["850CSi", "1992-1996", "70 000 à 130 000 €"],
      ],
      caption: "Estimations ClassicDoctor (2026) pour des voitures roulantes, immatriculées et d'origine. L'état et l'historique comptent plus que la motorisation.",
    },
    {
      type: "p",
      text: "Suis le marché sur la [fiche Série 8 (E31)](/modeles/bmw/serie-8-e31), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : [guide d'achat BMW E38 et E46](/dossiers/guide-achat-bmw-e38-e46), avec la Série 7 V12 de la même époque, et [BMW Série 3 E30](/dossiers/bmw-serie-3-e30-histoire-moteurs-achat)",
        "Note l'entretien de ta Série 8 dans [Mon Garage](/garage) : le carnet calcule les prochaines échéances",
      ],
    },
  ],
  sources: [
    { title: "Retro Motor – BMW 8 Series: the story of the soft-focus supercar", url: "https://www.retromotor.co.uk/features/bmw-8-series-history/" },
    { title: "Wikipédia (miroir IPFS) – BMW 8 Series (E31)", url: "https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/BMW_8_Series_(E31)" },
    { title: "ClassicDoctor – BMW Série 8 E31 : fiabilité, défauts, prix et guide d'achat", url: "https://classicdoctor.fr/guide-achat-bmw-serie-8-e31/" },
    { title: "Automobile Sportive – Avis BMW Série 8 (E31) 850i / Ci", url: "https://www.automobile-sportive.com/guide/avis.php?essai=809" },
  ],
  models: [{ make: "bmw", model: "serie-8-e31", label: "BMW Série 8 (E31)" }],
};
