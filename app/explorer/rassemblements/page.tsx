import Link from 'next/link'
import { getUpcomingEvents } from '@/lib/queries/events'
import { EventsMapWrapper } from '@/components/explorer/events-map-wrapper'

export default async function RassemblementsPage() {
  const events = await getUpcomingEvents()

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Rassemblements youngtimer</h1>
        <Link
          href="/explorer/rassemblements/ajouter"
          className="mt-6 inline-block bg-black text-white rounded px-4 py-2 text-sm"
        >
          Proposer un rassemblement
        </Link>

        <div className="mt-10 pt-6 border-t">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Pour aller plus loin</h3>
          <p className="text-sm text-gray-600 mb-2">
            D&apos;autres répertoires recensent des rassemblements que nous n&apos;avons pas encore ici :
          </p>
          <ul className="text-sm space-y-1">
            <li>
              <a href="https://www.retrocalage.com" target="_blank" rel="noreferrer" className="text-blue-700 underline">
                Retrocalage
              </a>
              {' '}— calendrier national et régional des véhicules de collection
            </li>
            <li>
              <a href="https://www.forlaps.com" target="_blank" rel="noreferrer" className="text-blue-700 underline">
                Forlaps
              </a>
              {' '}— rassemblements et billetterie par région
            </li>
            <li>
              <a href="https://estimetavoiture.fr/blog/rassemblement-voiture-ancienne-ce-week-end" target="_blank" rel="noreferrer" className="text-blue-700 underline">
                EstimeTaVoiture
              </a>
              {' '}— liste hebdomadaire des rassemblements par région
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
    <EventsMapWrapper events={events} />
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
