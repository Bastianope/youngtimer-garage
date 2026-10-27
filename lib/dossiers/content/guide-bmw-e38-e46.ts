import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 27/10/2026 (Wikipedia, BMW Group Classic, Motor1, guides d'achat spécialisés, annonces).
// Les prix sont des prix de marché observés, pas une cote officielle.
export const guideBmwE38E46: Dossier = {
  slug: "guide-achat-bmw-e38-e46",
  category: "guide-achat",
  title: "Guide d'achat BMW E38 et E46 : moteurs, défauts connus, prix",
  seoTitle: "BMW E38 et E46 : guide d'achat, défauts connus et prix 2026",
  description:
    "Série 7 E38 (1994-2001) et Série 3 E46 (1998-2006) : versions, moteurs, défauts à vérifier (chaîne de distribution, Nikasil, fissures du train arrière, refroidissement) et prix observés.",
  publishedAt: "2026-10-27",
  updatedAt: "2026-10-27",
  intro:
    "Deux BMW qui font aujourd'hui le pont entre occasion et youngtimer : la **Série 7 E38**, grande routière de prestige, et la **Série 3 E46**, la propulsion de référence du début des années 2000, jusqu'à la M3 CSL. Leurs prix restent accessibles, à condition de savoir quoi vérifier.",
  blocks: [
    { type: "h2", id: "e38", text: "BMW Série 7 E38 (1994-2001)" },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "Avril 1994 au 27 juillet 2001 ; dévoilée en février 1994" },
        { label: "Restylage", value: "Septembre 1998 (millésime 1999)" },
        { label: "Carrosseries", value: "Berline en empattement court (i), long (iL) et L7 (899 exemplaires), plus des versions blindées" },
        { label: "Total", value: "Environ 330 000 à 340 000 exemplaires selon les sources" },
        { label: "Innovations", value: "Navigation GPS et airbags rideaux proposés ; premier diesel de la Série 7 ; dernière Série 7 disponible en boîte manuelle" },
      ],
    },
    { type: "h3", id: "e38-moteurs", text: "Les moteurs" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Années"],
      rows: [
        ["728i", "6 cylindres en ligne 2,8 l (M52)", "193 ch", "1995 à 2001"],
        ["730i", "V8 3,0 l (M60)", "218 ch", "1994 à 1996"],
        ["735i", "V8 3,5 l (M62)", "235 puis 238 ch", "1996 à 2001"],
        ["**740i**", "V8 4,0 l (M60), puis 4,4 l (M62)", "286 ch", "1994 à 2001"],
        ["**750i**", "V12 5,4 l (M73)", "326 ch", "1995 à 2001"],
        ["725tds", "6 cylindres turbodiesel 2,5 l (M51)", "143 ch", "1996 à 2001"],
        ["730d", "6 cylindres diesel 2,9 l (M57)", "193 ch", "1998 à 2001"],
        ["740d", "V8 biturbo diesel 3,9 l (M67)", "245 ch", "1999 à 2001"],
      ],
      caption: "Boîte automatique ZF 5 rapports sur toutes les versions ; boîte manuelle possible sur 725tds, 728i, 730i, 735i et 740i.",
    },
    { type: "h3", id: "e38-defauts", text: "Les points à vérifier" },
    {
      type: "list",
      items: [
        "**Refroidissement** : pompe à eau à turbine plastique, thermostat, radiateur et vase d'expansion en plastique qui se fendent avec l'âge. À traiter en préventif.",
        "**Chaîne de distribution des V8 M62** (735i, 740i à partir de 1996) : les patins en plastique s'usent ou cassent, souvent entre 160 000 et 320 000 km. Un saut de chaîne peut détruire le moteur, et le remplacement impose de déposer la face avant.",
        "**Nikasil** : les premiers V8 M60 (1994-1996) ont des chemises traitées au Nikasil, sensibles à l'essence soufrée de l'époque. Un test de compression est indispensable, et demande les factures d'éventuels travaux moteur.",
        "**Pixels manquants** sur l'écran du combiné d'instruments : défaut courant, souvent réparable par une soudure.",
        "**Suspension** : correcteur d'assiette pneumatique arrière (soufflets, compresseur), amortisseurs pilotés EDC coûteux, et tirants avant usés qui provoquent un shimmy vers 80 km/h.",
        "**Électronique** : module GM5 (verrouillage, vitres), papillon motorisé, xénon, climatisation.",
        "**750i V12** : réputé fiable, mais chaque intervention coûte cher dans un compartiment moteur très chargé. Compte environ 14 l/100 km, plus de 20 en ville.",
      ],
    },
    {
      type: "table",
      head: ["Version", "Prix observés", "Source"],
      rows: [
        ["740i de 1995, 170 000 km", "9 800 € demandés", "Leboncoin, octobre 2026"],
        ["740i, annonces européennes", "13 900 à 27 000 €", "Classic Trader, annonces récentes y compris expirées, octobre 2026"],
        ["750i et 750iL, annonces européennes", "6 500 à 34 000 €", "Classic Trader, annonces récentes y compris expirées, octobre 2026"],
        ["740d (266 000 à 340 000 km)", "13 000 à 14 990 € demandés", "Leboncoin, octobre 2026"],
      ],
      caption: "Prix demandés, pas une cote officielle. Un V8 sans historique de distribution vaut nettement moins qu'un exemplaire suivi.",
    },
    {
      type: "p",
      text: "Prix observés, alertes et liens pièces : voir la [fiche Série 7 E38](/modeles/bmw/serie-7-e38).",
    },

    { type: "h2", id: "e46", text: "BMW Série 3 E46 (1998-2006)" },
    {
      type: "table",
      head: ["Carrosserie", "Production", "Exemplaires"],
      rows: [
        ["Berline", "décembre 1997 à mai 2005", "1 918 984"],
        ["Touring", "janvier 1999 à mai 2005", "428 061"],
        ["Coupé", "décembre 1998 à mai 2006", "443 264"],
        ["Cabriolet", "décembre 1999 à novembre 2006", "277 146"],
        ["Compact", "avril 2000 à décembre 2004", "199 430"],
      ],
      caption: "Restylage en septembre 2001 (berline, Touring, Compact) et en mars 2003 (coupé, cabriolet). La M3 n'a pas été restylée.",
    },
    { type: "h3", id: "e46-moteurs", text: "Les moteurs à retenir" },
    {
      type: "table",
      head: ["Version", "Moteur", "Puissance", "Années"],
      rows: [
        ["320i", "6 cylindres 2,0 l (M52TU) puis 2,2 l (M54)", "150 puis 170 ch", "1998 à 2006"],
        ["325i", "6 cylindres 2,5 l (M54)", "192 ch", "2001 à 2006"],
        ["**330i**", "6 cylindres 3,0 l (M54)", "231 ch", "2000 à 2006"],
        ["**320d**", "4 cylindres diesel (M47 puis M47TU)", "136 puis 150 ch", "1998 à 2006"],
        ["330d", "6 cylindres diesel (M57 puis M57TU)", "184 puis 204 ch", "1999 à 2005"],
        ["**M3**", "6 cylindres 3,2 l (S54)", "343 ch", "2000 à 2006"],
        ["**M3 CSL**", "6 cylindres 3,2 l (S54)", "360 ch, 370 Nm", "2003-2004, 1 383 exemplaires"],
      ],
    },
    {
      type: "p",
      text: "La **M3 CSL** est la pièce de collection de la famille : boîte SMG uniquement, toit en carbone, jantes de 19 pouces, et un poids allégé par rapport à la M3 (l'écart annoncé varie selon les sources, d'environ 110 à 185 kg).",
    },
    { type: "h3", id: "e46-defauts", text: "Les points à vérifier" },
    {
      type: "callout",
      tone: "warning",
      text: "**Fissures du plancher au niveau du train arrière** : la tôle qui porte les ancrages du berceau arrière peut se fissurer, sur toutes les carrosseries. Les M3, 330i et 328i sont les plus exposées. BMW a renforcé la pièce au restylage, mais des voitures restylées sont aussi touchées. Une réparation peut coûter plus que la voiture : fais inspecter le dessous sur pont avant d'acheter.",
    },
    {
      type: "list",
      items: [
        "**Refroidissement** : vase d'expansion, pompe à eau à axe plastique, radiateur, durites et boîtier de thermostat. Remplacement préventif conseillé tous les 100 000 à 120 000 km.",
        "**VANOS** des six-cylindres : joints à refaire vers 150 000 km.",
        "**Lève-vitres** avant et module GM5.",
        "**320d (M47)** : turbo, vanne EGR, injecteurs, volant moteur bimasse, et volets d'admission qui peuvent se détacher et être aspirés par le moteur sur les versions 150 ch.",
        "**Six-cylindres essence M54** : consommation d'huile (jusqu'à 1 l pour 1 000 km), recyclage des gaz de carter, bobines, débitmètre.",
        "**4 cylindres essence N42 et N46** (316i et 318i après 2001) : tendeur et patins de chaîne de distribution, Valvetronic.",
        "**M3** : coussinets du moteur S54 (défaillances sur les premiers moteurs, prises en charge par BMW sous garantie ; remplacement préventif conseillé sans justificatif), vis de VANOS, pompe et embrayage SMG, plancher de coffre fissuré.",
      ],
    },
    {
      type: "table",
      head: ["Version", "Prix observés", "Source"],
      rows: [
        ["320d", "3 000 à 7 000 € (forts kilométrages)", "Autocopilot, mai 2026"],
        ["330i", "5 000 à 10 000 € ; annonces le plus souvent entre 6 500 et 12 000 €", "Autocopilot (mai 2026), Leboncoin (octobre 2026)"],
        ["Cabriolet", "5 000 à 12 000 € ; annonces de 7 900 à 17 690 €", "Autocopilot, Leboncoin"],
        ["M3", "25 000 à 55 000 € selon l'état et le kilométrage", "Autocopilot, Pause Moto (août 2026), Le Parking"],
        ["M3 CSL", "80 000 à 150 000 € ; une annonce à 114 990 € (88 000 km)", "Autocopilot (mai 2026), Le Parking (juillet 2026)"],
      ],
      caption: "Prix demandés et estimations agrégées, pas une cote officielle.",
    },
    {
      type: "p",
      text: "Prix observés, alertes et liens pièces : voir la [fiche Série 3 E46](/modeles/bmw/serie-3-e46).",
    },

    { type: "h2", id: "lequel", text: "E38 ou E46 : laquelle choisir ?" },
    {
      type: "list",
      items: [
        "**Pour le grand tourisme et le prestige à petit prix** : une E38 728i ou 740i bien suivie. Prévois un budget d'entretien sérieux, surtout sur les V8 et le V12.",
        "**Pour un youngtimer à rouler tous les jours** : une E46 330i ou 320d saine, le dessous vérifié.",
        "**Pour la collection** : une M3, et à plus forte raison une CSL, dont les prix jouent dans une autre catégorie.",
      ],
    },

    { type: "h2", id: "ressources", text: "Clubs et ressources" },
    {
      type: "list",
      items: [
        "[e38.org](https://www.e38.org) : la référence (en anglais) pour les tutoriels E38, recommandée par le registre E38",
        "[E38 Registry](https://www.e38registry.org/links-resources/) : liens vers les forums E38 dans plusieurs pays",
        "[Forums Autotitre Série 7](https://www.autotitre.com/forum/BMW/S%C3%A9rie_7/) et [Série 3](https://www.autotitre.com/forum/BMW/S%C3%A9rie_3/)",
        "[Avis de propriétaires E38 sur Caradisiac](https://www.caradisiac.com/avis--modele--bmw-serie-7-e38/7f9072719877d44e2ac66a16541c53ad/)",
      ],
    },
  ],
  sources: [
    { title: "Wikipedia – BMW 7 Series (E38)", url: "https://en.wikipedia.org/wiki/BMW_7_Series_(E38)" },
    { title: "Motor1 – Histoire de la BMW Série 7 E38", url: "https://www.motor1.com/news/742403/bmw-7-series-e38-history/" },
    { title: "BMW Group Classic – BMW 7 Series Sedan (E38)", url: "https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-545-1.bmw-7-series-sedan-e38.html" },
    { title: "Drives.today – Buyer's guide BMW 740i E38", url: "https://drives.today/posts/330/buyers-guide/bmw-740i-e38/elizabeth-de-latour.html" },
    { title: "Europremiumparts – Fiabilité BMW Série 7 E38", url: "https://europremiumparts.com/en-pl/blogs/bmw-buying-guides/bmw-7-series-e38-reliability-guide-everything-you-need-to-know-before-buying" },
    { title: "BMWTuning – Problèmes du moteur M62", url: "https://bmwtuning.co/bmw-m62-engine-problems/" },
    { title: "Auto Bild – BMW 750i E38 V12", url: "https://www.autobild.de/artikel/bmw-750i-e38-1998-v12-verbrauch-motor-daten-16039641.html" },
    { title: "Classic Trader – Annonces BMW Série 7 E38", url: "https://www.classic-trader.com/fr/voitures/recherche/bmw/serie-7/e38" },
    { title: "Leboncoin – BMW 740d", url: "https://www.leboncoin.fr/ck/voitures/740d" },
    { title: "Wikipedia – BMW 3 Series (E46)", url: "https://en.wikipedia.org/wiki/BMW_3_Series_(E46)" },
    { title: "BMWTuning – Fissures du berceau arrière E46", url: "https://bmwtuning.co/bmw-e46-subframe-cracks/" },
    { title: "Euro Racing Parts – Guide d'achat et fiabilité BMW Série 3 E46", url: "https://www.euroracingparts.fr/en/blogs/guide-dachat-pour-bmw/guide-dachat-fiabilite-de-la-bmw-serie-3-e46-en-occasion" },
    { title: "Fiches-auto – Essai BMW Série 3 E46", url: "https://www.fiches-auto.fr/essai-bmw/essai-44-test-complet-bmw-serie-3.php" },
    { title: "Turner Motorsport – E46 Buyer's Guide", url: "https://www.turnermotorsport.com/t-BMW_E46_Buyers_Guide" },
    { title: "PistonHeads – BMW M3 E46 used buying guide", url: "https://www.pistonheads.com/features/ph-buying-guides/bmw-m3-e46--ph-used-buying-guide/25931" },
    { title: "Europremiumparts – Fiabilité BMW M3 E46", url: "https://europremiumparts.com/en-gb/blogs/bmw-buying-guides/bmw-m3-e46-reliability-guide-everything-you-need-to-know-before-buying" },
    { title: "Supercar Nostalgia – BMW E46 M3 CSL", url: "https://supercarnostalgia.com/blog/bmw-e46-m3-csl" },
    { title: "Autocopilot – BMW Série 3 E46, prix", url: "https://autocopilot.fr/modeles/bmw-serie-3-e46" },
    { title: "Pause Moto – Prix BMW M3 E46", url: "https://pausemoto.fr/bmw-m3-e46-prix/" },
    { title: "Le Parking – BMW M3 E46 d'occasion", url: "https://www.leparking.fr/voiture-occasion/bmw-m3-e46.html" },
    { title: "Leboncoin – BMW 330i E46", url: "https://www.leboncoin.fr/ck/voitures/bmw-330i-e46" },
    { title: "E38 Registry – Liens et ressources", url: "https://www.e38registry.org/links-resources/" },
  ],
  models: [
    { make: "bmw", model: "serie-7-e38", label: "BMW Série 7 E38" },
    { make: "bmw", model: "serie-3-e46", label: "BMW Série 3 E46" },
  ],
};
