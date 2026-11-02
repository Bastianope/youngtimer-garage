import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 02/11/2026 (Autocar, Automobile Sportive, Classics World, PassionYoungtimer, annonces).
// Les prix sont des prix de marché observés (annonces et estimations), pas une cote officielle.
export const peugeot205Gti: Dossier = {
  slug: "peugeot-205-gti-histoire-1-6-1-9-achat",
  category: "modele",
  title: "Peugeot 205 GTI : l'histoire, 1.6 ou 1.9, et comment bien l'acheter",
  seoTitle: "Peugeot 205 GTI : histoire, 1.6 ou 1.9, problèmes, prix et achat",
  description:
    "La 205 GTI de 1984 à 1994 : 1.6 de 105 puis 115 ch, 1.9 de 130 ch, séries spéciales, train arrière et rouille à vérifier, et prix observés en 2026.",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  intro:
    "Dans les années 80, la réponse française à la Golf GTI s'appelle 205 GTI. Légère, vive, joueuse, elle a fait la réputation de Peugeot pour une génération entière. Voici son histoire, la différence entre la 1.6 et la 1.9, et tout ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1984 : Peugeot lance sa GTI" },
    {
      type: "p",
      text: "La 205 est lancée en 1983 pour succéder à la 104. Un an plus tard, en **avril 1984**, arrive la GTI avec un 1.6 de **105 ch**. La recette est simple : une caisse légère (moins de 900 kg), un moteur qui aime les tours et un châssis très vif. Le succès est immédiat : selon Automobile Sportive, il s'en vend près de **50 000 par an entre 1985 et 1987**.",
    },
    {
      type: "p",
      text: "En 1986, le 1.6 passe à **115 ch** et la **1.9 de 130 ch** est présentée au Salon de Paris. La gamme est restylée en 1988, puis les versions catalysées de la 1.9 descendent à **122 ch**. La production de la GTI s'arrête en **1994**, après dix ans de carrière.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1984 à 1994" },
        { label: "Total", value: "Environ **330 000** GTI produites selon Automobile Sportive (330 047 de 1983 à 1994)" },
        { label: "Moteurs", value: "1.6 XU5J (105 puis 115 ch), 1.9 XU9J (130 ch, 122 ch catalysé)" },
        { label: "Dérivés", value: "Cabriolet **CTI** (Pininfarina), série spéciale **Griffe**, kit usine PTS" },
      ],
    },

    { type: "h2", id: "versions", text: "1.6 ou 1.9 : quelles différences ?" },
    {
      type: "table",
      head: ["", "GTI 1.6", "GTI 1.9"],
      rows: [
        ["Cylindrée", "1 580 cm³", "1 905 cm³"],
        ["Puissance", "105 ch (1984), puis 115 ch à 6 250 tr/min", "130 ch à 6 000 tr/min (122 ch catalysé)"],
        ["Couple", "133 Nm à 4 000 tr/min", "environ 161 Nm à 4 750 tr/min"],
        ["Poids annoncé", "875 kg", "890 kg"],
        ["Vitesse maxi", "196 km/h", "205 km/h"],
        ["1 000 m départ arrêté", "30,5 s", "29,8 s"],
        ["Freins arrière", "Tambours", "Disques"],
        ["Jantes", "14 pouces", "15 pouces Speedline"],
      ],
      caption: "Données des versions non catalysées d'après Automobile Sportive et Classics World.",
    },
    {
      type: "p",
      text: "La **1.6** est la plus nerveuse dans les tours et la plus recherchée par les puristes. La **1.9** apporte du couple, des disques à l'arrière et une sellerie demi-cuir, avec la direction assistée en option. La conduite des deux reste exigeante : le train arrière peut devenir joueur au lever de pied en courbe.",
    },

    { type: "h2", id: "series", text: "Cabriolet CTI et séries spéciales" },
    {
      type: "list",
      items: [
        "**CTI** : le cabriolet, dessiné et assemblé avec Pininfarina, d'abord avec le 1.6 de 115 ch, puis avec un 1.9 ramené à 105 ch en fin de carrière",
        "**Griffe** : série de fin de carrière en 1.9 de 130 ch, peinture verte, intérieur cuir noir et jantes noires",
        "**Kit PTS** : préparation proposée par Peugeot Talbot Sport, autour de 125 ch",
        "Les 205 **Rallye** (1.3 de 100 ch) et **Gentry** ne sont pas des GTI, même si elles en reprennent l'esprit ou l'allure",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "Les séries spéciales se reconstituent facilement : peinture, jantes, sellerie. Pour une Griffe ou une série limitée, exige des preuves (carte grise, factures d'origine, numéro de série) avant de payer la différence.",
    },

    { type: "h2", id: "achat", text: "Acheter une 205 GTI : les points à vérifier" },
    { type: "h3", text: "Le train arrière, point faible numéro un" },
    {
      type: "p",
      text: "Les roulements des bras arrière s'usent. Vue de derrière, si les roues arrière rentrent nettement en haut (carrossage négatif visible) ou si la voiture penche d'un côté, la remise en état du train arrière est à prévoir dans le budget.",
    },
    { type: "h3", text: "Carrosserie" },
    {
      type: "list",
      items: [
        "Bas de caisse et pied des montants centraux, passages de roues arrière",
        "Fond de coffre, planchers et pourtour de pare-brise",
        "Ailes avant et face avant",
        "Méfiance envers des bas de caisse fraîchement peints, des jeux de panneaux irréguliers ou une teinte qui ne raccorde pas (remontage après accident)",
      ],
    },
    { type: "h3", text: "Mécanique et électricité" },
    {
      type: "list",
      items: [
        "Refroidissement : radiateur, sondes, thermocontact du ventilateur",
        "Joint de cache-culbuteurs et supports moteur",
        "Sur la 1.9 : un claquement de poussoirs à froid qui persiste est à prendre au sérieux",
        "Boîte : synchro de 2e fatigué (craque au rétrogradage), cardans et soufflets",
        "Train avant : silentblocs de triangles et biellettes de barre stabilisatrice qui cognent, jeu de crémaillère",
        "Électricité : masses oxydées, commodos, faisceau bricolé (une installation non d'origine fait baisser la valeur)",
      ],
    },
    { type: "h3", text: "Intérieur et originalité" },
    {
      type: "list",
      items: [
        "Sièges demi-cuir de la 1.9 souvent fendus ou rétrécis aux coutures",
        "Planche de bord qui grince, armatures de sièges qui ont du jeu",
        "Kilométrage : demande factures et anciens procès-verbaux de contrôle technique, compteurs souvent remplacés",
        "Une GTI d'origine se valorise : ressorts courts, échappement et jantes non d'origine se négocient",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une 205 GTI en 2026 ?" },
    {
      type: "table",
      head: ["État", "1.6", "1.9", "Source"],
      rows: [
        ["À restaurer ou fatiguée", "6 000 à 10 000 €", "8 000 à 13 000 €", "PassionYoungtimer, 2026"],
        ["Bel état d'usage, historique suivi", "12 000 à 18 000 €", "15 000 à 24 000 €", "PassionYoungtimer, 2026"],
        ["Exceptionnelle, d'origine, faible kilométrage", "20 000 € et plus", "28 000 € et plus", "PassionYoungtimer, 2026"],
        ["Annonces en France", "8 000 à 26 000 €", "18 900 à 39 900 €", "Lesanciennes, novembre 2026"],
      ],
      caption: "Prix demandés dans les annonces et estimations, pas une cote officielle. Sur 21 annonces relevées, la moitié se situe entre 16 000 et 26 000 €.",
    },
    {
      type: "p",
      text: "L'état, l'originalité et l'historique comptent plus que la version : une 1.6 saine et documentée vaut mieux qu'une 1.9 sans factures. Suis le marché sur la [fiche 205 GTI](/modeles/peugeot/205-gti), avec les prix observés, les annonces et l'alerte pour être prévenu d'une nouvelle annonce.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[205 GTi Drivers Club](https://205gtidrivers.com/) : communauté britannique très documentée, avec guides d'achat et forum",
        "Le livre « Peugeot 205 GTI, The Essential Buyer's Guide » de Jon Blackburn (Veloce), avec une grille d'évaluation point par point",
        "Pour les pièces : les liens neufs et occasion de la [fiche 205 GTI](/modeles/peugeot/205-gti#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Autocar – History of the Peugeot 205 GTi", url: "https://www.autocar.co.uk/car-news/features/history-peugeot-205-gti-–-picture-special" },
    { title: "Motorionline – Peugeot 205 GTi festeggia 40 anni", url: "https://www.motorionline.com/peugeot-205-gti-festeggia-40-anni/" },
    { title: "Automobile Sportive – Guide Peugeot 205 GTI", url: "https://www.automobile-sportive.com/guide/peugeot/205gti.php" },
    { title: "Classics World – Peugeot 205 GTI buyer's guide", url: "https://classicsworld.co.uk/guides/peugeot-205-gti-buyers-guide/" },
    { title: "PassionYoungtimer – Peugeot 205 GTI : cote et pièges à éviter", url: "https://www.passionyoungtimer.fr/fiche-peugeot-205-gti.html" },
    { title: "Driving Spirit – Peugeot 205 GTI buyer's guide (Jon Blackburn)", url: "https://drivingspirit.com/peugeot-205-gti-buyers-guide/" },
    { title: "Lesanciennes – Annonces Peugeot 205 GTI", url: "https://www.lesanciennes.com/annonces/voiture-collection/peugeot-205-gti/" },
    { title: "205 GTi Drivers Club – Buying guide", url: "https://205gtidrivers.com/articles/articles-guides/205-gti-basics/buying-guide-2-r16" },
  ],
  models: [{ make: "peugeot", model: "205-gti", label: "Peugeot 205 GTI" }],
};
