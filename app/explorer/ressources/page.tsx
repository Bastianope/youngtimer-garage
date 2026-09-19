type Museum = {
  name: string
  city: string
  country: string
  address: string
  website: string
  note: string
}

type Club = {
  name: string
  scope: string
  website: string
  note: string
}

const museums: Museum[] = [
  {
    name: "Cité de l'Automobile — Collection Schlumpf",
    city: 'Mulhouse',
    country: 'France',
    address: '192 Avenue de Colmar, 68100 Mulhouse',
    website: 'https://www.musee-automobile.fr',
    note: 'Plus grande collection Bugatti au monde, plus de 400 véhicules.',
  },
  {
    name: "Musée de l'Aventure Peugeot",
    city: 'Sochaux',
    country: 'France',
    address: "Carrefour de l'Europe, 25600 Sochaux",
    website: 'https://www.museeaventurepeugeot.com',
    note: "L'histoire complète de la marque, de 1810 à nos jours.",
  },
  {
    name: 'BMW Museum',
    city: 'Munich',
    country: 'Allemagne',
    address: 'Am Olympiapark 2, 80809 München',
    website: 'https://www.bmw-welt.com',
    note: 'Situé au pied du siège historique de la marque.',
  },
  {
    name: 'Mercedes-Benz Museum',
    city: 'Stuttgart',
    country: 'Allemagne',
    address: 'Mercedesstraße 100, 70372 Stuttgart',
    website: 'https://www.mercedes-benz.com',
    note: 'Architecture spectaculaire, parcours chronologique complet.',
  },
  {
    name: 'Porsche Museum',
    city: 'Stuttgart',
    country: 'Allemagne',
    address: 'Porscheplatz 1, 70435 Stuttgart',
    website: 'https://www.porsche.com',
    note: 'Sur le site historique de production à Zuffenhausen.',
  },
  {
    name: 'Museo Ferrari Maranello',
    city: 'Maranello',
    country: 'Italie',
    address: 'Via Dino Ferrari 43, 41053 Maranello (MO)',
    website: 'https://museomaranello.ferrari.com',
    note: "À côté de l'usine et de la piste Fiorano.",
  },
  {
    name: "Museo Nazionale dell'Automobile (MAUTO)",
    city: 'Turin',
    country: 'Italie',
    address: "Corso Unità d'Italia 40, 10126 Torino",
    website: 'https://www.museoauto.com',
    note: 'Près de 200 voitures, 80 marques, 8 pays représentés.',
  },
  {
    name: 'National Motor Museum',
    city: 'Beaulieu',
    country: 'Royaume-Uni',
    address: 'Brockenhurst, Hampshire SO42 7ZN',
    website: 'https://www.nationalmotormuseum.org.uk',
    note: 'Un des plus anciens musées automobiles du monde.',
  },
  {
    name: 'Louwman Museum',
    city: 'La Haye',
    country: 'Pays-Bas',
    address: '2594 BB Den Haag',
    website: 'https://www.louwmanmuseum.nl',
    note: 'La plus ancienne collection automobile privée du monde.',
  },
  {
    name: 'Autoworld',
    city: 'Bruxelles',
    country: 'Belgique',
    address: 'Parc du Cinquantenaire 11, 1000 Bruxelles',
    website: 'https://www.autoworld.be',
    note: 'Installé dans le Palais du Cinquantenaire.',
  },
]

const clubs: Club[] = [
  {
    name: 'FFVE — Fédération Française des Véhicules d\u2019Époque',
    scope: 'France',
    website: 'https://www.ffve.org',
    note: 'Fédère plus de 1 400 clubs et délivre les attestations pour la carte grise de collection. Son annuaire en ligne permet de trouver un club par marque ou par région.',
  },
  {
    name: 'FIVA — Fédération Internationale des Véhicules Anciens',
    scope: 'International',
    website: 'https://www.fiva.org',
    note: 'Coordonne les fédérations nationales à l\u2019échelle mondiale, siège à Turin.',
  },
  {
    name: '205 GTI Club de France',
    scope: 'France',
    website: 'https://www.site.205gticlubdefrance.fr',
    note: 'Club de marque dédié aux Peugeot 205/309 GTI et dérivées sportives.',
  },
]

export default function RessourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Ressources</h1>
      <p className="mt-2 text-black/70">
        Musées et clubs de référence pour les passionnés de voitures anciennes et youngtimers.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Musées automobiles en Europe</h2>
        <ul className="space-y-4">
          {museums.map((m) => (
            <li key={m.name} className="border rounded-lg p-4">
              <a href={m.website} target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
                {m.name}
              </a>
              <p className="text-sm text-gray-600">
                {m.city}, {m.country}
                {' · '}
                {m.address}
              </p>
              <p className="text-sm text-gray-700 mt-1">{m.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Clubs et fédérations</h2>
        <ul className="space-y-4">
          {clubs.map((c) => (
            <li key={c.name} className="border rounded-lg p-4">
              <a href={c.website} target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
                {c.name}
              </a>
              <p className="text-sm text-gray-600">{c.scope}</p>
              <p className="text-sm text-gray-700 mt-1">{c.note}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600 mt-4">
          Pour trouver un club dédié à votre modèle (Porsche, MX-5, BMW, etc.), l&apos;annuaire de la FFVE reste la
          référence la plus complète.
        </p>
      </section>
    </div>
  )
}
