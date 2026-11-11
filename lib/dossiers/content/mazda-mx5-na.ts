import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Automobile Sportive, Wikipédia, PassionYoungtimer, Capcar).
// Les prix sont des estimations de marché, pas une cote officielle.
export const mazdaMx5Na: Dossier = {
  slug: "mazda-mx-5-na-histoire-entretien-pannes-achat",
  category: "modele",
  title: "Mazda MX-5 NA : l'histoire, l'entretien, les pannes courantes et comment bien l'acheter",
  seoTitle: "Mazda MX-5 NA : histoire, entretien, pannes, prix et achat",
  description:
    "La MX-5 NA de 1989 à 1998 : 1.6 de 115 et 90 ch, 1.8 de 130 ch, séries spéciales françaises, entretien, pannes courantes, rouille et prix observés en 2026.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Phares escamotables, propulsion, moins d'une tonne et une boîte courte et précise : la première MX-5 a ressuscité le petit roadster à l'anglaise, avec la fiabilité japonaise en plus. Elle reste l'un des youngtimers les plus accessibles. Voici son histoire, son entretien, ses pannes courantes, et ce qu'il faut vérifier avant d'en acheter une.",
  blocks: [
    { type: "h2", id: "histoire", text: "1989 : le roadster revient" },
    {
      type: "p",
      text: "La MX-5 est dévoilée le **10 février 1989** au Salon de Chicago, au prix de 14 000 dollars. Elle arrive en France en **1990**, uniquement avec le 1.6 de **115 ch**, au prix de 139 900 francs. Le **1.8 de 130 ch** la rejoint en 1994, puis une version d'appel **1.6 de 90 ch** apparaît en 1995 et devient la seule motorisation jusqu'à la fin de la production, en **1998**.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1989 à 1998 (génération NA)" },
        { label: "Total", value: "**431 506** exemplaires (Automobile Sportive)" },
        { label: "Poids", value: "955 kg annoncés pour la 1.6 de 115 ch" },
        { label: "Séries spéciales en France", value: "« Cuir et bois » (1993, 120 ex.), Novamag (1996, 50 ex.), Jazz Festival (1997, 180 ex.)" },
      ],
    },

    { type: "h2", id: "versions", text: "1.6 ou 1.8 : quelles différences ?" },
    {
      type: "table",
      head: ["Version", "Puissance", "Années en France", "À savoir"],
      rows: [
        ["1.6 16 soupapes", "115 ch à 6 500 tr/min", "1990 à 1994", "La plus vive dans les tours, la plus répandue"],
        ["1.8 16 soupapes", "130 ch", "1994 à 1996", "Plus de couple, freins renforcés"],
        ["1.6 « d'appel »", "90 ch", "1995 à 1998", "Moins chère à l'achat, nettement moins vive"],
      ],
      caption: "D'après Automobile Sportive. Annoncée à 190 km/h et 10,7 s de 0 à 100 km/h pour la 1.6 de 115 ch.",
    },
    {
      type: "p",
      text: "Les puristes préfèrent la **1.6 de 115 ch**, légère et rageuse. La **1.8** est plus coupleuse et un peu plus rigide. La **90 ch** se repère à la carte grise : elle doit être moins chère qu'une 115 ch à état égal.",
    },

    { type: "h2", id: "entretien", text: "Entretien : les interventions clés" },
    {
      type: "table",
      head: ["Intervention", "Intervalle conseillé", "À savoir"],
      rows: [
        ["Courroie de distribution et pompe à eau", "Tous les 100 000 km ou environ 5 ans", "Une rupture immobilise la voiture et peut abîmer le moteur. Sans facture, à faire d'office"],
        ["Vidange moteur", "Tous les 10 000 km", "Contrôle le niveau entre deux vidanges : la consommation d'huile augmente avec l'âge"],
        ["Liquide de refroidissement et durites", "Tous les 2 à 3 ans", "Les durites d'origine ont plus de 25 ans"],
        ["Liquide de frein et d'embrayage", "Tous les 2 ans", "Un liquide ancien fatigue les joints, notamment ceux du récepteur d'embrayage"],
        ["Évacuations d'eau des bas de caisse", "Au moins une fois par an", "Deux petits trous devant les roues arrière : bouchés, ils font rouiller les longerons"],
      ],
      caption: "Intervalles indicatifs d'après Automobile Sportive et Capcar. Les procédures détaillées et les couples de serrage sont dans la revue technique du modèle.",
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Au changement de courroie, la vis de poulie de vilebrequin doit être serrée au bon couple.** Sur les 1.6 de 1990 et 1991, un mauvais serrage peut abîmer le nez de vilebrequin : c'est la panne la plus coûteuse de la MX-5 NA, souvent liée à une intervention mal faite.",
    },

    { type: "h2", id: "pannes", text: "Pannes courantes : symptôme, cause, solution" },
    {
      type: "table",
      head: ["Symptôme", "Cause probable", "Solution"],
      rows: [
        ["Poulie de vilebrequin qui oscille, bruit à l'avant du moteur (1.6 de 1990-1991)", "Nez de vilebrequin abîmé, clavette usée", "Réparation lourde, parfois moteur à changer : à faire chiffrer avant achat"],
        ["Ratés à l'accélération ou au ralenti", "Faisceaux d'allumage d'origine fatigués", "Remplacement des faisceaux et bougies, intervention simple"],
        ["Pédale d'embrayage molle, vitesses qui passent mal", "Récepteur d'embrayage qui fuit", "Remplacement du récepteur et purge"],
        ["Claquement de poussoirs au démarrage, qui disparaît à chaud", "Poussoirs hydrauliques, huile ancienne", "Vidange avec une huile de qualité ; s'il persiste à chaud, diagnostic plus poussé"],
        ["Fumée bleue, niveau d'huile qui baisse", "Joints de queues de soupapes ou segmentation", "Surveillance du niveau ; réfection si la consommation devient importante"],
        ["Eau sur la moquette après la pluie", "Capote ou joints fatigués, évacuations bouchées", "Débouchage des évacuations, joints ou capote à remplacer"],
      ],
      caption: "D'après Automobile Sportive, PassionYoungtimer et Capcar.",
    },

    { type: "h2", id: "achat", text: "Acheter une MX-5 NA : les points à vérifier" },
    {
      type: "callout",
      tone: "info",
      text: "**« Mieux vaut une auto moche aux longerons parfaits qu'une brillante aux caissons pourris »** (PassionYoungtimer). La rouille est le premier critère, bien avant la peinture ou le kilométrage.",
    },
    {
      type: "list",
      items: [
        "**Bas de caisse et longerons**, surtout devant les roues arrière : méfiance envers du mastic et une peinture fraîche",
        "Passages de roues arrière, bas d'ailes, pourtour des feux et plancher sous les tapis",
        "Capote : tissu, mécanisme et lunette arrière en plastique qui jaunit et se fend ; compte son remplacement dans le prix si elle est en fin de vie",
        "Hard-top : s'il est inclus, fais-le préciser par écrit dans le certificat de vente",
        "Anciennes voitures de drift : différentiel soudé, soubassement arrière marqué, caisse vrillée",
        "Imports japonais « Eunos » : vérifie la carte grise et le compteur (miles ou kilomètres)",
        "Phares escamotables : ils doivent se lever et se baisser franchement, des deux côtés",
        "Jeu de direction et silentblocs sur les voitures très kilométrées",
      ],
    },

    { type: "h2", id: "prix", text: "Combien coûte une MX-5 NA en 2026 ?" },
    {
      type: "table",
      head: ["État", "Prix observés", "Source"],
      rows: [
        ["Projet à restaurer ou rouillée", "3 000 à 5 000 €", "Capcar, juillet 2026"],
        ["D'usage, longerons sains", "4 000 à 7 000 €", "PassionYoungtimer, 2026"],
        ["Bel état, historique suivi", "8 000 à 15 000 €", "PassionYoungtimer et Capcar, 2026"],
        ["Exceptionnelle, faible kilométrage ou série limitée", "15 000 € et plus", "PassionYoungtimer et Capcar, 2026"],
      ],
      caption: "Estimations de marché, pas une cote officielle. Le 1.8 bien conservé et les séries spéciales se paient plus cher.",
    },
    {
      type: "p",
      text: "Suis le marché sur la [fiche MX-5](/modeles/mazda/mx-5), avec les prix observés, les annonces et l'alerte.",
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "[Revues techniques Mazda MX-5](https://www.autotitre.com/revue-technique/Mazda/MX-5/) : les éditions disponibles, pour les procédures et couples de serrage détaillés",
        "Note tes entretiens et coche ce qui a été remplacé dans [Mon Garage](/garage) : le carnet calcule les prochaines échéances",
        "Pour les pièces : les liens neufs et occasion de la [fiche MX-5](/modeles/mazda/mx-5#annonces)",
      ],
    },
  ],
  sources: [
    { title: "Automobile Sportive – Guide Mazda MX-5 NA", url: "https://www.automobile-sportive.com/guide/mazda/mx5na.php" },
    { title: "Wikipédia (miroir IPFS) – Mazda MX-5 (NA)", url: "https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Mazda_MX-5_(NA)" },
    { title: "PassionYoungtimer – Mazda MX-5 NA : cote et pièges", url: "https://www.passionyoungtimer.fr/fiche-mazda-mx5-na.html" },
    { title: "Capcar – Mazda MX-5 NA, la youngtimer plaisir", url: "https://www.capcar.fr/blog/mazda-mx5-na-youngtimer" },
  ],
  models: [{ make: "mazda", model: "mx-5", label: "Mazda MX-5" }],
};
