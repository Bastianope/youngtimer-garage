import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 02/11/2026 (Renault The Originals, Octane, PassionYoungtimer, Capcar).
// Les prix sont des estimations de marché, pas une cote officielle.
export const renault5GtTurbo: Dossier = {
  slug: "renault-super-5-gt-turbo-histoire-phases-achat",
  category: "modele",
  title: "Renault Super 5 GT Turbo : l'histoire, phase 1 ou phase 2, et comment bien l'acheter",
  seoTitle: "Renault 5 GT Turbo : histoire, phase 1 ou 2, problèmes, prix et achat",
  description:
    "La Super 5 GT Turbo de 1985 à 1991 : 1.4 turbo de 115 puis 120 ch, série Alain Oreille, voitures modifiées, turbo et rouille à vérifier, et prix observés en 2026.",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  intro:
    "Un bloc en fonte de 1,4 litre, un turbo Garrett, à peine plus de 800 kg : la Super 5 GT Turbo a été la petite bombe des années 80. Elle a aussi beaucoup souffert, et les exemplaires d'origine sont devenus rares. Voici son histoire, ses deux phases, et ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1985 : la sportive de la Supercinq" },
    {
      type: "p",
      text: "La Supercinq, construite sur la base de la Renault 11, remplace la R5 en 1984. Sa version sportive, la **GT Turbo**, arrive en **1985**, quatre mois après le lancement de la gamme. Elle reprend le 1,4 litre Cléon-Fonte de la R5 Alpine Turbo, avec un petit turbo **Garrett T2** et un échangeur air-air. Elle est abaissée de 38 mm, avec une barre de torsion arrière supplémentaire, des barres antiroulis plus épaisses, un kit carrosserie en plastique non peint et des jantes de 13 pouces.",
    },
    {
      type: "p",
      text: "Le restylage de **1987** marque le passage en **phase 2** : turbo refroidi par eau, ventilateur sous le capot contre les difficultés de redémarrage à chaud, et allumage revu qui porte la puissance à **120 ch**. La calandre, les jantes et le kit carrosserie peint couleur caisse changent aussi. La production s'arrête fin **1991**, et la Clio prend le relais.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1985 à 1991" },
        { label: "Total", value: "Environ **160 000** GT Turbo, phases 1 et 2 (Renault)" },
        { label: "Moteur", value: "1 397 cm³ Cléon-Fonte, carburateur, turbo Garrett T2" },
        { label: "Série spéciale", value: "**Alain Oreille** (1989, 2 000 exemplaires), finition **Raider** en fin de carrière" },
      ],
    },

    { type: "h2", id: "phases", text: "Phase 1 ou phase 2 : quelles différences ?" },
    {
      type: "table",
      head: ["", "Phase 1 (1985-1987)", "Phase 2 (1987-1991)"],
      rows: [
        ["Puissance", "115 ch", "120 ch"],
        ["Vitesse maxi (Renault)", "197 km/h", "204 km/h"],
        ["Turbo", "Refroidi par l'huile", "Refroidi par eau"],
        ["Redémarrage à chaud", "Difficile (percolation du carburateur)", "Amélioré par un ventilateur sous capot"],
        ["Kit carrosserie", "Plastique non peint", "Peint couleur caisse"],
      ],
      caption: "Poids d'environ 820 à 850 kg selon les sources (Octane, PassionYoungtimer).",
    },
    {
      type: "p",
      text: "La **phase 1** séduit les puristes par sa rareté et son look brut. La **phase 2** est plus facile à vivre au quotidien. Selon les spécialistes, l'état et l'originalité comptent bien plus que la phase dans la valeur.",
    },
    {
      type: "callout",
      tone: "info",
      text: "**La série Alain Oreille** (1989) célèbre les succès en rallye du pilote : la même année, il remporte le Rallye Côte d'Ivoire et devient, selon Renault, le seul pilote à gagner une manche du championnat du monde des rallyes avec une voiture du groupe N. Bleu sport métallisé, 2 000 exemplaires.",
    },

    { type: "h2", id: "achat", text: "Acheter une GT Turbo : les points à vérifier" },
    {
      type: "callout",
      tone: "warning",
      text: "**Une grande partie des GT Turbo ont été modifiées** : pression de turbo augmentée, échappement groupe N, manomètres ajoutés. Cherche les supports percés, les câblages modifiés et une boîte bruyante. Une 160 ch préparée vaut moins qu'une 120 ch d'origine.",
    },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "Bas de caisse, planchers et longerons : soulève les moquettes et tapote",
        "Pourtour de pare-brise et hayon",
        "Sous les extensions d'ailes en plastique du kit carrosserie",
        "Ancrages du train arrière",
        "Traces de choc : jeux de panneaux, teintes qui ne raccordent pas",
      ],
    },
    { type: "h3", text: "Moteur et turbo" },
    {
      type: "list",
      items: [
        "Refroidissement : le 1.4 turbo chauffe facilement, contrôle radiateur, ventilateur et durites",
        "Joint de culasse, souvent fatigué après une surchauffe",
        "Turbo : fumée bleue ou sifflement anormal",
        "Durites de suralimentation poreuses, échangeur encrassé, pompe à essence usée",
        "Carburateur Solex et allumage électronique à régler finement",
        "Demande un démarrage à froid **et** un redémarrage à chaud : un vendeur qui fait chauffer la voiture avant ta venue peut masquer un défaut",
        "Moteur refait sans facture : considère-le comme d'origine et usé",
      ],
    },
    { type: "h3", text: "Transmission, trains et intérieur" },
    {
      type: "list",
      items: [
        "Boîte JB : supporte les 120 ch d'origine mais pas les préparations ; bruits fréquents en 2e et 3e",
        "Cardans : écoute en braquage complet",
        "Silentblocs et amortisseurs à rafraîchir",
        "Plastiques intérieurs cassants : vérifie que tout est présent et que chaque bouton fonctionne",
        "Série Alain Oreille : méfiance envers les répliques d'autocollants sur une phase 2 ordinaire, vérifie la concordance avec les papiers",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une GT Turbo en 2026 ?" },
    {
      type: "table",
      head: ["État", "Prix observés", "Source"],
      rows: [
        ["À restaurer, fatiguée ou modifiée", "6 000 à 12 000 €", "Capcar et PassionYoungtimer, 2026"],
        ["Roulante et honnête, quelques défauts", "12 000 à 18 000 €", "Capcar, juillet 2026"],
        ["Bel état d'origine, historique documenté", "14 000 à 30 000 €", "PassionYoungtimer et Capcar, 2026"],
        ["Exceptionnelle, Alain Oreille authentique ou quasi neuve", "26 000 à plus de 30 000 €", "PassionYoungtimer et Capcar, 2026"],
      ],
      caption: "Estimations de marché, pas une cote officielle. La tendance est à la hausse selon Capcar.",
    },
    {
      type: "p",
      text: "Avec si peu de voitures restées d'origine, une GT Turbo saine et documentée part vite. Suis le marché sur la [fiche 5 GT Turbo](/modeles/renault/5-gt-turbo), avec les prix observés, les annonces et l'alerte. Côté entretien, les spécialistes conseillent une vidange tous les 5 000 km.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[GT Turbo Rhône-Alpes](https://www.gtturborhone-alpes.fr/achat.php) : club régional avec un guide d'achat détaillé",
        "À lire aussi : notre dossier [Peugeot 205 GTI](/dossiers/peugeot-205-gti-histoire-1-6-1-9-achat), sa grande rivale",
        "Pour les pièces : les liens neufs et occasion de la [fiche 5 GT Turbo](/modeles/renault/5-gt-turbo#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Renault The Originals – Supercinq GT Turbo", url: "https://theoriginals.renault.com/en/supercinq-gt-turbo" },
    { title: "Octane – Renault 5 GT Turbo buying guide, history and review", url: "https://www.octane-magazine.com/articles/buying-guides/renault-5-gt-turbo-buying-guide-history-and-review/" },
    { title: "PassionYoungtimer – Renault 5 GT Turbo : cote et pièges à éviter", url: "https://www.passionyoungtimer.fr/fiche-renault-5-gt-turbo.html" },
    { title: "Capcar – Renault 5 GT Turbo : cote, rareté et pièges", url: "https://www.capcar.fr/blog/renault-5-gt-turbo-youngtimer" },
    { title: "GT Turbo Rhône-Alpes – Guide d'achat", url: "https://www.gtturborhone-alpes.fr/achat.php" },
  ],
  models: [{ make: "renault", model: "5-gt-turbo", label: "Renault 5 GT Turbo" }],
};
