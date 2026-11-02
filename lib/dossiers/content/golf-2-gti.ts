import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 02/11/2026 (Volkswagen Newsroom, Automobile Sportive, Autocar, Classics World,
// PassionYoungtimer, annonces). Les prix sont des prix de marché observés, pas une cote officielle.
export const golf2Gti: Dossier = {
  slug: "volkswagen-golf-2-gti-8s-16s-g60-achat",
  category: "modele",
  title: "Volkswagen Golf 2 GTI : 8S, 16S ou G60, l'histoire et comment bien l'acheter",
  seoTitle: "Golf 2 GTI (8S, 16S, G60) : histoire, problèmes, prix et achat",
  description:
    "La Golf 2 GTI de 1984 à 1991 : 8 soupapes de 112 ch, 16S de 139 ch, G60 à compresseur, séries Edition One et Blue, points à vérifier et prix observés en 2026.",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  intro:
    "Plus grande, plus lourde et mieux finie que la première, la Golf 2 GTI a longtemps vécu dans l'ombre de son aînée et de la 205 GTI. Elle revient aujourd'hui sur le devant de la scène, notamment en 16 soupapes. Voici son histoire, ses trois moteurs, et ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1984 : une GTI plus mûre" },
    {
      type: "p",
      text: "La deuxième Golf GTI arrive en **1984**. Elle mesure 3,98 m, soit 14 cm de plus que la première, et pèse environ 100 kg de plus. Elle reprend presque sans changement le **1.8 de 112 ch** de la fin de carrière de la Golf 1. En 1985, elle reçoit des projecteurs additionnels, un liseré rouge et une double sortie d'échappement, ainsi que des poussoirs hydrauliques.",
    },
    {
      type: "p",
      text: "La **16 soupapes** (appelée **16S** en France, pour « soupapes ») est annoncée en mai 1985 et produite à partir de **mars 1986** : 139 ch sans catalyseur, puis 129 ch en version catalysée à partir du second semestre 1986. Le dernier grand restylage, avec de nouveaux pare-chocs, intervient en **août 1989**. La production à Wolfsburg s'arrête à l'été **1991**.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1984 à 1991" },
        { label: "Total", value: "**628 000** Golf 2 GTI produites (Volkswagen)" },
        { label: "Moteurs", value: "1.8 8 soupapes 112 ch, 1.8 16 soupapes 139 ch (129 ch catalysé), G60 à compresseur 160 ch" },
        { label: "Séries spéciales", value: "**Edition One** (1989), **Edition Blue** (1991, 2 100 exemplaires)" },
      ],
    },

    { type: "h2", id: "versions", text: "8S, 16S ou G60 : quelles différences ?" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Performances annoncées", "Années"],
      rows: [
        ["GTI 8S", "1 781 cm³, 8 soupapes", "112 ch", "-", "1984 à 1991"],
        ["GTI 16S", "1 781 cm³, 16 soupapes, K-Jetronic", "139 ch à 6 100 tr/min (129 ch catalysé)", "0 à 100 km/h en 8,5 s, 208 km/h (Volkswagen)", "1986 à 1991"],
        ["GTI G60", "1.8 à compresseur G-Lader, injection électronique", "160 ch, 225 Nm à 3 500 tr/min", "0 à 100 km/h en 8,3 s, 216 km/h", "1990 à 1991"],
      ],
      caption: "Données Volkswagen Newsroom. Automobile Sportive annonce pour la 16S 990 kg, 206 km/h et 9,2 s de 0 à 100 km/h : les chiffres varient selon les sources et les marchés.",
    },
    {
      type: "p",
      text: "La **8S** est la plus facile à vivre au quotidien, avec du couple en bas. La **16S** est plus pointue, plus rageuse dans les tours, et la plus recherchée. La **G60**, lancée en février 1990, est la plus rapide et la première GTI avec l'ABS de série, mais son compresseur G-Lader demande un entretien suivi.",
    },

    { type: "h2", id: "series", text: "Les séries spéciales" },
    {
      type: "list",
      items: [
        "**Edition One** (1989) : peinture spécifique, jantes BBS de 15 pouces et direction assistée, conservée jusqu'à la fin de la production",
        "**Edition Blue** (1991) : série limitée à **2 100** exemplaires, avec toit ouvrant, pommeau et soufflet de frein à main en cuir, jantes BBS",
        "La direction assistée devient de série la dernière année ; avant, elle était en option, à vérifier si tu roules surtout en ville",
      ],
    },

    { type: "h2", id: "achat", text: "Acheter une Golf 2 GTI : les points à vérifier" },
    {
      type: "callout",
      tone: "warning",
      text: "**La carrosserie coûte plus cher que la mécanique.** Le moteur est quasi indestructible s'il a été vidangé régulièrement. Une caisse rouillée, en revanche, est le poste de restauration le plus lourd.",
    },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "**Ailes intérieures** avant, cachées par les coques plastique : la zone la plus touchée, difficile à voir lors d'un essai",
        "Berceau avant, à inspecter à la lampe",
        "Autour de la trappe à carburant, ailes arrière et bas de portes",
        "Bas de caisse, jupe arrière, hayon, pourtour de pare-brise et planchers",
        "Pourtour du toit ouvrant, s'il y en a un",
      ],
    },
    { type: "h3", text: "Mécanique" },
    {
      type: "list",
      items: [
        "Fumée bleue : joints de queues de soupapes ou segments, une réfection de culasse coûte cher",
        "Ralenti instable : souvent une vanne de ralenti encrassée ou une prise d'air sur des durites de 30 ans, mais un vendeur qui ne l'a pas réglé n'a peut-être pas fait le reste",
        "Injection K-Jetronic : moteur « lourd » à cause d'un injecteur, doseur grippé ou volet de débitmètre bloqué",
        "Poussoirs hydrauliques qui claquent à froid : normal s'ils se taisent une fois l'huile en circulation",
        "Boîte 5 vitesses : synchro de 2e fatigué ; sur la 16S, vérifie aussi les passages de 2e et 4e (tringlerie ou synchros)",
        "Courroie de distribution : tous les 5 ans ou 60 000 km, à faire d'office sans facture",
        "G60 : preuve d'entretien du compresseur G-Lader exigée",
      ],
    },
    { type: "h3", text: "Trains roulants, électricité et originalité" },
    {
      type: "list",
      items: [
        "Silentblocs de berceau et de barre stabilisatrice, coupelles d'amortisseurs, flexibles de frein d'origine",
        "Freinage jugé juste sur les premières 16S, amélioré au restylage de 1989",
        "Masses oxydées : feux arrière et compteurs capricieux, réparable à faible coût",
        "Kilométrage : méfiance envers les compteurs remplacés et les voitures importées converties des miles",
        "Sellerie d'origine en tissu rayé GTI recherchée et chère ; selon Automobile Sportive, environ 40 % seulement des 16S sont restées d'origine",
        "Suspensions très abaissées : vérifie qu'elle n'a pas roulé en butée, ce qui abîme trains et passages de roues",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une Golf 2 GTI en 2026 ?" },
    {
      type: "table",
      head: ["État", "GTI 8S", "GTI 16S", "Source"],
      rows: [
        ["Roulante, entretien à prévoir", "5 000 à 9 000 €", "7 000 à 12 000 €", "PassionYoungtimer, 2026"],
        ["Bel état, historique documenté", "10 000 à 16 000 €", "13 000 à 22 000 €", "PassionYoungtimer, 2026"],
        ["D'origine, faible kilométrage", "18 000 € et plus", "24 000 € et plus", "PassionYoungtimer, 2026"],
        ["Annonces 16S en France", "-", "8 000 à 23 500 €, le plus souvent 9 000 à 14 000 €", "Leboncoin, novembre 2026"],
      ],
      caption: "Prix demandés et estimations, pas une cote officielle. Les 16S en annonce affichent souvent 150 000 à 215 000 km. La G60, plus rare, n'a pas assez d'annonces pour une fourchette fiable.",
    },
    {
      type: "p",
      text: "Comme pour toutes les GTI de cette époque, une voiture saine, d'origine et documentée vaut nettement plus qu'une auto modifiée. Suis le marché sur la [fiche Golf GTI II](/modeles/volkswagen/golf-gti-ii), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Passion Golf GTI](https://www.passiongolfgti.com/) : site et forums consacrés aux GTI 1 et 2 d'origine",
        "À lire aussi : notre dossier [Golf 1 : l'histoire, la GTI, et comment bien l'acheter](/dossiers/volkswagen-golf-1-histoire-gti-achat)",
        "Pour les pièces : les liens neufs et occasion de la [fiche Golf GTI II](/modeles/volkswagen/golf-gti-ii#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Volkswagen Newsroom – Golf 2 GTI (1984-1991)", url: "https://www.volkswagen-newsroom.com/en/golf-2-gti-19841991-19502" },
    { title: "Automobile Sportive – Guide occasion Golf 2 GTI 16S", url: "https://www.automobile-sportive.com/guide/volkswagen/golf2gti16s.php" },
    { title: "Autocar – Used car buying guide: Volkswagen Golf GTI Mk2", url: "https://www.autocar.co.uk/car-news/used-cars/used-car-buying-guide-volkswagen-golf-gti-mk2" },
    { title: "Classics World – Mk2 VW Golf buying guide", url: "https://classicsworld.co.uk/guides/mk2-vw-golf-buying-guide/" },
    { title: "PassionYoungtimer – Golf GTI Mk2 : cote et pièges à éviter", url: "https://www.passionyoungtimer.fr/fiche-golf-gti-mk2.html" },
    { title: "Leboncoin – Golf 2 GTI 16S", url: "https://www.leboncoin.fr/ck/voitures/golf-2-gti-16s" },
  ],
  models: [{ make: "volkswagen", model: "golf-gti-ii", label: "Volkswagen Golf GTI II" }],
};
