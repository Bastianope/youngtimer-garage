import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getUpcomingEvents } from '@/lib/queries/events'

const EventsMap = dynamic(
  () => import('@/components/explorer/events-map').then((mod) => mod.EventsMap),
  { ssr: false }
)

export default async function RassemblementsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Rassemblements youngtimer</h1>
        <Link
          href="/explorer/rassemblements/ajouter"
          className="bg-black text-white rounded px-4 py-2 text-sm"
        >
          Proposer un rassemblement
        </Link>
      </div>

      <div className="mb-8">
        <EventsMap events={events} />
      </div>

      {events.length === 0 ? (
        <p className="text-gray-600">Aucun rassemblement à venir pour l&apos;instant.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border rounded-lg p-4">
              <Link href={`/explorer/rassemblements/${event.id}`} className="text-lg font-medium hover:underline">
                {event.title}
              </Link>
              <p className="text-sm text-gray-600">
                {new Date(event.start_date).toLocaleDateString('fr-FR')}
                {event.end_date && ` — ${new Date(event.end_date).toLocaleDateString('fr-FR')}`}
                {' · '}
                {event.city}
              </p>
              {event.description && (
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{event.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
