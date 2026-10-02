import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

type RecurringSeries = {
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
const RECURRING_SERIES: RecurringSeries[] = [
  {
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

// Compte système utilisé pour les contributions automatisées (compte de test admin du projet)
const SYSTEM_USER_ID = '3f08b5f4-a085-4691-98bc-7205e68d5e65'

// n-ième dimanche d'un mois, au format AAAA-MM-JJ (monthIndex0 peut dépasser 11)
function nthSundayOfMonth(year: number, monthIndex0: number, n: number): string {
  const first = new Date(Date.UTC(year, monthIndex0, 1))
  const dow = first.getUTCDay() // 0 = dimanche
  const offset = (7 - dow) % 7
  first.setUTCDate(1 + offset + 7 * (n - 1))
  return first.toISOString().slice(0, 10)
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const inserted: string[] = []
  const errors: string[] = []

  // Garantit que les 3 prochains mois sont toujours couverts, quelle que soit
  // la fréquence réelle d'exécution du cron (tolère un run manqué)
  for (let i = 0; i < 3; i++) {
    const monthDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1))
    const month = monthDate.getUTCMonth() + 1

    for (const series of RECURRING_SERIES) {
      if (series.months && !series.months.includes(month)) continue

      const targetDate = nthSundayOfMonth(monthDate.getUTCFullYear(), monthDate.getUTCMonth(), series.sundayOfMonth)
      if (targetDate < today) continue

      const { data: existing, error: fetchError } = await supabase
        .from('events')
        .select('id')
        .eq('title', series.title)
        .eq('start_date', targetDate)
        .maybeSingle()

      if (fetchError) {
        errors.push(`${series.title} ${targetDate}: ${fetchError.message}`)
        continue
      }
      if (existing) continue

      const { error: insertError } = await supabase.from('events').insert({
        title: series.title,
        description: series.description,
        start_date: targetDate,
        venue_name: series.venue_name,
        address: series.address ?? null,
        city: series.city,
        department: series.department,
        region: series.region,
        country: 'France',
        latitude: series.latitude,
        longitude: series.longitude,
        source_type: 'guide_specialise',
        source_url: series.source_url ?? null,
        created_by: SYSTEM_USER_ID,
      })

      if (insertError) {
        errors.push(`${series.title} ${targetDate}: ${insertError.message}`)
      } else {
        inserted.push(`${series.title} — ${targetDate}`)
      }
    }
  }

  return NextResponse.json({ inserted, errors })
}
