import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Stuttcars, PorschePassion, Porsche Club 924-944-968 France).
// Les années de lancement varient d'un an selon les sources (année civile ou millésime) : on le signale.
// Les prix sont des prix demandés relevés dans les annonces, pas une cote officielle.
export const porsche944: Dossier = {
  slug: "porsche-944-histoire-versions-entretien-pannes-achat",
  category: "modele",
  title: "Porsche 944 : l'histoire, les versions, l'entretien, les pannes et comment bien l'acheter",
  seoTitle: "Porsche 944 : versions, courroies, pannes, prix et achat",
  description:
    "La Porsche 944 de 1982 à 1991 : 2.5, S, S2, Turbo et cabriolet, courroies et pompe à eau, pannes courantes, points à vérifier et prix observés en 2026.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Moteur avant, boîte à l'arrière, répartition des masses quasi parfaite : la 944 est la Porsche des années 80 la plus accessible, et l'une des plus équilibrées à conduire. Son point faible est connu : un entretien des courroies qui ne pardonne pas l'oubli. Voici son histoire, ses versions, son entretien et ce qu'il faut vérifier avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1981 : la Porsche transaxle grand public" },
    {
      type: "p",
      text: "Présentée au Salon de Francfort en **septembre 1981**, la 944 reprend la base de la 924 avec des ailes élargies et, surtout, un vrai moteur Porsche : un **4 cylindres de 2,5 litres** équipé de deux arbres d'équilibrage, dérivé d'une moitié du V8 de la 928. La boîte est montée à l'arrière (architecture **transaxle**), ce qui équilibre les masses entre l'avant et l'arrière.",
    },
    {
      type: "p",
      text: "Mi-1985, l'intérieur est entièrement revu, avec une planche de bord ovale. La **Turbo**, la **S** à 16 soupapes puis la **S2** de 3 litres et le **cabriolet** suivent. La production s'arrête en **1991**, et la 968 prend le relais.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1982 à 1991, à Neckarsulm (et Zuffenhausen pour les dernières S2)" },
        { label: "Total", value: "**163 302** exemplaires selon Porsche (cité par PorschePassion)" },
        { label: "Phases", value: "Planche de bord « ancienne » jusqu'en 1985, ovale ensuite" },
        { label: "Versions", value: "944 (2.5 puis 2.7), **944 S**, **944 S2** coupé et cabriolet, **944 Turbo** et Turbo S" },
      ],
    },

    { type: "h2", id: "versions", text: "Quelle 944 choisir ?" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Exemplaires", "À savoir"],
      rows: [
        ["944", "2,5 l 8 soupapes, puis 2,7 l (1989)", "environ 150 à 165 ch", "environ 113 000", "La plus répandue et la plus simple"],
        ["944 S", "2,5 l 16 soupapes", "190 ch", "environ 12 900", "Plus pointue, rare"],
        ["944 S2", "3,0 l 16 soupapes", "211 ch", "environ 14 000", "Le meilleur compromis, existe en cabriolet"],
        ["944 Turbo", "2,5 l turbo", "220 ch, puis 250 ch", "environ 25 000", "La plus rapide, entretien plus coûteux"],
      ],
      caption: "Puissances et exemplaires d'après Stuttcars, dont les chiffres par version ne correspondent pas exactement au total de Porsche. Selon les sources, la S est datée 1986 ou 1987 et la S2 1988 ou 1989.",
    },
    {
      type: "p",
      text: "La **944 de base** suffit pour profiter du châssis. La **S2** est souvent jugée la plus aboutie : plus de couple et un look de Turbo, sans la complexité du turbo. La **Turbo** est la plus performante, mais aussi la plus chère à acheter et à entretenir.",
    },

    { type: "h2", id: "entretien", text: "Entretien : les interventions clés" },
    {
      type: "callout",
      tone: "warning",
      text: "**Les courroies sont le point vital de la 944.** La courroie de distribution et celle des arbres d'équilibrage se changent ensemble, avec les galets tendeurs et les joints spi, **tous les 4 ans ou environ 77 000 km**, au premier terme atteint (PorschePassion, d'après Classic & Sports Car). Sans facture récente, considère qu'elles sont à faire avant de rouler.",
    },
    {
      type: "table",
      head: ["Intervention", "Intervalle conseillé", "À savoir"],
      rows: [
        ["Courroies distribution et arbres d'équilibrage, galets, joints spi", "4 ans ou environ 77 000 km", "Kit à partir de 250 € environ, plus la main-d'œuvre"],
        ["Pompe à eau et calorstat", "En même temps que les courroies", "Une grande partie du démontage est commune ; kit à partir de 230 € environ"],
        ["Chaîne et tendeur entre arbres à cames (S et S2)", "Au moins tous les 155 000 km environ", "Tendeur hydraulique à vérifier"],
        ["Courroie d'alternateur", "Dès qu'elle est craquelée", "Contrôle à chaque révision"],
        ["Embrayage", "Selon l'usure", "Boîte à l'arrière : il faut déposer la transmission ; joint spi arrière de vilebrequin à faire en même temps"],
      ],
      caption: "Prix des kits relevés par le Porsche Club 924-944-968 France, hors main-d'œuvre. Pour les procédures et réglages détaillés, la revue technique du modèle et le club restent les références.",
    },
    {
      type: "p",
      text: "Selon le Porsche Club 924-944-968 France, un léger sifflement de la courroie d'équilibrage au premier démarrage après remplacement est normal et disparaît vite. S'il persiste, la courroie est sans doute trop tendue ou mal alignée ; si le moteur vibre, le calage des arbres d'équilibrage est à revoir.",
    },

    { type: "h2", id: "pannes", text: "Pannes courantes : symptôme, cause, solution" },
    {
      type: "table",
      head: ["Symptôme", "Cause probable", "Solution"],
      rows: [
        ["Boue claire dans le vase d'expansion ou sous le bouchon d'huile", "Mélange huile et eau, souvent joint de culasse", "Diagnostic avant achat : réparation lourde"],
        ["Sifflement persistant à l'avant du moteur", "Courroie d'équilibrage trop tendue ou mal alignée", "Retension ou repose de la courroie"],
        ["Vibrations moteur anormales", "Calage des arbres d'équilibrage", "Contrôle du calage"],
        ["Vitesses qui accrochent", "Synchros usés", "Réfection de boîte, à négocier"],
        ["Claquement en braquage ou jeu dans le train avant", "Rotule usée, intégrée au triangle depuis 1985", "Remplacement du triangle complet"],
        ["Freinage qui tire d'un côté", "Étrier grippé", "Révision ou remplacement de l'étrier"],
        ["Grondement et fumée à l'échappement (Turbo)", "Turbo fatigué", "Réfection ou échange standard du turbo"],
        ["Eau dans l'habitacle ou le coffre", "Joints du toit ouvrant ou des feux arrière", "Remplacement des joints"],
      ],
      caption: "D'après PorschePassion, qui cite Hagerty et Classic & Sports Car, et le Porsche Club 924-944-968 France.",
    },

    { type: "h2", id: "achat", text: "Acheter une 944 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Factures des courroies et de la pompe à eau** : le premier document à demander",
        "Carrosserie : galvanisée d'origine, elle rouille quand même. Bas de caisse, ailes, passages de roues, et passage de roue arrière droit sous la moquette du coffre. Contrôle à l'aimant pour repérer le mastic",
        "Planche de bord fendue sur le dessus, fréquente et coûteuse à remplacer",
        "Planche ovale de 1985 : compteurs et commandes de chauffage moins fiables",
        "Phares escamotables : montée et descente des deux côtés",
        "Cabriolet : capote complète, comptée à plus de 1 000 £ posée par Hagerty",
        "Électricité : les voitures longtemps immobilisées souffrent de connexions oxydées",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une 944 en 2026 ?" },
    {
      type: "table",
      head: ["Version", "Prix demandés", "Kilométrage médian"],
      rows: [
        ["944 2.5 et 2.7", "12 500 à 25 000 €", "123 000 km"],
        ["944 S", "12 000 à 35 000 €", "142 000 km"],
        ["944 S2 coupé", "20 000 à 32 000 €", "186 000 km"],
        ["944 S2 cabriolet", "21 000 à 38 000 €", "151 000 km"],
        ["944 Turbo 220 ch", "21 000 à 43 000 €", "144 000 km"],
        ["944 Turbo S et Turbo 250 ch", "29 000 à 43 500 €", "168 000 km"],
      ],
      caption: "Relevé d'annonces PorschePassion, octobre 2026, tous états confondus. Ce sont des prix demandés, pas des prix de vente.",
    },
    {
      type: "p",
      text: "Une 944 aux courroies faites et à l'historique complet vaut nettement plus qu'une voiture moins chère dont l'entretien est inconnu. Suis le marché sur la [fiche 944](/modeles/porsche/944), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Porsche Club 924-944-968 France](https://www.924-944-968-porscheclub.fr/) : fiches techniques du club, dont le changement des courroies",
        "Note tes entretiens et les courroies dans [Mon Garage](/garage) : le carnet te prévient avant l'échéance",
        "Pour les pièces : les liens neufs et occasion de la [fiche 944](/modeles/porsche/944#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Stuttcars – The Porsche 944 Story", url: "https://www.stuttcars.com/porsche-models/944/" },
    { title: "PorschePassion – Porsche 944 : fiche, points faibles, cote 2026", url: "https://porschepassion.fr/modeles/944/" },
    { title: "Porsche Club 924-944-968 France – Changement des courroies 944 et 924S", url: "https://www.924-944-968-porscheclub.fr/PorscheClubs/pc_924-944-968-fr/pc_main.nsf/web/5976FD82A07C69D0C1257CB9004FE4E3" },
  ],
  models: [{ make: "porsche", model: "944", label: "Porsche 944" }],
};
