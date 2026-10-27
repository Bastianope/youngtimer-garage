import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 27/10/2026 (Volkswagen Newsroom, L'argus, Motor1, guides d'achat, annonces).
// Les prix sont des prix de marché observés (essais et annonces), pas une cote officielle.
export const golf1: Dossier = {
  slug: "volkswagen-golf-1-histoire-gti-achat",
  category: "modele",
  title: "Volkswagen Golf 1 : l'histoire, la GTI, et comment bien l'acheter",
  seoTitle: "Volkswagen Golf 1 (Mk1) : histoire, GTI, moteurs, prix et achat",
  description:
    "La Golf 1 de 1974 à 1983 : design Giugiaro, naissance de la GTI, cabriolet Karmann, moteurs, chiffres de production, points de rouille à vérifier et prix observés en 2026.",
  publishedAt: "2026-10-27",
  updatedAt: "2026-10-27",
  intro:
    "Elle devait succéder à une légende, la Coccinelle. Elle en est devenue une autre. La Golf 1 a imposé le modèle de la compacte moderne, et sa version GTI a popularisé la compacte sportive. Voici son histoire, ses moteurs, et tout ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "De la Coccinelle à la Golf" },
    {
      type: "p",
      text: "Au début des années 70, Volkswagen vit encore sur la Coccinelle, produite à plus de 21,5 millions d'exemplaires, avec son moteur arrière refroidi par air. Pour la remplacer, la marque change tout : moteur avant transversal refroidi par eau, traction, hayon. Le dessin est confié à **Giorgetto Giugiaro**, qui y travaille dès 1970 avec les équipes de Volkswagen.",
    },
    {
      type: "p",
      text: "La production en série démarre à Wolfsburg le 29 mars 1974 et la voiture est lancée en mai 1974. Elle s'appelle Rabbit aux États-Unis et au Canada, Caribe au Mexique. Le succès est immédiat : le millionième exemplaire sort dès octobre 1976, le cinq-millionième en février 1982.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1974 à 1983 en Europe de l'Ouest (Golf II présentée en septembre 1983)" },
        { label: "Total", value: "Environ 6,9 millions d'exemplaires vendus, dérivés et Jetta compris (Volkswagen) ; 6,99 millions produits selon Motor1" },
        { label: "Carrosseries", value: "3 et 5 portes, cabriolet Karmann, Jetta (version tricorps, 1979), utilitaire Caddy" },
        { label: "Prolongation", value: "**Citi Golf** produite en Afrique du Sud de 1984 jusqu'au 21 août 2009" },
      ],
    },

    { type: "h2", id: "gti", text: "1976 : la GTI popularise la compacte sportive" },
    {
      type: "p",
      text: "Lancée en juin 1976, la Golf GTI reçoit un 1.6 de 1 588 cm³ à injection mécanique K-Jetronic : **110 ch** pour environ 780 kg. Volkswagen espérait en vendre 5 000. Il en sera produit **461 700**. Elle coûtait 13 850 DM en 1976, soit environ 7 000 €.",
    },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Années"],
      rows: [
        ["GTI 1.6", "1 588 cm³, K-Jetronic", "110 ch à 6 100 tr/min, 137 Nm", "1976 à 1982"],
        ["GTI 1.8", "1 781 cm³", "112 ch à 5 800 tr/min, 150 Nm", "1982 à 1983"],
        ["GTD", "1.6 turbodiesel", "70 ch, 133 Nm", "1982 à 1983"],
      ],
    },
    {
      type: "p",
      text: "La vitesse maximale annoncée varie selon les sources, de 180 à 185 km/h. Les premières GTI ont une boîte 4 vitesses, la plupart des suivantes une 5 vitesses. La série spéciale **Pirelli**, en fin de carrière, reprend le 1.8. En 1982, la **GTD** applique la recette au diesel avec un 1.6 turbo de 70 ch.",
    },

    { type: "h2", id: "cabriolet", text: "Le cabriolet Karmann, jusqu'en 1993" },
    {
      type: "p",
      text: "Développé avec Karmann et produit à Osnabrück à partir du 14 février 1979, le cabriolet survit dix ans à la berline. Avec environ **392 000 exemplaires** jusqu'en 1993, il a été le cabriolet le plus produit au monde. Il reçoit un restylage pour le millésime 1988 (pare-chocs larges, extensions d'ailes) et, à partir de 1990, une capote électro-hydraulique en option.",
    },
    {
      type: "list",
      items: [
        "1979 : 1.5 de 70 ch (GL) et 1.6 de 110 ch (GLI)",
        "1982 : GLI 1.8 de 112 ch",
        "1984 : 1.8 de 90 ch",
        "1989 : 1.8 K-Jetronic de 95 ch",
        "1993 : seul reste un 1.8 catalysé de 98 ch",
      ],
    },

    { type: "h2", id: "moteurs", text: "Les moteurs de la berline" },
    {
      type: "table",
      head: ["Moteur", "Cylindrée", "Puissance", "Années"],
      rows: [
        ["1.1", "1 093 cm³", "50 puis 52 ch", "1974 à 1983"],
        ["1.3", "1 272 cm³", "60 ch", "1979 à 1983"],
        ["1.5", "1 471 cm³", "70 ch", "1974 à 1975"],
        ["1.6", "1 588 cm³", "75 ch", "1975 à 1977"],
        ["Diesel 1.5 D", "1 471 cm³", "50 ch", "1976 à 1980"],
        ["Diesel 1.6 D", "1 588 cm³", "54 ch", "1980 à 1983"],
      ],
      caption: "Puissances et années d'après une base de données technique (auto-data.net) : à recouper avec la documentation d'époque pour une version précise.",
    },

    { type: "h2", id: "achat", text: "Acheter une Golf 1 : les points à vérifier" },
    {
      type: "callout",
      tone: "warning",
      text: "**La rouille est l'ennemi numéro un.** La Golf 1 n'était pas galvanisée en usine. Une carrosserie saine vaut plus qu'un moteur refait. Méfie-toi d'un antigravillon tout neuf sous la caisse : il peut cacher de la corrosion.",
    },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "**Passages de roue** (y compris sous les extensions en caoutchouc), ailes avant et **bas de caisse**",
        "**Planchers**, fond de coffre et logement de la roue de secours",
        "**Baie et bas de pare-brise** sous les joints, tôle d'auvent",
        "Ailes intérieures, longerons et pied des montants avant, jupe avant",
        "Goulotte de remplissage, ancrages de l'essieu arrière, bac de batterie, bas de portes, hayon et points de cric",
      ],
    },
    { type: "h3", text: "Mécanique et électricité" },
    {
      type: "list",
      items: [
        "Fumée bleue au démarrage : joints de queues de soupapes ; sous charge : segments usés",
        "Injection K-Jetronic des GTI : réglage délicat, à confier à un spécialiste",
        "Courroie de distribution : à remplacer environ tous les 64 000 km (40 000 miles), facture à l'appui",
        "Boîte : synchros de 1re et 2e qui craquent",
        "Trains roulants et freins : silentblocs, crémaillère, flexibles et conduites de frein",
        "Boîte à fusibles abîmée par les infiltrations d'eau sous le pare-brise, câblages d'alarme ou d'autoradio ajoutés",
      ],
    },
    { type: "h3", text: "Spécial GTI et cabriolet" },
    {
      type: "list",
      items: [
        "**GTI** : vérifie que le moteur est celui d'origine. Repère d'époque : compteurs ronds séparés avant 1980, bloc rectangulaire ensuite.",
        "**Cabriolet** : évacuations d'eau de la capote, toile qui se fend aux plis, joints de vitres et de montants. Un passage en station de lavage révèle vite les fuites.",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une Golf 1 en 2026 ?" },
    {
      type: "table",
      head: ["Version", "Prix observés", "Source"],
      rows: [
        ["GTI à restaurer", "moins de 10 000 €", "L'argus, janvier 2026"],
        ["GTI courante (souvent plus de 180 000 km)", "environ 18 000 €", "L'argus, janvier 2026"],
        ["GTI en très bel état (exemplaire de l'essai)", "environ 25 000 €", "L'argus, janvier 2026"],
        ["GTI, annonces en France", "7 900 à 34 990 € demandés, le plus souvent 14 000 à 23 000 €", "Lesanciennes, octobre 2026"],
        ["Cabriolet (1981-1993), annonces", "environ 3 500 à 19 500 €, le plus souvent 8 000 à 14 000 €", "Leboncoin, octobre 2026"],
        ["Versions de base (L, GLS, diesel)", "quelques annonces entre 2 000 et 7 900 €", "Lesanciennes et leboncoin, octobre 2026"],
      ],
      caption: "Prix demandés dans les annonces et estimations de presse, pas une cote officielle. L'état et l'historique font varier les prix du simple au double.",
    },
    {
      type: "p",
      text: "Les GTI préparées d'époque, comme les Oettinger 16 soupapes, dépassent 30 000 € selon L'argus. Pour suivre le marché, consulte les prix observés et les annonces sur la [fiche Golf I](/modeles/volkswagen/golf-1), et active l'alerte pour être prévenu d'une nouvelle annonce.",
    },

    { type: "h2", id: "clubs", text: "Clubs et ressources" },
    {
      type: "list",
      items: [
        "[Club Golf GTI Série 1](https://www.clubgolfgtiserie1.com/) : association fondée en 2000, avec bulletin, sorties et forum",
        "[Passion Golf GTI](https://www.passiongolfgti.com/) : site et forums consacrés aux GTI 1 et 2 d'origine",
        "Pour les pièces : les liens Opisto, Octoclassic, Ovoko et Leboncoin de la [fiche Golf I](/modeles/volkswagen/golf-1#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Volkswagen Newsroom – Golf 1st generation (1974-1983)", url: "https://www.volkswagen-newsroom.com/en/golf-1st-generation-1974-1983-17905" },
    { title: "Volkswagen Newsroom – Golf 1 Cabriolet (1979-1993)", url: "https://www.volkswagen-newsroom.com/en/golf-1-cabriolet-19791993-19488" },
    { title: "Motorsactu – Il y a 50 ans, Volkswagen lançait la production de la Golf", url: "https://motorsactu.com/il-y-a-50-ans-le-29-mars-1974-volkswagen-lancait-la-production-de-la-premiere-golf/" },
    { title: "Motor1 – Rétrospective Volkswagen Golf Mk1", url: "https://fr.motor1.com/news/377548/retrospective-vw-golf-mk1/" },
    { title: "Wikipedia – Volkswagen Golf", url: "https://en.wikipedia.org/wiki/Volkswagen_Golf" },
    { title: "Wikipedia – Volkswagen Citi Golf", url: "https://en.wikipedia.org/wiki/Volkswagen_Citi_Golf" },
    { title: "Automobile Sportive – Histoire de la Golf GTI", url: "https://www.automobile-sportive.com/passion/histoire-golf-gti-generations.php" },
    { title: "L'argus – Essai rétro Volkswagen Golf 1 GTI (janvier 2026)", url: "https://www.largus.fr/actualite-automobile/essai-retro-volkswagen-golf-1-gti-1976-une-quinquagenaire-toujours-prete-a-en-decoudre-30045403.html" },
    { title: "Carscoops – Volkswagen Golf GTD 1982", url: "https://www.carscoops.com/2023/08/diesel-is-dead-this-1982-golf-gtd-reminds-us-of-the-new-possibilities-it-once-promised/" },
    { title: "Auto-data – Volkswagen Golf I, caractéristiques", url: "https://www.auto-data.net/de/volkswagen-golf-i-3-door-generation-1884" },
    { title: "Goodwood – Buyer's guide Volkswagen Golf GTI Mk1", url: "https://insurance.goodwood.com/buyers-guide/volkswagen-golf-gti-mk1" },
    { title: "Top Gear – Buying a Golf GTI Mk1", url: "https://www.topgear.com/car-reviews/volkswagen/golf-gti-mk1/buying" },
    { title: "Car & Classic – Guide d'achat Golf Mk1", url: "https://www.carandclassic.com/magazine/?p=30842" },
    { title: "Verdeck – Guide d'achat de la Golf 1 Cabrio", url: "https://www.verdeck.de/fr/blog/guide-d-achat-de-la-golf-1-cabrio-a-quoi-faire-attention-lors-de-l-achat-de-cette-voiture-classique" },
    { title: "Lesanciennes – Annonces Volkswagen Golf 1", url: "https://www.lesanciennes.com/annonces/voiture-collection/volkswagen-golf-1/" },
    { title: "Leboncoin – Golf 1 cabriolet Karmann", url: "https://www.leboncoin.fr/ck/voitures/golf-1-cabriolet-karmann" },
    { title: "Club Golf GTI Série 1", url: "https://www.clubgolfgtiserie1.com/" },
  ],
  models: [{ make: "volkswagen", model: "golf-1", label: "Volkswagen Golf I" }],
};
