import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 02/11/2026 (Caradisiac, Automobile Sportive, PassionYoungtimer).
// Les chiffres de production varient selon les sources : on donne les fourchettes et on le signale.
// Les prix sont des estimations de marché, pas une cote officielle.
export const renaultClioWilliams: Dossier = {
  slug: "renault-clio-williams-histoire-series-authenticite-achat",
  category: "modele",
  title: "Renault Clio Williams : l'histoire, les séries, et comment reconnaître une vraie",
  seoTitle: "Clio Williams : histoire, séries, authenticité, prix et achat",
  description:
    "La Clio Williams de 1993 à 1996 : 2.0 16S de 150 ch, séries numérotées et phase 2, comment repérer une fausse, points à vérifier et prix observés en 2026.",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  intro:
    "Bleu 449, jantes dorées, plaque numérotée : la Clio Williams est née pour homologuer la Clio en rallye et elle est devenue l'une des sportives françaises les plus recherchées. Sa cote attire aussi les répliques. Voici son histoire, ses séries, et comment reconnaître une vraie avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1993 : une Clio pour le rallye" },
    {
      type: "p",
      text: "Pour engager la Clio en rallye dans la catégorie 2 litres, Renault doit en vendre au moins **2 500** au public. La Clio Williams est présentée au **Salon de Genève en mars 1993** et commercialisée à partir d'avril 1993, au prix de **129 500 francs**. Le nom rend hommage à l'écurie Williams, motorisée par Renault et championne du monde de Formule 1.",
    },
    {
      type: "p",
      text: "Sous le capot, le **F7R** de 1 998 cm³ et 16 soupapes développe **150 ch** et 175 Nm. La voiture reçoit des voies élargies (34 mm à l'avant), des ailes spécifiques, des trains renforcés, la peinture **Bleu Sport 449** et des jantes **Speedline dorées** de 15 pouces. Le premier tirage est prévu à 3 800 exemplaires numérotés, mais la demande est telle que Renault en produit bien davantage.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1993 à 1995, et 1996 pour la série suisse Champion selon Caradisiac" },
        { label: "Total", value: "Environ **12 000** exemplaires (12 100 selon Automobile Sportive)" },
        { label: "Moteur", value: "F7R 2.0 16 soupapes, 150 ch à 6 100 tr/min, 175 Nm à 4 500 tr/min" },
        { label: "Performances", value: "990 kg, 215 km/h, 0 à 100 km/h en 7,8 à 7,9 s (constructeur)" },
      ],
    },

    { type: "h2", id: "series", text: "Les séries de la Williams" },
    {
      type: "table",
      head: ["Série", "Années", "Exemplaires", "Signes distinctifs"],
      rows: [
        ["Phase 1 (« Williams 1 »)", "1993-1994", "Environ 5 400, dont les 3 800 du premier tirage", "Plaque numérotée en laiton sur la console"],
        ["Phase 2 (« Williams 2 »)", "1994-1995", "Environ 5 000 à 6 700 selon les sources", "Restylage : calandre, rétroviseurs électriques plus grands, feux arrière ; plus de plaque numérotée"],
        ["Williams 3", "1995", "Environ 1 600, surtout pour l'export", "Dernière évolution"],
        ["Swiss Champion", "1995-1996", "500", "Bleu Méthyl métallisé 432, plaque numérotée dorée"],
      ],
      caption: "Les chiffres par série diffèrent entre Caradisiac et Automobile Sportive. Le total d'environ 12 000 exemplaires fait consensus.",
    },
    {
      type: "p",
      text: "La mécanique est la même d'une série à l'autre. L'écart de prix entre une phase 1 numérotée et une phase 2 tient donc surtout à la valeur de collection, pas à la conduite.",
    },

    { type: "h2", id: "authenticite", text: "Reconnaître une vraie Clio Williams" },
    {
      type: "callout",
      tone: "warning",
      text: "**Le piège classique : une Clio 16S repeinte en bleu 449 avec des jantes dorées.** La 16S a un moteur 1.8 F7P, la Williams un 2.0 F7R. Vérifie toujours avant de discuter du prix.",
    },
    {
      type: "list",
      items: [
        "**Moteur** : un F7R 2.0 16 soupapes, pas un F7P 1.8",
        "**Peinture** : le bleu 449 doit se retrouver dans les zones jamais repeintes (entrées de portes, dessous de capot, fond de coffre)",
        "**Plaque numérotée** : obligatoire sur une phase 1, d'origine et cohérente avec l'année",
        "**Caisse** : voies élargies, ailes avant spécifiques, trains renforcés, à comparer avec des photos de référence",
        "**Papiers** : carte grise, numéro de caisse et historique ; en cas de doute, demande l'avis d'un club Williams",
        "**Intérieur spécifique** : sièges, ceintures bleues et moquette d'origine",
      ],
    },

    { type: "h2", id: "achat", text: "Les points à vérifier" },
    { type: "h3", text: "Mécanique" },
    {
      type: "list",
      items: [
        "Courroie de distribution et pompe à eau : tous les 5 ans ou 60 000 km",
        "Consommation d'huile : niveau à surveiller régulièrement, comme sur beaucoup de 16 soupapes",
        "Suintements de cache-culbuteurs, supports moteur, sondes de température",
        "Boîte JC5 : synchros de 2e et 3e souvent marqués ; cardans à écouter en braquage serré",
        "Alternateur, amortisseurs et échappement s'usent plus vite sur une voiture menée en sportive",
      ],
    },
    { type: "h3", text: "Caisse, trains et intérieur" },
    {
      type: "list",
      items: [
        "**Passages de roues arrière** : zone sensible connue",
        "Bas de caisse et fixations de berceau",
        "Silentblocs, rotules et moyeux avant sur les voitures jamais refaites",
        "Plastiques intérieurs qui ont mal vieilli",
        "Historique : beaucoup de Williams affichent un kilométrage élevé et un passé flou ; une voiture modifiée perd de sa valeur",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une Clio Williams en 2026 ?" },
    {
      type: "table",
      head: ["État", "Phase 2 et Williams 3", "Phase 1 numérotée", "Source"],
      rows: [
        ["D'usage, historique incomplet", "12 000 à 17 000 €", "18 000 à 25 000 €", "PassionYoungtimer, 2026"],
        ["Bel état, historique suivi", "18 000 à 26 000 €", "26 000 à 38 000 €", "PassionYoungtimer, 2026"],
        ["Exceptionnelle, d'origine, faible kilométrage", "28 000 € et plus", "40 000 € et plus", "PassionYoungtimer, 2026"],
      ],
      caption: "Estimations de marché, pas une cote officielle. Caradisiac cite environ 22 000 € pour une phase 2 de plus de 200 000 km, et 35 000 € et plus sous les 100 000 km. Record : 75 880 € pour une Williams de 1995 affichant 15 km, aux enchères Aguttes en juin 2022.",
    },
    {
      type: "p",
      text: "À ce niveau de prix, une inspection par un spécialiste ou un membre de club avant l'achat est vite rentabilisée. Suis le marché sur la [fiche Clio Williams](/modeles/renault/clio-williams), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "À lire aussi : notre dossier [Renault Super 5 GT Turbo](/dossiers/renault-super-5-gt-turbo-histoire-phases-achat), la sportive Renault qui l'a précédée",
        "Pour les pièces : les liens neufs et occasion de la [fiche Clio Williams](/modeles/renault/clio-williams#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Caradisiac – La Williams, celle qui a élevé la Renault Clio au rang de mythe", url: "https://www.caradisiac.com/la-williams-celle-qui-a-eleve-la-renault-clio-au-rang-de-mythe-217772.htm" },
    { title: "Automobile Sportive – Guide Renault Clio Williams", url: "https://www.automobile-sportive.com/guide/renault/cliowilliams.php" },
    { title: "PassionYoungtimer – Clio Williams : cote, authenticité et problèmes connus", url: "https://www.passionyoungtimer.fr/fiche-clio-williams.html" },
  ],
  models: [{ make: "renault", model: "clio-williams", label: "Renault Clio Williams" }],
};
