import Image from 'next/image'
import Link from 'next/link'
import type { EventListItem } from '@/lib/queries/events'
import { nthSundayOfMonth, recurrenceLabel, type RecurringSeries } from '@/lib/events/series'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export type SeriesDate = { date: string; eventId: string | null }

// Prochaines dates : celles en base (le cron les crée 3 mois à l'avance), complétées par la règle
// de récurrence pour toujours afficher au moins 6 dates, même si le cron n'est pas encore passé.
export function buildSeriesDates(series: RecurringSeries, upcoming: EventListItem[], today: string, count = 6): SeriesDate[] {
  const byDate = new Map<string, SeriesDate>()
  for (const e of upcoming) byDate.set(e.start_date, { date: e.start_date, eventId: e.id })

  const now = new Date(`${today}T00:00:00Z`)
  for (let i = 0; i < 14 && byDate.size < count; i++) {
    const month = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1))
    if (series.months && !series.months.includes(month.getUTCMonth() + 1)) continue
    const date = nthSundayOfMonth(month.getUTCFullYear(), month.getUTCMonth(), series.sundayOfMonth)
    if (date >= today && !byDate.has(date)) byDate.set(date, { date, eventId: null })
  }

  return Array.from(byDate.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, Math.max(count, upcoming.length))
}

function longDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  })
}

function buildSeriesJsonLd(series: RecurringSeries, dates: SeriesDate[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': dates.map((d) => ({
      '@type': 'Event',
      name: series.title,
      description: series.description,
      startDate: d.date,
      endDate: d.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: `${SITE_URL}${path}`,
      isAccessibleForFree: true,
      location: {
        '@type': 'Place',
        name: series.venue_name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: series.address ?? undefined,
          addressLocality: series.city,
          addressRegion: series.region,
          addressCountry: 'FR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: series.latitude, longitude: series.longitude },
      },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    })),
  }
}

export function SeriesPage({
  series,
  dates,
  path,
}: {
  series: RecurringSeries
  dates: SeriesDate[]
  path: string
}) {
  const next = dates[0] ?? null
  const later = dates.slice(1)
  // Échappe "<" pour empêcher toute injection HTML dans le script JSON-LD
  const jsonLd = JSON.stringify(buildSeriesJsonLd(series, dates, path)).replace(/</g, '\\u003c')
  const mapsUrl = `https://www.openstreetmap.org/?mlat=${series.latitude}&mlon=${series.longitude}#map=16/${series.latitude}/${series.longitude}`

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Image src="/images/rassemblements/parking-nuit.jpg" alt="" fill priority className="object-cover -z-10" />
      <div className="absolute inset-0 bg-white/90 -z-10" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="mb-2 text-sm">
          <Link href="/explorer/rassemblements" className="text-gray-600 underline underline-offset-2">
            Tous les rassemblements
          </Link>
        </p>
        <span className="mb-2 inline-block rounded-sm bg-black px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
          Rendez-vous mensuel
        </span>
        <h1 className="text-2xl font-semibold mb-1">{series.title}</h1>
        <p className="text-gray-700 mb-6">
          {recurrenceLabel(series)} · {series.venue_name}, {series.city}
        </p>

        {next && (
          <div className="mb-6 rounded-lg border border-black/10 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Prochain rendez-vous</p>
            <p className="text-xl font-semibold first-letter:uppercase">{longDate(next.date)}</p>
          </div>
        )}

        <p className="mb-6 whitespace-pre-line bg-white/70 backdrop-blur-sm rounded-lg p-4">{series.description}</p>

        {later.length > 0 && (
          <section className="mb-6">
            <h2 className="font-medium mb-2">Calendrier des prochaines dates</h2>
            <ul className="divide-y rounded-lg border bg-white/80 backdrop-blur-sm">
              {later.map((d) => (
                <li key={d.date} className="px-4 py-2 text-sm first-letter:uppercase">
                  {longDate(d.date)}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              Dates calculées d&apos;après le rythme habituel du rendez-vous. Vérifie auprès de l&apos;organisateur avant de te
              déplacer, notamment en cas de météo ou de jour férié.
            </p>
          </section>
        )}

        <section className="text-sm text-gray-700 space-y-1 bg-white/70 backdrop-blur-sm rounded-lg p-4">
          <h2 className="font-medium text-base text-gray-900 mb-1">Infos pratiques</h2>
          <p>
            {series.venue_name}
            {series.address ? `, ${series.address}` : ''}, {series.city} ({series.department})
          </p>
          <p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="underline">
              Voir sur la carte
            </a>
          </p>
          {series.source_url && (
            <p>
              <a href={series.source_url} target="_blank" rel="noreferrer" className="underline">
                Source de l&apos;information
              </a>
            </p>
          )}
        </section>

        <p className="mt-8 text-sm">
          Tu connais un autre rendez-vous ?{' '}
          <Link href="/explorer/rassemblements/ajouter" className="underline underline-offset-2">
            Propose-le
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
