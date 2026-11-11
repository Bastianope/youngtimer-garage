import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 11/11/2026 (Capcar 05/07/2026, Groupama, Assurland 17/12/2025).
// Les tarifs sont des ordres de grandeur publiés, pas des devis : chaque contrat dépend du profil et du véhicule.
export const assuranceYoungtimer: Dossier = {
  slug: "assurance-youngtimer-collection-contrats-conditions",
  category: "pratique",
  title: "Assurer un youngtimer : contrat classique ou collection, conditions, valeur agréée et prix",
  seoTitle: "Assurance youngtimer 2026 : conditions, valeur agréée et prix",
  description:
    "Assurer un youngtimer en 2026 : contrat classique ou spécialisé, conditions (âge, kilométrage, voiture principale), valeur agréée, garanties utiles et prix indicatifs.",
  publishedAt: "2026-11-11",
  updatedAt: "2026-11-11",
  intro:
    "Une voiture de 25 ans assurée comme une voiture de tous les jours est souvent mal couverte : en cas de vol ou de sinistre total, l'assureur rembourse sa valeur d'occasion, parfois très loin de son prix réel sur le marché des passionnés. Les contrats spécialisés corrigent ce problème, en échange de quelques conditions. Voici comment choisir.",
  blocks: [
    { type: "h2", id: "contrats", text: "Contrat classique ou contrat spécialisé ?" },
    {
      type: "table",
      head: ["", "Contrat auto classique", "Contrat youngtimer ou collection"],
      rows: [
        ["Pour qui", "Toute voiture", "Généralement à partir de 20 ans, parfois 15 ; les contrats « collection » au sens strict visent les voitures de 30 ans et plus"],
        ["Indemnisation en cas de vol ou de perte totale", "Valeur vénale ou valeur à dire d'expert, décote comprise", "Souvent **valeur agréée**, fixée à l'avance avec l'assureur"],
        ["Usage", "Libre", "Usage loisir : voiture secondaire, kilométrage limité"],
        ["Prix", "Selon le profil", "Souvent plus bas à garanties comparables, grâce au faible usage"],
      ],
      caption: "D'après Capcar (juillet 2026), Groupama et Assurland.",
    },

    { type: "h2", id: "valeur-agreee", text: "La valeur agréée, la clé du contrat" },
    {
      type: "p",
      text: "Avec un contrat classique, l'indemnisation suit la **valeur à dire d'expert**, décote comprise. Pour une 205 GTI ou une MX-5 NA bien entretenue, elle peut être très inférieure au prix payé. La **valeur agréée** fixe à l'avance, avec l'assureur, le montant garanti. En cas de vol ou de perte totale, c'est ce montant qui sert de base à l'indemnisation.",
    },
    {
      type: "list",
      items: [
        "Elle se fixe généralement sur **expertise** ou sur un rapport d'état récent, avec photos",
        "Les **factures d'entretien et de restauration** aident à la justifier : garde-les toutes",
        "Elle doit être **réévaluée** régulièrement si la cote du modèle monte",
      ],
    },
    {
      type: "callout",
      tone: "info",
      text: "Les factures et photos rangées dans le carnet de [Mon Garage](/garage) font un dossier tout prêt pour demander une valeur agréée, et pour la faire réévaluer plus tard.",
    },

    { type: "h2", id: "conditions", text: "Les conditions habituelles" },
    {
      type: "list",
      items: [
        "**Âge du véhicule** : 20 ans minimum chez la plupart des assureurs spécialisés, parfois 15 (Capcar)",
        "**Âge et expérience du conducteur** : souvent 21 ou 25 ans minimum, avec plusieurs années de permis",
        "**Voiture principale** : presque toujours, il faut posséder une autre voiture pour le quotidien",
        "**Kilométrage limité** : souvent 5 000 à 8 000 km par an",
        "**Stationnement** : garage fermé parfois exigé pour les modèles les plus recherchés",
        "**État d'origine** : une voiture très modifiée peut être refusée ou moins bien couverte",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Déclare un kilométrage réaliste.** Le dépasser peut réduire, voire annuler, l'indemnisation en cas de sinistre (Capcar). Le carnet d'entretien et les procès-verbaux de contrôle technique gardent une trace du kilométrage réel.",
    },
    {
      type: "p",
      text: "La **carte grise de collection** n'est pas toujours exigée pour un contrat en valeur agréée (Groupama), mais elle l'est souvent pour les contrats « collection » au sens strict. Voir notre [guide de la carte grise de collection](/dossiers/carte-grise-collection-conditions-demarches-avantages).",
    },

    { type: "h2", id: "garanties", text: "Les garanties utiles" },
    {
      type: "table",
      head: ["Garantie", "Utile pour un youngtimer ?", "Pourquoi"],
      rows: [
        ["Responsabilité civile", "Obligatoire", "Couvre les dommages causés aux autres, pas ta voiture"],
        ["Vol et incendie", "Oui", "Les modèles recherchés sont des cibles, les pièces aussi"],
        ["Assistance dès 0 km", "Oui", "Une panne devant chez toi doit être couverte"],
        ["Bris de glace", "Selon le modèle", "Certains pare-brise d'époque sont rares et chers"],
        ["Tous risques", "Si la voiture a de la valeur", "Couvre ta voiture même si tu es responsable"],
        ["Rassemblements, expositions, circuit", "Selon l'usage", "Souvent exclus des contrats de base, à demander"],
      ],
      caption: "D'après Groupama et Assurland. Les garanties et leurs exclusions varient d'un contrat à l'autre.",
    },

    { type: "h2", id: "prix", text: "Combien ça coûte ?" },
    {
      type: "p",
      text: "Selon Capcar (juillet 2026), un contrat youngtimer coûte **généralement entre 100 et 400 € par an**, selon les garanties, la valeur de la voiture et ton profil. Un contrat au tiers pour un modèle courant tourne parfois autour de 150 € par an ; un tous risques en valeur agréée sur un modèle recherché coûte plus cher. Ce sont des ordres de grandeur : seul un devis donne le vrai prix.",
    },
    {
      type: "list",
      items: [
        "**Compare** les assureurs spécialisés, les courtiers et les généralistes : les écarts sont importants",
        "Vérifie le **mode d'indemnisation**, les **franchises** et les **exclusions** avant le prix",
        "Demande une **remise club** si tu adhères à un club de marque ou de modèle",
        "Pense à **comparer avant l'échéance** de ton contrat actuel : renseigne-la dans Mon Garage pour être prévenu",
      ],
    },

    { type: "h2", id: "ressources", text: "Ressources" },
    {
      type: "list",
      items: [
        "Les comparateurs d'assurance sont accessibles depuis la fiche de chaque véhicule dans [Mon Garage](/garage), à côté de l'échéance du contrat",
        "À lire aussi : [carte grise de collection : conditions, démarches et avantages](/dossiers/carte-grise-collection-conditions-demarches-avantages)",
      ],
    },
  ],
  sources: [
    { title: "Capcar – Assurance youngtimer : quel contrat pour votre auto ancienne ? (juillet 2026)", url: "https://www.capcar.fr/blog/assurance-youngtimer" },
    { title: "Groupama – Quelle assurance auto pour une voiture de collection ?", url: "https://www.groupama.fr/assurance-auto/conseils/vehicule-collection" },
    { title: "Assurland – Assurance youngtimer : comment protéger votre voiture pré-collection ?", url: "https://www.assurland.com/assurance-auto/vehicule/youngtimer/" },
  ],
  models: [],
};
