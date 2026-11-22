import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 22/11/2026 (maserati.com, Wikipedia, Autocar, Motor1 France).
// Les chiffres de production par variante divergent selon les sources : on donne les plus cités.
// Les prix Motor1 datent de 2018 : à prendre comme ordre de grandeur, pas comme cote actuelle.
export const maseratiBiturbo: Dossier = {
  slug: "maserati-biturbo-histoire-famille-achat",
  category: "modele",
  title: "Maserati Biturbo : de la mauvaise réputation au youngtimer recherché",
  seoTitle: "Maserati Biturbo : histoire, versions, points faibles et achat",
  description:
    "La Maserati Biturbo de 1981 à 1994 : l'ère De Tomaso, le V6 biturbo, la famille 222, 228, 430, Spyder Zagato et Karif, les points à vérifier et les prix.",
  publishedAt: "2026-11-22",
  updatedAt: "2026-11-22",
  intro:
    "Elle a longtemps traîné la réputation de la Maserati qui casse. Pourtant la Biturbo a sauvé la marque dans les années 1980, et une voiture bien entretenue se révèle attachante : un V6 biturbo rageur, un intérieur cuir et bois, une ligne sobre et élégante. Voici son histoire, sa famille, et ce qu'il faut vérifier avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1981 : la Maserati d'Alejandro de Tomaso" },
    {
      type: "p",
      text: "Né à Buenos Aires en 1928, ancien pilote et fondateur de De Tomaso Automobili, **Alejandro de Tomaso** prend le contrôle de Maserati en 1975, après son sauvetage avec l'aide de l'État italien. Son pari : une Maserati plus compacte et plus abordable, capable d'aller chercher les clients des coupés allemands.",
    },
    {
      type: "p",
      text: "La Biturbo est présentée le **14 décembre 1981**. Dessinée par Pierangelo Andreani, elle reçoit un **V6 à 90° de 2 litres**, trois soupapes par cylindre et deux turbos IHI, pour **180 ch**. Le succès commercial est immédiat, et la famille dépasse les **37 000 exemplaires** jusqu'en 1994. Marcello Gandini retouchera la ligne en 1988 et 1991.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "1981 à 1994 pour l'ensemble de la famille" },
        { label: "Total", value: "Plus de **37 000** voitures, dont environ 9 200 coupés Biturbo de première génération" },
        { label: "Moteur d'origine", value: "V6 2.0 18 soupapes, deux turbos IHI, carburateur, 180 ch à 6 000 tr/min" },
        { label: "Évolutions", value: "2.5 pour l'export (1983), injection Weber-Marelli (1986 en Italie), 2.8, puis 24 soupapes (fin 1988)" },
      ],
    },

    { type: "h2", id: "famille", text: "La famille Biturbo" },
    {
      type: "table",
      head: ["Modèle", "Années", "Particularités"],
      rows: [
        ["Biturbo (coupé)", "1981-1985", "Le modèle d'origine, environ 9 200 exemplaires"],
        ["425 et 420", "1983-1989", "Berlines quatre portes, 2,5 et 2 litres"],
        ["Spyder", "1984-1994", "Carrosserie Zagato, empattement raccourci, 3 076 exemplaires"],
        ["228", "1986-1992", "Coupé plus grand et plus luxueux, V6 2,8 litres, 469 exemplaires"],
        ["430", "1987-1994", "Berline 2,8 litres, 24 soupapes à partir de 1991"],
        ["222 et 2.24v", "1988-1994", "Coupés aux moteurs évolués, 24 soupapes pour la 2.24v"],
        ["Karif", "1988-1991", "Biplace sur le châssis court du Spyder, V6 2,8, 221 exemplaires"],
      ],
      caption: "Sources : maserati.com et Wikipedia. Les volumes par version varient selon les sources.",
    },
    {
      type: "p",
      text: "La lignée continue avec la **Ghibli II** (1992-1998), dessinée par Gandini, et le **Shamal** (1990-1996), qui passe au V8 3,2 litres biturbo de 326 ch. Toutes les versions sont sur la [fiche Maserati Biturbo](/modeles/maserati/biturbo) et les fiches voisines du catalogue.",
    },

    { type: "h2", id: "reputation", text: "D'où vient la mauvaise réputation ?" },
    {
      type: "p",
      text: "Les premières Biturbo à carburateur sont réputées délicates, et nombre de voitures ont été entretenues comme des berlines ordinaires. Or la mécanique ne pardonne pas les vidanges oubliées ni les courroies hors d'âge. Les versions à injection, à partir de 1986-1987, sont nettement plus fiables. Aujourd'hui, les voitures qui restent sont souvent passées entre les mains de passionnés, et c'est leur historique qui fait toute la différence.",
    },

    { type: "h2", id: "verifier", text: "Les points à vérifier" },
    {
      type: "list",
      items: [
        "**Historique** : vidange tous les 10 000 km au plus et courroie de distribution datée. C'est le premier critère.",
        "**Pression d'huile** à chaud (environ 4 kg/cm²), fumée bleue au ralenti chaud, sifflements aux collecteurs d'échappement, qui se fissurent et sont introuvables neufs.",
        "**Turbos** : jeu et fuites d'huile. La réparation coûte cher.",
        "**Corrosion** : bas de caisse, montants de portes, encadrements de vitres, bord du capot, bac de batterie. La tôle n'est pas galvanisée.",
        "**Refroidissement** : mélange eau-huile, ventilateur qui se déclenche après un long ralenti.",
        "**Pont arrière** : fuites et bruit. Un pont bruyant est une bonne raison de passer son chemin.",
        "**Électricité** : connecteurs oxydés, boîte à fusibles qui grille quand un lève-vitre force.",
        "Carter bas qui touche facilement, cylindre récepteur d'embrayage, et la montre LaSalle d'origine au tableau de bord.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      text: "Faites inspecter la voiture par un spécialiste Maserati avant d'acheter. Le coût d'une inspection est faible face à celui d'un turbo ou d'une reprise de corrosion.",
    },

    { type: "h2", id: "prix", text: "Quel budget ?" },
    {
      type: "p",
      text: "En 2018, Motor1 France situait une Biturbo à restaurer entre **9 000 et 14 000 €**, une voiture en bon état entre **22 500 et 33 000 €**, et un exemplaire de concours au-delà de **33 800 €**. Les Spyder Zagato et les Karif sont les plus recherchés ; les berlines 425 et 430 restent la porte d'entrée la plus abordable. Comparez avec les [annonces Maserati Biturbo](/modeles/maserati/biturbo#annonces) avant de vous décider.",
    },
  ],
  sources: [
    { title: "Maserati — Biturbo (Maserati Classic)", url: "https://www.maserati.com/gh/en/brand/maserati-classic-cars/biturbo-and-derivates/biturbo" },
    { title: "Wikipedia — Maserati Biturbo", url: "https://en.wikipedia.org/wiki/Maserati_Biturbo" },
    { title: "Autocar — Maserati Biturbo buying guide", url: "https://www.autocar.co.uk/node/113731" },
    { title: "Motor1 — Guide d'achat Maserati Biturbo", url: "https://fr.motor1.com/features/267185/guide-achat-maserati-biturbo/" },
    { title: "Wikipedia — Alejandro de Tomaso", url: "https://en.wikipedia.org/wiki/Alejandro_de_Tomaso" },
  ],
  models: [
    { make: "maserati", model: "biturbo", label: "Maserati Biturbo" },
    { make: "maserati", model: "biturbo-spyder", label: "Maserati Biturbo Spyder" },
    { make: "maserati", model: "228", label: "Maserati 228" },
    { make: "maserati", model: "430", label: "Maserati 430" },
    { make: "maserati", model: "222", label: "Maserati 222" },
    { make: "maserati", model: "karif", label: "Maserati Karif" },
  ],
};
