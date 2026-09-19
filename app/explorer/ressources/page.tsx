import Image from 'next/image'

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

const FLAG_GRADIENTS: Record<string, string> = {
  France:
    'linear-gradient(90deg, #0055A4 0%, #0055A4 33%, #FFFFFF 33%, #FFFFFF 66%, #EF4135 66%, #EF4135 100%)',
  Allemagne:
    'linear-gradient(180deg, #000000 0%, #000000 33%, #DD0000 33%, #DD0000 66%, #FFCE00 66%, #FFCE00 100%)',
  Italie:
    'linear-gradient(90deg, #009246 0%, #009246 33%, #FFFFFF 33%, #FFFFFF 66%, #CE2B37 66%, #CE2B37 100%)',
  'Royaume-Uni':
    'linear-gradient(135deg, #012169 0%, #012169 40%, #FFFFFF 40%, #FFFFFF 60%, #C8102E 60%, #C8102E 100%)',
  'Pays-Bas':
    'linear-gradient(180deg, #AE1C28 0%, #AE1C28 33%, #FFFFFF 33%, #FFFFFF 66%, #21468B 66%, #21468B 100%)',
  Belgique:
    'linear-gradient(90deg, #000000 0%, #000000 33%, #FDDA24 33%, #FDDA24 66%, #EF3340 66%, #EF3340 100%)',
  International: 'linear-gradient(135deg, #003399 0%, #003399 100%)',
}

function flagStyle(country: string) {
  return { backgroundImage: FLAG_GRADIENTS[country] ?? '#e5e7eb' }
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
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <Image
        src="/images/rassemblements/musee-garage.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-white/90 -z-10" />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-bold">Ressources</h1>
        <p className="mt-2 text-black/70">
          Musées et clubs de référence pour les passionnés de voitures anciennes et youngtimers.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Musées automobiles en Europe</h2>
          <ul className="space-y-4">
            {museums.map((m) => (
              <li key={m.name} className="rounded-lg p-1" style={flagStyle(m.country)}>
                <div className="bg-white rounded-md p-4">
                  <a href={m.website} target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
                    {m.name}
                  </a>
                  <p className="text-sm text-gray-600">
                    {m.city}, {m.country}
                    {' · '}
                    {m.address}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Clubs et fédérations</h2>
          <ul className="space-y-4">
            {clubs.map((c) => (
              <li key={c.name} className="rounded-lg p-1" style={flagStyle(c.scope)}>
                <div className="bg-white rounded-md p-4">
                  <a href={c.website} target="_blank" rel="noreferrer" className="text-lg font-medium hover:underline">
                    {c.name}
                  </a>
                  <p className="text-sm text-gray-600">{c.scope}</p>
                  <p className="text-sm text-gray-700 mt-1">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            Pour trouver un club dédié à votre modèle (Porsche, MX-5, BMW, etc.), l&apos;annuaire de la FFVE reste la
            référence la plus complète.
          </p>
        </section>
      </div>
    </div>
  )
}
