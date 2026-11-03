// Rendez-vous mensuels récurrents : une page fixe par série, qui accumule le référencement
// au lieu d'une page par date qui disparaît une fois l'événement passé.

export type RecurringSeries = {
  // Adresse fixe de la page : /explorer/rassemblements/<slug>
  slug: string
  title: string
  description: string
  venue_name: string
  address?: string
  city: string
  department: string
  region: string
  latitude: number
  longitude: number
  // n-ième dimanche du mois (1 = premier dimanche)
  sundayOfMonth: 1 | 2 | 3 | 4
  // mois concernés (1 = janvier) ; absent = tous les mois
  months?: number[]
  source_url?: string
}

const ALL_YEAR_EXCEPT_SUMMER = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12]
const EVEN_MONTHS = [2, 4, 6, 8, 10, 12]
const RETROCALAGE = 'https://retrocalage.com/region-bretagne/evenements?mode=list&q='

// Rendez-vous mensuels récurrents, règles relevées sur les pages des organisateurs
// relayées par Retrocalage (vérifiées le 02/10/2026)
export const RECURRING_SERIES: RecurringSeries[] = [
  {
    slug: 'vincennes-en-anciennes',
    title: 'Vincennes en Anciennes',
    description:
      'Rassemblement mensuel de voitures anciennes et youngtimers, esplanade du Château de Vincennes.',
    venue_name: 'Esplanade du Château de Vincennes',
    city: 'Vincennes',
    department: 'Val-de-Marne',
    region: 'Île-de-France',
    latitude: 48.8412,
    longitude: 2.4342,
    sundayOfMonth: 1,
  },
  {
    slug: 'cars-and-coffee-vitrolles',
    title: 'Cars & Coffee Vitrolles',
    description:
      'Rassemblement mensuel de voitures anciennes et youngtimers, parking Carrefour Vitrolles.',
    venue_name: 'Parking Carrefour',
    city: 'Vitrolles',
    department: 'Bouches-du-Rhône',
    region: "Provence-Alpes-Côte d'Azur",
    latitude: 43.4577,
    longitude: 5.2472,
    sundayOfMonth: 1,
  },
  {
    slug: 'rassemblement-mensuel-vamp-pleyben',
    title: 'Rassemblement mensuel du VAMP',
    description: 'Rassemblement de véhicules anciens toute l\'année le 1er dimanche du mois, de 9 h à 12 h.',
    venue_name: 'Place Charles de Gaulle',
    city: 'Pleyben',
    department: 'Finistère',
    region: 'Bretagne',
    latitude: 48.229,
    longitude: -3.969,
    sundayOfMonth: 1,
    source_url: `${RETROCALAGE}E583`,
  },
  {
    slug: 'rassemblement-port-de-morlaix',
    title: 'Rassemblement au port de Morlaix',
    description: 'Rassemblement de véhicules anciens le 1er dimanche des mois pairs, entre 10 h et 13 h.',
    venue_name: 'Place Edmond Puyo',
    city: 'Morlaix',
    department: 'Finistère',
    region: 'Bretagne',
    latitude: 48.577,
    longitude: -3.827,
    sundayOfMonth: 1,
    months: EVEN_MONTHS,
    source_url: `${RETROCALAGE}E368`,
  },
  {
    slug: 'rendez-vous-etangs-apigne-rennes',
    title: "Rendez-vous mensuel des Étangs d'Apigné",
    description: 'Rassemblement de véhicules anciens chaque premier dimanche du mois, de 10 h à 13 h.',
    venue_name: "Étangs d'Apigné",
    city: 'Rennes',
    department: 'Ille-et-Vilaine',
    region: 'Bretagne',
    latitude: 48.095,
    longitude: -1.74,
    sundayOfMonth: 1,
    source_url: `${RETROCALAGE}E328`,
  },
  {
    slug: 'rendez-vous-mensuel-vannes',
    title: 'Rendez-vous mensuel à Vannes',
    description: 'Rassemblement de véhicules anciens toute l\'année le premier dimanche du mois, de 10 h à 12 h.',
    venue_name: 'Parking GEMO',
    address: '57 route de Sainte-Anne',
    city: 'Vannes',
    department: 'Morbihan',
    region: 'Bretagne',
    latitude: 47.67,
    longitude: -2.74,
    sundayOfMonth: 1,
    source_url: `${RETROCALAGE}E392`,
  },
  {
    slug: 'rendez-vous-arsp-lorient',
    title: "Rendez-vous mensuel de l'A.R.S.P.",
    description: 'Rassemblement de véhicules anciens le 1er dimanche de chaque mois, de 11 h à 13 h.',
    venue_name: 'Quai du Péristyle',
    city: 'Lorient',
    department: 'Morbihan',
    region: 'Bretagne',
    latitude: 47.745,
    longitude: -3.36,
    sundayOfMonth: 1,
    source_url: `${RETROCALAGE}E255`,
  },
  {
    slug: 'rassemblement-mensuel-saint-malo',
    title: 'Rassemblement mensuel de véhicules anciens de Saint-Malo',
    description: 'Rassemblement de véhicules anciens le 2e dimanche du mois, de 10 h à 12 h 15.',
    venue_name: 'Hippodrome',
    city: 'Saint-Malo',
    department: 'Ille-et-Vilaine',
    region: 'Bretagne',
    latitude: 48.64,
    longitude: -1.99,
    sundayOfMonth: 2,
    source_url: `${RETROCALAGE}E360`,
  },
  {
    slug: 'exposition-mensuelle-gouesnou',
    title: 'Exposition mensuelle véhicules anciens, youngtimers et américaines',
    description: 'Exposition de véhicules anciens, youngtimers et américaines chaque 3e dimanche du mois, sauf juillet et août, de 10 h à 12 h.',
    venue_name: 'Place des Fusillés',
    city: 'Gouesnou',
    department: 'Finistère',
    region: 'Bretagne',
    latitude: 48.452,
    longitude: -4.464,
    sundayOfMonth: 3,
    months: ALL_YEAR_EXCEPT_SUMMER,
    source_url: `${RETROCALAGE}E154`,
  },
  {
    slug: 'rassemblement-beaussais-sur-mer',
    title: 'Rassemblement véhicules anciens et youngtimers',
    description: 'Rassemblement de véhicules anciens et youngtimers le 3e dimanche de chaque mois, de 10 h à 12 h. Places limitées.',
    venue_name: 'Place du 6 juin 44',
    city: 'Beaussais-sur-Mer',
    department: "Côtes-d'Armor",
    region: 'Bretagne',
    latitude: 48.58,
    longitude: -2.14,
    sundayOfMonth: 3,
    source_url: `${RETROCALAGE}E69`,
  },
]


