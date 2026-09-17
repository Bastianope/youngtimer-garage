import { notFound } from 'next/navigation'
import { getEventById, getEventModels } from '@/lib/queries/events'

export default async function RassemblementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) notFound()

  const models = await getEventModels(id)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {event.verification_status === 'a_verifier' && (
        <p className="inline-block text-xs bg-amber-100 text-amber-800 rounded-full px-3 py-1 mb-4">
          À vérifier — en attente de validation
        </p>
      )}
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(event.start_date).toLocaleDateString('fr-FR')}
        {event.end_date && ` — ${new Date(event.end_date).toLocaleDateString('fr-FR')}`}
        {' · '}
        {event.venue_name ? `${event.venue_name}, ` : ''}
        {event.city}
      </p>

      {event.description && <p className="mb-6 whitespace-pre-line">{event.description}</p>}

      {models.length > 0 && (
        <div className="mb-6">
          <h2 className="font-medium mb-2">Marques / modèles concernés</h2>
          <div className="flex flex-wrap gap-2">
            {models.map((m) => (
              <span key={m.car_model_id} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                {m.make_name} {m.model_name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 space-y-1">
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
  )
}
