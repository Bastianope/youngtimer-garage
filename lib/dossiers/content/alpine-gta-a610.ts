import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Classic & Sports Car, Wikipédia, ClassicDoctor, CarJager).
// Les prix sont des estimations de marché, pas une cote officielle.
export const alpineGtaA610: Dossier = {
  slug: "alpine-gta-a610-histoire-v6-turbo-achat",
  category: "modele",
  title: "Alpine GTA et A610 : l'histoire des dernières Alpine de Dieppe, et comment bien les acheter",
  seoTitle: "Alpine GTA et A610 : histoire, V6 Turbo, Le Mans, pannes et prix",
  description:
    "Alpine GTA (1984-1991) et A610 (1991-1995) : V6 atmosphérique et Turbo, séries Le Mans et Mille Miles, châssis à surveiller, pannes du V6 PRV et prix en 2026.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Châssis-poutre en acier, carrosserie en composite, V6 en porte-à-faux arrière : la GTA puis l'A610 prolongent la recette Alpine jusqu'en 1995. Produites à environ 7 300 exemplaires, elles sont aujourd'hui les GT françaises les plus abordables de la marque, à condition de bien regarder sous la caisse. Voici leur histoire, leurs versions et ce qu'il faut vérifier.",
  blocks: [
    { type: "h2", id: "histoire", text: "1984 : la GTA prend la relève de l'A310" },
    {
      type: "p",
      text: "La GTA entre en production en **novembre 1984** à Dieppe. Plus longue, plus large et plus haute que l'A310, elle garde le **châssis-poutre central en acier** des Alpine et une carrosserie en panneaux de polyester et fibre de verre. Le **V6 PRV** est installé en porte-à-faux arrière : 2,85 litres atmosphérique de 160 ch, puis **V6 Turbo de 2,5 litres et 200 ch** à partir de septembre 1985.",
    },
    {
      type: "p",
      text: "En **1991**, l'**A610** remplace la GTA avec un V6 Turbo de 3 litres et **250 ch**. Elle ne partage que ses vitres avec la GTA. Sa production s'arrête en **1995** : l'usine de Dieppe assemble ensuite le Renault Sport Spider, et le nom Alpine se met en sommeil jusqu'en 2017.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "GTA de 1984 à 1991, A610 de 1991 à 1995, à Dieppe" },
        { label: "Total", value: "**7 291** exemplaires, dont **818** A610 (Classic & Sports Car)" },
        { label: "Construction", value: "Châssis-poutre en acier, carrosserie composite, propulsion, boîte 5 vitesses" },
        { label: "Séries spéciales", value: "**Mille Miles** (1989, 100 ex.), **Le Mans** (1990-1991, 325 ex.), Europa Cup (69 ex.)" },
      ],
    },

    { type: "h2", id: "versions", text: "Quelle version choisir ?" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Exemplaires", "À savoir"],
      rows: [
        ["GTA V6 GT", "V6 PRV 2,85 l atmosphérique", "160 ch", "environ 1 500", "La plus simple ; carburateurs Solex à régler"],
        ["GTA V6 Turbo", "V6 PRV 2,5 l turbo", "200 ch (moins avec catalyseur à partir de 1990)", "environ 4 640", "La plus répandue, gros temps de réponse du turbo"],
        ["GTA Le Mans", "V6 Turbo catalysé, carrosserie élargie", "Celle de la Turbo catalysée", "325", "La plus recherchée des GTA"],
        ["A610", "V6 PRV 3,0 l turbo", "250 ch, 350 Nm", "818", "Plus moderne, turbo mieux géré, phares escamotables"],
      ],
      caption: "Exemplaires d'après Classic & Sports Car, conduite à gauche et à droite cumulées. Le catalyseur, monté à partir de 1990, réduit la puissance de la Turbo.",
    },
    {
      type: "p",
      text: "La **V6 Turbo** est la plus facile à trouver. La **Le Mans** et l'**A610** sont les plus cotées. La **V6 GT atmosphérique** séduit par sa simplicité et son prix, même si elle n'a pas le caractère de la Turbo. Toutes demandent un conducteur averti : le moteur en porte-à-faux arrière rend le train arrière vif à la limite.",
    },

    { type: "h2", id: "entretien", text: "Entretien et pannes courantes" },
    {
      type: "callout",
      tone: "warning",
      text: "**Le châssis est le premier poste de dépense.** La carrosserie composite ne rouille pas, mais le châssis-poutre et le berceau arrière en acier, si. La caisse étant collée par-dessus, une réparation peut obliger à la déposer. Selon le club britannique, refaire la structure d'une A610 peut dépasser 10 000 livres, à peine moins sur une GTA. **Inspection sur pont obligatoire avant achat.**",
    },
    {
      type: "table",
      head: ["Symptôme", "Cause probable", "Solution"],
      rows: [
        ["Température qui monte, perte de liquide", "Radiateur avant encrassé, écope d'air cassée, circuit très long entre le moteur et l'avant", "Nettoyage ou remplacement du radiateur, écope, purge soignée ; plusieurs milliers d'euros sur une voiture négligée"],
        ["Mayonnaise sous le bouchon, fumée blanche", "Joint de culasse, mouvement des chemises du V6 PRV", "Réfection moteur, budget conséquent"],
        ["Fumée bleue ou sifflement du turbo", "Turbo fatigué", "Réfection ou échange du turbo"],
        ["Claquements de culbuteurs", "Usure de la distribution haute, entretien négligé", "Diagnostic ; vidanges régulières indispensables"],
        ["Embrayage qui broute", "Fuite d'huile sur l'embrayage", "Recherche de fuite ; embrayage d'A610 sur commande, cher"],
        ["Mauvais fonctionnement à bas régime (V6 GT)", "Carburateurs Solex usés", "Réfection ou conversion en carburateurs Weber ou Holley"],
        ["Compteur ou jauge farfelus", "Instrumentation fatiguée", "Réparation ; le kilométrage affiché peut être faux"],
        ["Portes qui tombent ou frottent", "Axes de charnières usés, montant en acier rouillé", "Remplacement des axes ; vérifier la rouille du montant"],
      ],
      caption: "D'après Classic & Sports Car et ClassicDoctor. Le V6 PRV a une distribution par chaîne, pas de courroie à changer. CarJager estime l'entretien annuel entre 1 500 et 3 000 €.",
    },

    { type: "h2", id: "achat", text: "Acheter une GTA ou une A610 : les points à vérifier" },
    {
      type: "list",
      items: [
        "**Sous la voiture** : châssis, berceau arrière, triangles inférieurs et pieds de montants, à la lampe et au tournevis",
        "**Carrosserie composite** : fissures, cloques et chocs mal réparés",
        "**Historique** : vidanges moteur et boîte à chaque révision, factures de refroidissement",
        "**Démarrage à froid et essai long** pour vérifier que la température reste stable",
        "**Phares escamotables** sur A610 : montée et descente des deux côtés",
        "**Intérieur complet** : les garnitures sont très difficiles à trouver ; le cuir se refait plus facilement que le tissu d'origine",
        "**Pneus arrière** très chers dans la taille d'origine",
        "Séries **Le Mans** et **Mille Miles** : vérifie le numéro de série et les papiers, les répliques existent",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une GTA ou une A610 en 2026 ?" },
    {
      type: "table",
      head: ["Version", "Budget en France", "Source"],
      rows: [
        ["GTA V6 GT atmosphérique", "18 000 à 25 000 €", "ClassicDoctor, 2026"],
        ["GTA V6 Turbo", "20 000 à 35 000 €", "ClassicDoctor, 2026"],
        ["GTA Mille Miles", "30 000 à 40 000 €", "ClassicDoctor, 2026"],
        ["GTA Le Mans", "35 000 à 50 000 €", "ClassicDoctor, 2026"],
        ["GTA ou A610, fourchette générale", "25 000 à 55 000 €", "CarJager, juillet 2026"],
      ],
      caption: "Estimations de marché, pas une cote officielle. L'A610, produite à 818 exemplaires, se situe dans le haut de la fourchette.",
    },
    {
      type: "p",
      text: "Le prix le plus bas cache souvent la facture la plus lourde, rappelle CarJager. Suis le marché sur les fiches [Alpine GTA](/modeles/renault/alpine-gta) et [Alpine A610](/modeles/alpine/a610).",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Forum Alpine Renault](https://forum.alpinerenault.com/) : la communauté française de référence, avec de nombreux sujets sur le châssis et le V6",
        "À lire aussi : notre dossier [Renault Sport Spider](/dossiers/renault-sport-spider-histoire-pare-brise-achat), construite ensuite à Dieppe",
        "Note les entretiens et les factures dans [Mon Garage](/garage)",
      ],
    },
  ],
  sources: [
    { title: "Classic & Sports Car – Renault GTA/Alpine A610 buyer's guide", url: "https://www.classicandsportscar.com/features/buyers-guide-renault-gtaalpine-a610" },
    { title: "Wikipédia (miroir IPFS) – Renault Alpine GTA/A610", url: "https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Renault_Alpine_GTA/A610" },
    { title: "ClassicDoctor – Renault Alpine GTA : guide d'achat, prix et points faibles", url: "https://classicdoctor.fr/guide-achat-renault-alpine-gta/" },
    { title: "CarJager – Guide d'achat Alpine d'occasion (juillet 2026)", url: "https://www.carjager.com/blog/article/guide-d-achat-alpine-d-occasion-modeles-cote-pieges-et-conseils-carjager.html" },
  ],
  models: [
    { make: "renault", model: "alpine-gta", label: "Renault Alpine GTA" },
    { make: "alpine", model: "a610", label: "Alpine A610" },
  ],
};
