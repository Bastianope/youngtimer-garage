import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { RECURRING_SERIES, nthSundayOfMonth } from '@/lib/events/series'

// Compte système utilisé pour les contributions automatisées (compte de test admin du projet)
const SYSTEM_USER_ID = '3f08b5f4-a085-4691-98bc-7205e68d5e65'

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
        series_slug: series.slug,
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
