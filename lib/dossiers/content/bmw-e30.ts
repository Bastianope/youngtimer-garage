import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 02/11/2026 (BMWBlog, Mecatechnic, Classics World, PassionYoungtimer, CarJager, annonces).
// Les prix sont des prix de marché observés, pas une cote officielle.
export const bmwE30: Dossier = {
  slug: "bmw-serie-3-e30-histoire-moteurs-achat",
  category: "modele",
  title: "BMW Série 3 E30 : l'histoire, les moteurs, la M3, et comment bien l'acheter",
  seoTitle: "BMW E30 : histoire, moteurs, M3, problèmes, prix et achat",
  description:
    "La Série 3 E30 de 1982 à 1994 : coach, berline, cabriolet et Touring, 4 et 6 cylindres, M3, points à vérifier (rouille, courroie M20) et prix observés en 2026.",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  intro:
    "Propulsion, six cylindres en ligne, ligne carrée et format compact : l'E30 coche toutes les cases du youngtimer allemand. Produite à plus de 2,3 millions d'exemplaires, elle reste abordable en 4 cylindres, quand la M3 est devenue une voiture de collection. Voici son histoire, ses moteurs, et ce qu'il faut vérifier avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1982 : la deuxième Série 3" },
    {
      type: "p",
      text: "L'E30 succède à l'E21 en **1982**, d'abord en coach deux portes. La berline quatre portes suit, puis le **cabriolet** BMW (produit de 1986 à 1993) et le break **Touring** (de 1987 à 1994). Le carrossier Baur proposait déjà une version découvrable TC2 dès 1983. Une transmission intégrale apparaît avec la **325iX**. La gamme est restylée pour le millésime 1988 (pare-chocs, feux arrière, intérieur), ce qui sépare les « phase 1 » des « phase 2 ».",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1982 à 1994 (cabriolet jusqu'en 1993, Touring jusqu'en 1994)" },
        { label: "Total", value: "Environ **2,34 millions** d'exemplaires (BMWBlog)" },
        { label: "Carrosseries", value: "Coach 2 portes, berline 4 portes, cabriolet, Touring" },
        { label: "Dérivés", value: "**M3** (1986 à 1991), roadster **Z1** sur base E30 (8 000 exemplaires)" },
      ],
    },

    { type: "h2", id: "moteurs", text: "Les moteurs : 4 cylindres, 6 cylindres et diesel" },
    {
      type: "table",
      head: ["Famille", "Versions", "Ce qu'il faut savoir"],
      rows: [
        ["M10 (4 cylindres)", "316, 318i des débuts", "Distribution par chaîne, robuste"],
        ["M40 (4 cylindres)", "316i, 318i à partir de 1987-1988", "Courroie de distribution, arbre à cames à surveiller"],
        ["M42 (4 cylindres 16 soupapes)", "318iS", "La 4 cylindres la plus sportive"],
        ["M20 (6 cylindres)", "320i, 323i, 325i", "Courroie de distribution impérative ; 325i de 170 ch"],
        ["Diesel M21", "324d (86 ch), 324td (115 ch)", "Rares en France, lents mais endurants"],
      ],
      caption: "Puissance de la 325i d'après Mecatechnic et BMWBlog (168 à 170 ch selon les sources et la catalyse).",
    },
    {
      type: "p",
      text: "La **325i** est la plus recherchée : le six cylindres en ligne M20 donne à l'E30 son caractère, avec un son et une souplesse que les 4 cylindres n'ont pas. Les **316i et 318i** restent les portes d'entrée les plus abordables, et la **318iS** est appréciée pour son châssis équilibré.",
    },

    { type: "h2", id: "m3", text: "La M3, une E30 à part" },
    {
      type: "p",
      text: "Présentée au Salon de Francfort en septembre 1985 et produite de **1986 à 1991**, la M3 est une homologation pour la course : quatre cylindres S14 de 2,3 litres et 16 soupapes, 195 à 215 ch selon les versions, carrosserie élargie. BMW prévoyait 5 000 exemplaires, il en sort **17 970** selon le constructeur, dont 786 cabriolets. La **Sport Evolution** (2,5 litres, 238 ch) est limitée à 600 exemplaires.",
    },
    {
      type: "callout",
      tone: "info",
      text: "La M3 vit sur un autre marché que les E30 classiques : en 2026, une coupé courante démarre autour de 65 000 € et une belle se négocie 90 000 à 130 000 € selon CarJager. Ce dossier se concentre sur les autres versions.",
    },

    { type: "h2", id: "achat", text: "Acheter une E30 : les points à vérifier" },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "**Passages de roues arrière**, surtout sur les phase 2 : soulève les moquettes du coffre pour voir les passages intérieurs",
        "Bas de caisse et **points de levage** (les quatre renforts doivent être présents), jonction ailes avant et bas de caisse",
        "Jupe avant boulonnée, coins de l'auvent, zone sous la boîte à fusibles",
        "Tablier : ouvre la boîte à gants et cherche humidité ou rouille",
        "Bac de batterie, jupe arrière, ancrages du train arrière (réparation coûteuse), angles du joint de coffre",
        "Toit ouvrant : des bosses sous le ciel de toit signalent une rouille qui pousse depuis le cadre",
        "Méfiance envers le mastic : les réparations cosmétiques sont fréquentes",
      ],
    },
    { type: "h3", text: "Moteur" },
    {
      type: "callout",
      tone: "warning",
      text: "**Six cylindres M20 : courroie et galet tous les 60 000 km ou 5 ans maximum, pompe à eau en même temps.** Sans facture récente, considère qu'elle est à faire avant de rouler : une rupture abîme le moteur.",
    },
    {
      type: "list",
      items: [
        "Eau dans l'huile ou huile dans l'eau sur un M20 : souvent une fissure de culasse sous l'arbre à cames, pas seulement le joint",
        "Refroidissement M20 négligé : radiateur, thermostat et durites doivent avoir été changés ; un vase d'expansion sale est mauvais signe",
        "Usure d'arbre à cames sur les moteurs mal entretenus (M20 et M40)",
        "M10 : une chaîne bruyante au ralenti signale un pignon usé",
        "Fumée bleue au démarrage : joints de queues de soupapes",
      ],
    },
    { type: "h3", text: "Transmission, trains et électricité" },
    {
      type: "list",
      items: [
        "Silentblocs du berceau arrière et des bras, ressorts arrière cassés, amortisseurs fatigués, coupelles avant (claquements en rond-point)",
        "Pont : le petit pont des versions hors 325i peut siffler à fort kilométrage ; une légère suée est banale, une fuite franche non",
        "Anciennes voitures de drift : pont soudé, frein à main hydraulique, soubassement arrière marqué",
        "Boîtes automatiques ZF : flector d'arbre de transmission et tringlerie",
        "Compteur avec indicateur d'entretien : batteries du circuit imprimé qui coulent, check-panel capricieux, module de centralisation",
        "Cabriolet : ouvre et ferme complètement la capote, mécanisme et toile coûtent cher",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une E30 en 2026 ?" },
    {
      type: "table",
      head: ["État", "4 cylindres (316i, 318i)", "6 cylindres (320i, 325i)", "Source"],
      rows: [
        ["D'usage, à remettre à niveau", "4 000 à 8 000 €", "8 000 à 14 000 €", "PassionYoungtimer, 2026"],
        ["Bel état, historique suivi", "9 000 à 15 000 €", "15 000 à 28 000 €", "PassionYoungtimer, 2026"],
        ["D'origine, faible kilométrage", "16 000 € et plus", "30 000 € et plus", "PassionYoungtimer, 2026"],
        ["325i cabriolet, annonces en France", "-", "15 900 à 34 000 €, médiane autour de 25 000 €", "Lesanciennes, novembre 2026"],
      ],
      caption: "Prix demandés et estimations, pas une cote officielle. À état égal, cabriolets et Touring se paient plus cher que les coachs et berlines.",
    },
    {
      type: "p",
      text: "Méfie-toi des kilométrages « d'origine » trop beaux : recoupe carnet, factures et usure intérieure. Suis le marché sur la [fiche E30](/modeles/bmw/e30), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : notre [guide d'achat BMW E38 et E46](/dossiers/guide-achat-bmw-e38-e46) pour les générations suivantes",
        "Pour les pièces : les liens neufs et occasion de la [fiche E30](/modeles/bmw/e30#annonces)",
      ],
    },
  ],
  sources: [
    { title: "BMWBlog – BMW E30 3 Series: history and review", url: "https://www.bmwblog.com/2025/02/14/bmw-e30-3-series-history-review/" },
    { title: "Mecatechnic – Histoire de la BMW E30", url: "https://www.mecatechnic.com/fr-FR/blog/articles/histoire-bmw-e30" },
    { title: "Classics World – BMW E30 3 Series buyer's guide", url: "https://classicsworld.co.uk/guides/bmw-e30-3-series-buyers-guide/" },
    { title: "PassionYoungtimer – BMW Série 3 E30 : cote et pièges à éviter", url: "https://www.passionyoungtimer.fr/fiche-bmw-e30.html" },
    { title: "CarJager – Guide d'achat BMW M3 E30 (cote 2026)", url: "https://www.carjager.com/blog/article/guide-dachat-bmw-m3-e30-gd.html" },
    { title: "Lesanciennes – Annonces BMW 325", url: "https://www.lesanciennes.com/annonces/voiture-collection/bmw-325/" },
  ],
  models: [{ make: "bmw", model: "e30", label: "BMW Série 3 (E30)" }],
};
