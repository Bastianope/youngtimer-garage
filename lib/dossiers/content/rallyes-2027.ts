import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 27/10/2026 : sites des organisateurs, offices de tourisme et presse (voir sources).
// Une date non publiée par l'organisateur reste « à confirmer ».
export const rallyes2027: Dossier = {
  slug: "grands-rallyes-voitures-de-collection-2027",
  category: "rallyes",
  title: "Les grands rallyes de voitures de collection et de sport en 2027",
  seoTitle: "Grands rallyes de voitures de collection 2027 : dates, parcours, budget",
  description:
    "Monte-Carlo Historique, Tour Auto, 1000 Miglia, Rallye des Princesses, Gumball 3000… Dates 2027, parcours, voitures admises et budget des grands rallyes.",
  publishedAt: "2026-10-27",
  updatedAt: "2026-10-27",
  intro:
    "Traverser l'Europe au volant d'une ancienne, enchaîner les cols au petit matin, finir sur le port de Monaco ou la place des Lices : les grands rallyes font rêver bien au-delà des équipages. Voici le calendrier 2027 des épreuves qui comptent, ce qu'il faut savoir pour y participer… et celles qui ouvrent leurs portes aux **youngtimers**.",
  blocks: [
    { type: "h2", id: "calendrier", text: "Le calendrier 2027 en un coup d'œil" },
    {
      type: "table",
      head: ["Rallye", "Dates 2027", "Parcours", "Voitures admises"],
      rows: [
        ["[Monte-Carlo Historique](#monte-carlo-historique)", "27 janv. → 3 févr.", "4 départs (Bad Homburg, Barcelone, Reims, Monaco) → Monaco", "Modèles ayant couru le Monte-Carlo (1911-1986)"],
        ["[Rallye Neige et Glace](#neige-et-glace)", "À confirmer (février)", "Doubs et Jura", "1946 à 1996"],
        ["[Tour Auto](#tour-auto)", "18 → 24 avril (annoncé, programme à venir)", "Départ de Paris", "1951 à 1984 (liste officielle), autres modèles sur décision du comité"],
        ["[Rallye des Princesses](#rallye-des-princesses)", "22 → 27 mai", "Paris → Sud de la France (2026 : Saint-Tropez)", "1946 à 1991, équipages féminins"],
        ["[1000 Miglia](#mille-miglia)", "24 → 29 mai", "Brescia → Rome → Brescia", "Modèles ayant couru l'épreuve (1927-1957)"],
        ["[Silvretta Classic](#silvretta-classic)", "À confirmer (juillet)", "Montafon (Autriche)", "Jusqu'en 2006"],
        ["[Modball Rally](#modball)", "À confirmer", "Londres → Barcelone", "Supercars, pas de règle d'âge"],
        ["[Tour de Corse Historique](#tour-de-corse-historique)", "À confirmer (octobre)", "Corse, au départ de Calvi en 2026", "VHC 1947-1987, régularité jusqu'en 1996"],
        ["[Gumball 3000](#gumball-3000)", "Octobre (jours à confirmer)", "Séoul → Tokyo", "Supercars, pas de règle d'âge"],
        ["[Peking to Paris](#peking-to-paris)", "4 juin → 16 juil. 2028", "Pékin → Paris, 12 pays", "Avant 1921 à 1985"],
      ],
      caption: "Dates vérifiées le 27 octobre 2026. « À confirmer » : l'organisateur n'a pas encore publié les dates 2027.",
    },
    {
      type: "callout",
      text: "**Compétition, régularité ou balade ?** En **compétition**, on chronomètre la vitesse sur circuit ou routes fermées. En **régularité**, il faut tenir une moyenne imposée, fixée par l'organisateur, et c'est la précision qui gagne : c'est la formule de la plupart des rallyes historiques. Les rallyes **« lifestyle »** comme le Gumball ou le Modball sont des convois festifs, sans classement de vitesse.",
    },

    { type: "h2", id: "monte-carlo-historique", text: "Rallye Monte-Carlo Historique" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Du 27 janvier au 3 février 2027 (29e édition)" },
        { label: "Départs", value: "Bad Homburg (Allemagne), Barcelone (Espagne), Reims (France) et Monaco" },
        { label: "Arrivée", value: "Port Hercule, Monaco, le 2 février au soir ; soirée de gala le 3" },
        { label: "Formule", value: "Régularité, avec des épreuves sur routes fermées" },
        { label: "Voitures", value: "Modèles ayant pris part au Rallye Automobile Monte-Carlo entre 1911 et 1986" },
        { label: "Budget", value: "Engagement 2027 non publié ; 6 800 € en 2026, soirée de gala comprise" },
        { label: "Organisateur", value: "[Automobile Club de Monaco](https://acm.mc/en/epreuves/rallye-monte-carlo-historique/)" },
      ],
    },
    {
      type: "p",
      text: "C'est le rendez-vous qui ouvre la saison, en plein hiver. Son principe est unique : seuls les modèles qui ont réellement disputé le Monte-Carlo sont admis, des voitures d'avant-guerre aux Groupe B. Les équipages partent de plusieurs villes d'Europe et convergent vers la Principauté par les routes de montagne de l'arrière-pays, souvent enneigées à cette saison. Pour savoir si ta voiture peut y prétendre, il faut que son modèle figure parmi les engagés d'une édition passée du Monte-Carlo.",
    },

    { type: "h2", id: "neige-et-glace", text: "Rallye Neige et Glace" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "À confirmer. En 2026 : du 14 au 18 février, à Malbuisson (Doubs)" },
        { label: "Formule", value: "Régularité sur routes enneigées du Doubs et du Jura" },
        { label: "Voitures", value: "Construites de 1946 à 1996 (règlement 2025)" },
        { label: "Organisateur", value: "Zoulou Racing Heritage" },
      ],
    },
    {
      type: "p",
      text: "Couru depuis 1953, c'est le rallye d'hiver de la « petite Sibérie » française. Avec une limite fixée à 1996, il fait partie des grandes épreuves **accessibles aux youngtimers** : une Peugeot 205 GTI, une Golf, une BMW E30 ou une Lancia Delta entrent dans la limite d'âge.",
    },

    { type: "h2", id: "tour-auto", text: "Tour Auto" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Du 18 au 24 avril 2027 d'après l'organisateur, rassemblement à Paris à partir du 20 ; programme détaillé à venir" },
        { label: "Parcours", value: "Départ de Paris. En 2026 : Grand Palais, château de Courances, Clermont-Ferrand, Pont du Gard, Toulouse, Pau, arrivée à Biarritz" },
        { label: "Formule", value: "Deux sections : Compétition (circuits et spéciales sur routes fermées) et Régularité (trois moyennes au choix)" },
        { label: "Voitures", value: "Modèles ayant couru ou marqué le Tour de France Automobile entre 1951 et 1984, d'après une liste officielle ; un modèle hors liste peut être admis sur décision du comité" },
        { label: "Organisateur", value: "[Peter Auto](https://www.peterauto.fr/en/events/tour-auto)" },
      ],
    },
    {
      type: "p",
      text: "Héritier du Tour de France Automobile, le Tour Auto mélange circuits (Magny-Cours, Albi, Pau-Arnos, Nogaro en 2026), spéciales et grandes routes de France. Environ 240 équipages y participent. Sans être engagé, on peut en profiter au bord des routes et dans les villes étapes, ou lors de l'exposition des voitures organisée à Paris avant le départ (au Grand Palais en 2026).",
    },

    { type: "h2", id: "rallye-des-princesses", text: "Rallye des Princesses Richard Mille" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Du 22 au 27 mai 2027" },
        { label: "Parcours", value: "Parcours 2027 à confirmer. En 2026 : Paris → Troyes → Vichy → Aix-les-Bains → Nîmes → Saint-Tropez, plus de 1 600 km" },
        { label: "Formule", value: "Régularité sur routes ouvertes, 100 % féminin, 80 à 100 équipages" },
        { label: "Voitures", value: "Construites entre 1946 et 1991, sur sélection" },
        { label: "Organisateur", value: "[Peter Auto](https://www.peterauto.fr/en/events/rallye-des-princesses-richard-mille/)" },
      ],
    },
    {
      type: "p",
      text: "Depuis plus de vingt ans, c'est le grand rallye de régularité réservé aux équipages féminins, entre Paris et la Riviera. Avec une limite à 1991, une Mercedes SL R107 ou une Porsche 911 de l'époque entrent dans les critères d'âge, sous réserve de sélection.",
    },

    { type: "h2", id: "mille-miglia", text: "1000 Miglia : l'édition du centenaire" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Du 24 au 29 mai 2027" },
        { label: "Parcours", value: "Boucle Brescia → Rome → Brescia dans le sens de 1927 : Parme, Reggio Emilia, cols de la Raticosa et de la Futa, Florence, Sienne, Rome, Pérouse…" },
        { label: "Formule", value: "Régularité" },
        { label: "Voitures", value: "Modèles ayant couru (ou s'étant inscrits) à la 1000 Miglia historique entre 1927 et 1957" },
        { label: "Budget", value: "Engagement 2027 non publié ; en 2025, de 8 300 € HT à 18 000 € HT selon la formule (hors formule Platinum), plus l'inscription de la voiture au registre" },
        { label: "Organisateur", value: "[1000 Miglia](https://1000miglia.it)" },
      ],
    },
    {
      type: "p",
      text: "« La plus belle course du monde », disait Enzo Ferrari. En 2027, la 1000 Miglia fête ses cent ans en reprenant le tracé de la première édition. Elle est réservée aux voitures d'avant 1958, mais le spectacle se vit au bord de la route : les villages italiens traversés sont en fête au passage des concurrents.",
    },

    { type: "h2", id: "silvretta-classic", text: "Silvretta Classic Rallye Montafon" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "À confirmer. En 2026 : du 9 au 11 juillet (28e édition)" },
        { label: "Parcours", value: "Vallée du Montafon (Vorarlberg, Autriche), départ de Partenen, arrivée à Schruns en 2026" },
        { label: "Formule", value: "Régularité, environ 180 équipages" },
        { label: "Voitures", value: "Construites jusqu'en 2006 : **ouvert aux youngtimers**" },
        { label: "Organisateurs", value: "Motor Presse Stuttgart et [Montafon Tourismus](https://www.montafon.at/en/silvretta-classic-rallye-montafon_vc12258)" },
      ],
    },
    {
      type: "p",
      text: "Un rallye de régularité dans les cols alpins, autour de la route de haute montagne de la Silvretta. Sa limite à 2006 en fait l'un des rares grands rallyes européens ouverts aux youngtimers récents : une BMW E46, une Porsche Boxster 986 ou une Mercedes SLK R170 peuvent s'y engager.",
    },

    { type: "h2", id: "modball", text: "Modball Rally" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "À confirmer (format de 7 jours et 7 étapes)" },
        { label: "Parcours 2027", value: "Londres → Paris → Genève → les Alpes → Monaco → Marseille → Barcelone" },
        { label: "Formule", value: "Road trip festif, sans chronomètre ni classement de vitesse" },
        { label: "Voitures", value: "Surtout des supercars et des voitures préparées, sans règle d'âge" },
        { label: "Organisateur", value: "[Modball](https://www.modball.com)" },
      ],
    },
    {
      type: "p",
      text: "Né en 2007, le Modball fête ses vingt ans en 2027. Comme le Gumball, c'est un convoi « lifestyle » : on vient pour l'ambiance, les étapes et les voitures, pas pour le chrono.",
    },

    { type: "h2", id: "tour-de-corse-historique", text: "Tour de Corse Historique" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "À confirmer. En 2026 : du 3 au 10 octobre (26e édition), au départ de Calvi" },
        { label: "Formule", value: "Compétition VHC et régularité VHRS (quatre moyennes)" },
        { label: "Voitures", value: "VHC de 1947 à 1987 avec PTH, Classic 1977-1990, J2 1988-1992 ; régularité jusqu'au 31 décembre 1996" },
        { label: "Site", value: "[tourdecorse-historique.fr](https://www.tourdecorse-historique.fr)" },
      ],
    },
    {
      type: "p",
      text: "Les routes du « rallye des 10 000 virages », mythique manche du championnat du monde. Avec une régularité ouverte jusqu'à 1996, c'est l'un des grands rallyes français ouverts aux youngtimers des années 90.",
    },

    { type: "h2", id: "gumball-3000", text: "Gumball 3000" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Octobre 2027, jours à confirmer" },
        { label: "Parcours", value: "Séoul (Corée du Sud) → Tokyo (Japon), étapes intermédiaires pas encore fixées. En 2026 : Miami → Mexico" },
        { label: "Formule", value: "Convoi de supercars, de célébrités et de soirées : « a rally, not a race »" },
        { label: "Budget", value: "Non publié, communiqué aux seuls candidats retenus" },
      ],
    },
    {
      type: "p",
      text: "Créé en 1999 par Maximillion Cooper, le Gumball est devenu le rallye de la culture pop. On n'y vient pas en youngtimer : c'est un spectacle à part, entre supercars, musique et culture pop.",
    },

    { type: "h2", id: "peking-to-paris", text: "Peking to Paris : à préparer pour 2028" },
    {
      type: "facts",
      rows: [
        { label: "Dates", value: "Du 4 juin au 16 juillet 2028 (10e édition, complet, liste d'attente)" },
        { label: "Parcours", value: "Grande Muraille de Chine → Paris, environ 17 500 km et 12 pays, dont la Mongolie, le Kazakhstan, la Géorgie, la Turquie et l'Italie" },
        { label: "Formule", value: "Rallye d'endurance de six semaines" },
        { label: "Voitures", value: "Des pionnières d'avant 1921 aux « Modern Classics » de 1976 à 1985" },
        { label: "Organisateur", value: "[HERO-ERA](https://www.hero-era.com/rallies/2028/06/peking-to-paris-2028)" },
      ],
    },
    {
      type: "p",
      text: "Il n'y a pas d'édition en 2027 : la prochaine traversée part en juin 2028. Elle refait le raid Pékin-Paris de 1907, l'aventure automobile ultime. La catégorie 1976-1985 ouvre la porte aux premiers youngtimers… à condition d'avoir six semaines et une préparation mécanique sérieuse.",
    },

    { type: "h2", id: "youngtimers", text: "Quels rallyes avec un youngtimer ?" },
    {
      type: "p",
      text: "La plupart des grands rallyes historiques s'arrêtent aux voitures des années 70 ou 80. Pour une voiture des années 90 ou 2000, les portes ouvertes sont :",
    },
    {
      type: "list",
      items: [
        "**Silvretta Classic** : voitures construites jusqu'en 2006.",
        "**Tour de Corse Historique** : régularité jusqu'en 1996.",
        "**Rallye Neige et Glace** : jusqu'en 1996.",
        "**Rallye des Princesses** : jusqu'en 1991, équipages féminins.",
        "**Monte-Carlo Historique** : jusqu'en 1986, à condition que le modèle ait couru le Monte-Carlo.",
      ],
    },
    {
      type: "p",
      text: "Pour se lancer, les rallyes de régularité régionaux et les sorties de clubs restent la meilleure école. Retrouve les prochains rendez-vous près de chez toi sur la [carte des rassemblements](/explorer/rassemblements), et prépare ta voiture avec les liens pièces de sa [fiche modèle](/modeles).",
    },
    {
      type: "callout",
      tone: "warning",
      text: "Dates et conditions évoluent : vérifie toujours le règlement sur le site de l'organisateur avant de t'engager. Ce dossier est mis à jour au fil des annonces.",
    },
  ],
  sources: [
    { title: "ACM – Rallye Monte-Carlo Historique", url: "https://acm.mc/en/epreuves/rallye-monte-carlo-historique/" },
    { title: "Visit Monaco – Rallye Monte-Carlo Historique 2027", url: "https://www.visitmonaco.com/en/events/monaco-s-major-events/rallye-monte-carlo-historique" },
    { title: "Côte d'Azur France – 29e Rallye Monte-Carlo Historique", url: "https://cotedazurfrance.fr/offres/29e-rallye-monte-carlo-historique-monaco-fr-2979071/" },
    { title: "Monaco Tribune – Le Monte-Carlo Historique 2026 révolutionne ses codes", url: "https://www.monaco-tribune.com/2025/09/le-rallye-monte-carlo-historique-2026-revolutionne-ses-codes/" },
    { title: "HelloMonaco – Monte-Carlo Historique 2026, routes fermées", url: "https://www.hellomonaco.com/news/latest-news/closed-roads-open-legends-guess-how-monte-carlo-historique-has-geared-up-for-a-radical-2026/" },
    { title: "Peter Auto – Tour Auto, parcours", url: "https://www.peterauto.fr/en/events/tour-auto/route" },
    { title: "Peter Auto – Tour Auto, catégories", url: "https://www.peterauto.fr/en/events/tour-auto/category" },
    { title: "Peter Auto – Tour Auto, modèles éligibles", url: "https://www.peterauto.fr/en/events/tour-auto/eligible-models" },
    { title: "Motor1 – Tour Auto 2026, de Paris à Biarritz", url: "https://fr.motor1.com/news/794746/tour-auto-2026-paris-biarritz-grand-palais/" },
    { title: "Peter Auto – Rallye des Princesses Richard Mille", url: "https://www.peterauto.fr/en/events/rallye-des-princesses-richard-mille/" },
    { title: "Peter Auto – Rallye des Princesses, voitures éligibles", url: "https://www.peterauto.fr/en/events/rallye-des-princesses-richard-mille/eligible-types" },
    { title: "Saint-Tropez Tourisme – Rallye des Princesses", url: "https://www.sainttropeztourisme.com/en/fiche/princess-rally-7307977/" },
    { title: "1000 Miglia – site officiel", url: "https://1000miglia.it" },
    { title: "QN Motori – 1000 Miglia 2027, le parcours", url: "https://motori.quotidiano.net/varie/curiosita/1000-miglia-2027-percorso.htm" },
    { title: "1000 Miglia – voitures éligibles", url: "https://1000miglia.it/en/events/1000-miglia/1000-miglia-2020/eligible-cars/" },
    { title: "Motor1 Italia – 1000 Miglia 2025, inscriptions", url: "https://it.motor1.com/news/740045/1000-miglia-2025-iscrizioni/" },
    { title: "Lifted Asia – Gumball 3000 Asia 2027", url: "https://liftedasia.com/article/gumball-3000-asia-2027" },
    { title: "Wikipedia – Gumball 3000", url: "https://en.wikipedia.org/wiki/Gumball_3000" },
    { title: "HERO-ERA – Peking to Paris 2028", url: "https://www.hero-era.com/rallies/2028/06/peking-to-paris-2028" },
    { title: "Magneto – 10e édition du Peking to Paris en 2028", url: "https://www.magnetomagazine.com/articles/hero-era-launches-tenth-edition-of-peking-to-paris-motor-challenge-for-2028/" },
    { title: "Montafon Tourismus – Silvretta Classic Rallye Montafon", url: "https://www.montafon.at/en/silvretta-classic-rallye-montafon_vc12258" },
    { title: "Vol.at – Silvretta Classic 2026", url: "https://www.vol.at/neue-routen-grosse-namen-180-oldtimer-bei-der-silvretta-classic/10302416" },
    { title: "Modball – parcours 2027", url: "https://www.modball.com/news/blog-post-title-two-t5my5-k4xmd-67jzh-y4bh8" },
    { title: "Wikipedia – Modball", url: "https://en.wikipedia.org/wiki/Modball" },
    { title: "Visit Corsica – Tour de Corse Historique", url: "https://www.visit-corsica.com/fr/Mon-sejour/Manifestations/Toutes-les-manifestations/RALLYE-TOUR-DE-CORSE-HISTORIQUE" },
    { title: "Racecar.com – Tour de Corse Historique 2026", url: "https://www.racecar.com/news/102954/motorsport/tour-de-corse-historique-2026-october-3-10.-2025-video" },
    { title: "Rally Copilot – Rallye Neige et Glace 2026", url: "https://www.rallycopilot.com/en/event/rallye-neige-et-glace-zoulou-racing-heritage-2026" },
    { title: "Macommune.info – Rallye Neige et Glace", url: "https://www.macommune.info/rallye-neige-et-glace-2025-les-inscriptions-sont-encore-ouvertes" },
  ],
  models: [],
};