const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const ORDINALS = { 1: '1er', 2: '2e', 3: '3e', 4: '4e' } as const

export function getSeriesBySlug(slug: string): RecurringSeries | undefined {
  return RECURRING_SERIES.find((s) => s.slug === slug)
}

export function getSeriesByTitle(title: string): RecurringSeries | undefined {
  return RECURRING_SERIES.find((s) => s.title === title)
}

// « Chaque 1er dimanche du mois, sauf juillet et août »
export function recurrenceLabel(series: RecurringSeries): string {
  const base = `Chaque ${ORDINALS[series.sundayOfMonth]} dimanche du mois`
  if (!series.months) return base
  if (series.months.join() === EVEN_MONTHS.join()) return `${base}, les mois pairs`
  const missing = Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => !series.months!.includes(m))
  if (missing.length > 0 && missing.length <= 3) {
    const names = missing.map((m) => MONTH_NAMES[m - 1])
    return `${base}, sauf ${names.length > 1 ? `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}` : names[0]}`
  }
  return `${base} (${series.months.map((m) => MONTH_NAMES[m - 1]).join(', ')})`
}

// n-ième dimanche d'un mois, au format AAAA-MM-JJ (monthIndex0 peut dépasser 11)
export function nthSundayOfMonth(year: number, monthIndex0: number, n: number): string {
  const first = new Date(Date.UTC(year, monthIndex0, 1))
  const dow = first.getUTCDay() // 0 = dimanche
  const offset = (7 - dow) % 7
  first.setUTCDate(1 + offset + 7 * (n - 1))
  return first.toISOString().slice(0, 10)
}

// Adresse publique d'un rassemblement : page fixe pour un rendez-vous récurrent, sinon page de l'occurrence
export function eventPath(event: { id: string; series_slug?: string | null }): string {
  return `/explorer/rassemblements/${event.series_slug ?? event.id}`
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: string): boolean {
  return UUID_RE.test(value)
}

// Listes et carte : un rendez-vous récurrent n'apparaît qu'une fois, à sa prochaine date
export function keepNextOccurrence<T extends { start_date: string; series_slug?: string | null }>(events: T[]): T[] {
  const seen = new Set<string>()
  return events.filter((e) => {
    if (!e.series_slug) return true
    if (seen.has(e.series_slug)) return false
    seen.add(e.series_slug)
    return true
  })
}
