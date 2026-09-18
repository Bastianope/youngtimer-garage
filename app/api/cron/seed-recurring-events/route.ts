import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

type RecurringSeries = {
  title: string
  description: string
  venue_name: string
  city: string
  department: string
  region: string
  latitude: number
  longitude: number
}

// Rendez-vous mensuels récurrents connus et confirmés (1er dimanche du mois)
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
  },
]

// Compte système utilisé pour les contributions automatisées (compte de test admin du projet)
const SYSTEM_USER_ID = '3f08b5f4-a085-4691-98bc-7205e68d5e65'

function firstSundayOfMonth(year: number, monthIndex0: number): string {
  const first = new Date(Date.UTC(year, monthIndex0, 1))
  const dow = first.getUTCDay() // 0 = dimanche
  const offset = (7 - dow) % 7
  first.setUTCDate(1 + offset)
  return first.toISOString().slice(0, 10)
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const now = new Date()
  const inserted: string[] = []
  const errors: string[] = []

  // Garantit que les 3 prochains mois sont toujours couverts, quelle que soit
  // la fréquence réelle d'exécution du cron (tolère un run manqué)
  for (let i = 0; i < 3; i++) {
    const targetDate = firstSundayOfMonth(now.getUTCFullYear(), now.getUTCMonth() + i)

    for (const series of RECURRING_SERIES) {
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
        city: series.city,
        department: series.department,
        region: series.region,
        country: 'France',
        latitude: series.latitude,
        longitude: series.longitude,
        source_type: 'guide_specialise',
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
