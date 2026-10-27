import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getEventById, getEventModels, type EventListItem } from '@/lib/queries/events'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) return { title: 'Rassemblement introuvable — Youngtimer Garage' }

  const date = new Date(event.start_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const description = (
    event.description ??
    `${event.title} le ${date} à ${event.city} : rassemblement de voitures anciennes et youngtimers.`
  )
    .replace(/\s+/g, ' ')
    .slice(0, 160)

  return {
    title: `${event.title} — ${date}, ${event.city} | Youngtimer Garage`,
    description,
    alternates: { canonical: `/explorer/rassemblements/${event.id}` },
  }
}

// Données structurées schema.org/Event : permettent à Google d'afficher
// le rassemblement (date, lieu) directement dans ses résultats
function buildEventJsonLd(event: EventListItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description ?? undefined,
    startDate: event.start_date,
    endDate: event.end_date ?? event.start_date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${SITE_URL}/explorer/rassemblements/${event.id}`,
    location: {
      '@type': 'Place',
      name: event.venue_name ?? event.city,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address ?? undefined,
        addressLocality: event.city,
        addressRegion: event.region ?? undefined,
        addressCountry: ({ France: 'FR', Belgique: 'BE', Suisse: 'CH', Luxembourg: 'LU', Monaco: 'MC', Italie: 'IT', Autriche: 'AT', Allemagne: 'DE', Espagne: 'ES', 'Royaume-Uni': 'GB', 'Corée du Sud': 'KR' } as Record<string, string>)[event.country] ?? event.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.latitude,
        longitude: event.longitude,
      },
    },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }
}

export default async function RassemblementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) notFound()

  const models = await getEventModels(id)
  // Échappe "<" pour empêcher toute injection HTML via un champ saisi par un utilisateur
  const jsonLd = JSON.stringify(buildEventJsonLd(event)).replace(/</g, '\\u003c')

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Image
        src="/images/rassemblements/parking-nuit.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-white/90 -z-10" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {event.event_kind === 'rallye' && (
          <span className="mb-2 inline-block rounded-sm bg-[#C81E1E] px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
            Rallye
          </span>
        )}
        <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
        <p className="text-gray-600 mb-6">
          {new Date(event.start_date).toLocaleDateString('fr-FR')}
          {event.end_date && ` — ${new Date(event.end_date).toLocaleDateString('fr-FR')}`}
          {' · '}
          {event.event_kind === 'rallye' ? 'Départ : ' : ''}
          {event.venue_name ? `${event.venue_name}, ` : ''}
          {event.city}
        </p>

        {event.event_kind === 'rallye' && (
          <p className="mb-6 text-sm">
            <Link href="/dossiers/grands-rallyes-voitures-de-collection-2027" className="underline underline-offset-2">
              Parcours, voitures admises et budget : notre dossier sur les grands rallyes 2027
            </Link>
          </p>
        )}

        {event.description && (
          <p className="mb-6 whitespace-pre-line bg-white/70 backdrop-blur-sm rounded-lg p-4">
            {event.description}
          </p>
        )}

        {models.length > 0 && (
          <div className="mb-6">
            <h2 className="font-medium mb-2">Marques / modèles concernés</h2>
            <div className="flex flex-wrap gap-2">
              {models.map((m) => (
                <span key={m.car_model_id} className="bg-white/80 backdrop-blur-sm border rounded-full px-3 py-1 text-sm">
                  {m.make_name} {m.model_name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-700 space-y-1 bg-white/70 backdrop-blur-sm rounded-lg p-4 inline-block">
          {event.address && <p>{event.address}</p>}
          {event.website_url && (
            <p>
              <a href={event.website_url} target="_blank" rel="noreferrer" className="underline">
                Site web
              </a>
            </p>
          )}
          {event.contact_email && <p>Contact : {event.contact_email}</p>}
        </div>
      </div>
    </div>
  )
}
