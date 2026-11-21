import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 21/11/2026 (Que Choisir, L'argus, Selectra, Capcar, Roole, projet d'arrêté du ministère).
// Prix et aides : vérifier avant publication de mise à jour, ils changent souvent.
export const conversionE85: Dossier = {
  slug: "conversion-e85-superethanol-youngtimer",
  category: "pratique",
  title: "Passer à l'E85 : conversion au superéthanol, coût, et cas des youngtimers",
  seoTitle: "Conversion E85 : coût, démarches, et youngtimers éligibles",
  description:
    "Boîtier E85 homologué : qui peut convertir sa voiture, combien ça coûte, la carte grise, les économies réelles, et pourquoi la plupart des youngtimers d'avant 2001 sont exclues.",
  publishedAt: "2026-11-21",
  updatedAt: "2026-11-21",
  intro:
    "Avec un litre d'E85 autour de **0,90 €** contre plus de **2 €** pour le SP95-E10, la conversion au superéthanol fait de l'œil à beaucoup de propriétaires. Mais elle est très encadrée : boîtier homologué, installateur agréé, carte grise à modifier. Et pour une youngtimer, la question se pose surtout en termes d'âge et d'injection.",
  blocks: [
    { type: "h2", id: "cadre", text: "Ce que dit la loi" },
    {
      type: "p",
      text: "Depuis l'arrêté du **30 novembre 2017**, on peut convertir une voiture essence à l'E85 avec un **boîtier homologué**, posé par un installateur agréé par le fabricant du boîtier, puis déclaré sur la carte grise. Un arrêté de février 2021 a levé les limites de départ qui excluaient les voitures de plus de 14 à 15 CV et celles équipées d'un filtre à particules.",
    },
    {
      type: "facts",
      rows: [
        { label: "Véhicules concernés", value: "Voitures particulières et petits utilitaires essence, compatibles SP95-E10" },
        { label: "Norme minimale", value: "**Euro 3**, soit en pratique une première immatriculation après le 1er janvier 2001" },
        { label: "Pose", value: "Par un installateur agréé par le fabricant du boîtier" },
        { label: "Carte grise", value: "Code carburant **ES** remplacé par **FE**, à déclarer sur le site de l'ANTS dans le mois, pour 13,76 €" },
      ],
    },

    { type: "h2", id: "youngtimers", text: "Et ma youngtimer ?" },
    {
      type: "callout",
      tone: "warning",
      text: "Une voiture d'avant 2001 (non Euro 3) ou à carburateur **ne peut pas être convertie légalement** : aucun boîtier homologué n'existe pour elle. Le boîtier agit sur les injecteurs, il n'y a donc pas de solution homologuée pour un moteur à carburateur.",
    },
    {
      type: "p",
      text: "Les youngtimers des années 2000 à injection, en revanche, peuvent être éligibles si elles sont Euro 3 et compatibles E10 : c'est le cas de nombreuses voitures du début des années 2000. Vérifie la compatibilité de ton modèle auprès d'un installateur avant de te décider.",
    },
    {
      type: "p",
      text: "Sur les voitures plus anciennes, l'éthanol pose aussi des problèmes mécaniques : avant les années 2000, il attaque certains joints, durites et pompes, et les moteurs à carburateur le supportent mal. Ce n'est pas un hasard si la plupart des clubs conseillent l'essence la moins chargée en éthanol pour les anciennes.",
    },
    {
      type: "h3",
      id: "risques",
      text: "Les risques d'une conversion non homologuée",
    },
    {
      type: "list",
      items: [
        "Amende de **45 à 450 €** pour un dispositif non conforme, et de **90 à 750 €** pour une carte grise pas à jour",
        "Immobilisation et mise en fourrière possibles, et échec au contrôle technique",
        "L'assureur peut annuler le contrat et réclamer ce qu'il a payé aux tiers en cas de sinistre",
      ],
    },

    { type: "h2", id: "cout", text: "Combien ça coûte, combien ça rapporte" },
    {
      type: "table",
      head: ["Poste", "Montant", "Source"],
      rows: [
        ["Boîtier homologué et pose", "700 à 1 300 €", "Que Choisir, L'argus, Selectra"],
        ["Modification de la carte grise", "13,76 €", "Que Choisir"],
        ["Prix moyen de l'E85", "0,90 €/L", "Roole, 12 novembre 2026"],
        ["Prix moyen du SP95-E10", "2,025 €/L", "Roole, 12 novembre 2026"],
        ["Surconsommation", "15 à 25 %, jusqu'à 31,5 % en usage mixte selon une étude IFPEN/ADEME", "Que Choisir, Selectra"],
        ["Amortissement", "Environ 12 000 à 17 000 km", "Selectra"],
      ],
      caption: "Prix et surconsommation varient selon le véhicule et la conduite.",
    },
    {
      type: "p",
      text: "À 13 000 km par an, l'investissement est remboursé en un peu plus d'un an selon le calcul de Selectra. Pour une youngtimer qui roule peu, c'est beaucoup plus long : à 3 000 km par an, il faut plusieurs années pour rentrer dans ses frais.",
    },

    { type: "h2", id: "aides", text: "Aides et carte grise" },
    {
      type: "list",
      items: [
        "Exonération de la taxe régionale sur la carte grise : selon plusieurs sites spécialisés, plus aucune région ne l'accorde aux véhicules E85 en 2026. Vérifie auprès de ta région.",
        "Aides à la conversion : certaines régions en proposent ponctuellement, comme la Région Sud, avec un chèque de 250 € réservé aux foyers non imposables à l'automne 2026.",
        "Garantie : le fabricant du boîtier ou l'installateur garantit les pièces moteur prévues par l'arrêté. Le constructeur peut refuser la garantie d'une voiture modifiée.",
        "Pense à déclarer la modification à ton assureur.",
      ],
    },
  ],
  sources: [
    { title: "Que Choisir – Superéthanol E85 : vos questions, nos réponses (février 2026)", url: "https://www.quechoisir.org/decryptage-superethanol-e85-vos-questions-nos-reponses-n64115/" },
    { title: "L'argus – Boîtier E85 non homologué, carte grise pas à jour : que risquez-vous ?", url: "https://www.largus.fr/actualite-automobile/boitier-e85-non-homologue-carte-grise-pas-a-jour-que-risquez-vous-30024989.html" },
    { title: "Selectra – Superéthanol E85 : boîtier et économies (septembre 2026)", url: "https://selectra.info/energie/actualites/marche/superethanol-e85-boitier-economie-plein" },
    { title: "Roole – Prix des carburants le 12 novembre 2026", url: "https://media.roole.fr/quotidien/au-volant/prix-des-carburants-voici-les-tarifs-en-france-ce-jeudi-12-novembre-2026" },
    { title: "Capcar – Youngtimer et éthanol E85 (juillet 2026)", url: "https://www.capcar.fr/blog/youngtimer-ethanol-e85" },
    { title: "L'argus – La Région Sud offre 250 € pour la pose d'un kit E85 (septembre 2026)", url: "https://www.largus.fr/actualite-automobile/superethanol-e85-la-region-paca-offre-250-e-pour-la-pose-dun-kit-de-conversion-40007847.html" },
    { title: "Ministère de la Transition écologique – Projet d'arrêté sur les boîtiers de conversion E85", url: "https://www.consultations-publiques.developpement-durable.gouv.fr/IMG/pdf/projet_arrete_boitier_conversion_e85.pdf" },
    { title: "Carte-grise.org – Véhicules dits propres et taxe régionale", url: "https://www.carte-grise.org/vehicules-dits-propres.php" },
  ],
  models: [],
};
