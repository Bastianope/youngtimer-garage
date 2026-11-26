import type { Dossier } from "@/lib/dossiers/types";

// Recherche du 26/11/2026 (L'argus, PistonHeads, Honest John, Wikipedia, Peugeot Sport, Classic-Trader).
// La puissance de la phase 1 varie selon les sources (150 à 157 ch) : on retient la version de L'argus.
// Les prix sont des ordres de grandeur relevés dans la presse et les annonces, pas une cote officielle.
export const peugeot306S16: Dossier = {
  slug: "peugeot-306-s16-gti-6-rallye-histoire-achat",
  category: "modele",
  title: "Peugeot 306 S16 : l'histoire, les versions, et comment bien l'acheter",
  seoTitle: "Peugeot 306 S16 et GTI-6 : histoire, versions, points faibles et prix",
  description:
    "La 306 S16 de 1993 à 2001 : phase 1 ACAV, 167 ch et boîte 6, GTI-6 et Rallye anglaises, 306 Maxi, les points à vérifier et les prix observés.",
  publishedAt: "2026-11-26",
  updatedAt: "2026-11-26",
  intro:
    "Longtemps restée dans l'ombre de la 205 GTI, la 306 S16 est aujourd'hui considérée comme l'une des meilleures compactes sportives des années 1990 : un châssis vif grâce à son train arrière autodirectionnel, puis un 2.0 de 167 ch avec la première boîte 6 de série de Peugeot. Voici son histoire, ses versions, et ce qu'il faut vérifier avant d'acheter.",
  blocks: [
    { type: "h2", id: "histoire", text: "1993 : la remplaçante de la 309 GTI 16" },
    {
      type: "p",
      text: "La 306 est lancée en février 1993. La **S16** arrive en **octobre 1993**, en 3 et 5 portes, pour succéder à la 309 GTI 16. Son moteur **XU10J4** de 2 litres et 16 soupapes dispose d'une admission variable (ACAV) : **155 ch** au lancement, ramenés officiellement à **150 ch** en juillet 1994. La boîte compte cinq rapports. Une série « **Le Mans** » de 400 exemplaires rouges sort en novembre 1993.",
    },
    {
      type: "p",
      text: "La presse salue d'emblée le châssis, très agile grâce au **train arrière autodirectionnel**, mais trouve le moteur un peu juste face à la concurrence. Selon L'argus, c'est l'histoire d'une voiture passée « de la déception à la rédemption ».",
    },

    { type: "h2", id: "167ch", text: "1996 : 167 ch et la boîte 6" },
    {
      type: "p",
      text: "En **octobre 1996**, la S16 reçoit le moteur **XU10J4RS** de **167 ch** et la **première boîte 6 de série de Peugeot**. Les jantes Laser cèdent la place aux **Cyclone** de 15 pouces, et la 5 portes disparaît. Presque toutes les 167 ch ont la carrosserie restylée de 1997. En France, la voiture garde le nom de S16 ; au Royaume-Uni, elle devient la **GTI-6**. À partir de fin 1997, la gamme française se divise en finitions **Premium** (climatisation, vitres électriques) et **Confort**.",
    },
    {
      type: "facts",
      rows: [
        { label: "Production", value: "Octobre 1993 à juin 2001, à Poissy" },
        { label: "Total", value: "Environ **26 000** S16, phase 1 et 167 ch confondues (L'argus)" },
        { label: "Moteur 167 ch", value: "XU10J4RS 2.0 16 soupapes, 167 ch à 6 500 tr/min, 196 Nm, boîte 6" },
        { label: "Performances", value: "1 214 kg, 220 km/h, 0 à 100 km/h en 8,5 s environ (GTI-6, PistonHeads)" },
        { label: "Liaisons au sol", value: "Jantes 15 pouces, pneus 195/55, disques ventilés de 283 mm à l'avant, disques de 240 mm à l'arrière" },
      ],
    },

    { type: "h2", id: "versions", text: "Toutes les 306 sportives" },
    {
      type: "table",
      head: ["Version", "Années", "Moteur", "Particularités"],
      rows: [
        ["XSi", "Phase 1", "2.0 8 soupapes, 123 ch", "La porte d'entrée, souvent maquillée en S16"],
        ["S16 phase 1", "1993-1996", "2.0 16 soupapes ACAV, 150 à 155 ch", "3 et 5 portes, boîte 5, jantes Laser"],
        ["S16 Le Mans", "1993", "Idem phase 1", "400 exemplaires rouges"],
        ["S16 167 ch", "1996-2001", "XU10J4RS, 167 ch", "3 portes, boîte 6, jantes Cyclone"],
        ["GTI-6", "1996-2001", "XU10J4RS, 167 ch", "Nom de la S16 au Royaume-Uni, environ 4 500 vendues"],
        ["Rallye", "1998", "XU10J4RS, 167 ch", "Royaume-Uni uniquement, environ 500, allégée à 1 163 kg"],
      ],
      caption: "Sources : L'argus, PistonHeads, Wikipedia. La Rallye n'a jamais été vendue en France.",
    },
    {
      type: "p",
      text: "En compétition, la **306 Maxi** de Peugeot Sport a couru en championnat de France et sur les manches asphalte du mondial de 1996 à 1998, avec Gilles Panizzi et François Delecour. Panizzi a été **champion de France en 1996 et 1997**.",
    },

    { type: "h2", id: "verifier", text: "Les points à vérifier" },
    {
      type: "list",
      items: [
        "**Distribution** : courroie et pompe à eau tous les 3 ans ou 50 000 km, avec facture. Un cliquetis qui monte avec le régime est un signal d'alarme.",
        "**Train arrière** : silentblocs usés, claquements, carrossage négatif visible et usure irrégulière des pneus arrière, signes de roulements de bras fatigués. Sur une voiture rabaissée, l'examen s'impose. Un train mal réglé rend l'autodirectionnel piégeux.",
        "**Moteur phase 1** : membranes (« poumons ») de l'admission ACAV percées, ralenti instable à froid (vanne de ralenti, à remplacer par une pièce Magneti Marelli d'origine), support moteur supérieur fissuré, radiateur fatigué.",
        "**Jauge de température d'huile** : vérifiez qu'elle fonctionne, elle sert aussi d'indicateur de niveau.",
        "**Embrayage et boîte** : un embrayage ferme est normal. Le passage de la 2e à la 3e demande de la précision.",
        "**Corrosion** : derrière les bas de caisse, passages de roue avant et arrière gauche, longerons avant derrière le berceau, ancrages des ceintures arrière, goulotte de réservoir.",
        "**Électricité** : faisceaux des portes (lève-vitres, verrouillage), voyant d'airbag allumé à cause d'un fil coupé sous les sièges, tuyaux de climatisation corrodés.",
        "**Intérieur** : contre-portes en velours qui se décollent, Alcantara fragile.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "**Méfiez-vous des fausses S16 construites sur une XSi.** Vérifiez le numéro de série, le moteur 16 soupapes, et sur une 167 ch la boîte 6 et les jantes Cyclone. Une S16 de 167 ch d'origine et non modifiée vaut nettement plus qu'une phase 1.",
    },

    { type: "h2", id: "prix", text: "Quel budget ?" },
    {
      type: "p",
      text: "D'après L'argus, une **phase 1 ACAV** se trouve à partir d'environ **3 000 €** et dépasse rarement **6 000 à 7 000 €**, Le Mans comprise. Une **167 ch boîte 6** exceptionnelle et d'origine se négocie entre **9 000 et 14 000 €**. Sur Classic-Trader, des S16 de 1994 et des GTI-6 de 1997 ont été proposées entre **9 900 et 12 900 €**. Les Rallye anglaises restent rares et à volant à droite. Comparez avec les [annonces Peugeot 306](/modeles/peugeot/306#annonces), et lisez aussi notre dossier sur la [Peugeot 205 GTI](/dossiers/peugeot-205-gti-histoire-1-6-1-9-achat).",
    },
  ],
  sources: [
    { title: "L'argus — Peugeot 306 S16, de la déception à la rédemption", url: "https://www.largus.fr/actualite-automobile/peugeot-306-s16-de-la-deception-a-la-redemption-10477390.html" },
    { title: "PistonHeads — Peugeot 306 GTI-6 buying guide", url: "https://www.pistonheads.com/news/ph-buying-guides/peugeot-306-gti-6--ph-used-buying-guide/34887" },
    { title: "Honest John Classics — Peugeot 306", url: "https://classics.honestjohn.co.uk/reviews/peugeot/306/" },
    { title: "Wikipedia — Peugeot 306", url: "https://en.wikipedia.org/wiki/Peugeot_306" },
    { title: "Peugeot Sport — 306 Maxi", url: "https://www.peugeot-sport.com/en/old_car/306maxi" },
  ],
  models: [{ make: "peugeot", model: "306", label: "Peugeot 306" }],
};
