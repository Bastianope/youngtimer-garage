import { EventForm } from './event-form'

export default function AjouterRassemblementPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Proposer un rassemblement</h1>
      <p className="text-gray-600 mb-8">
        Renseignez les informations du rassemblement youngtimer que vous connaissez.
      </p>
      <EventForm />
    </div>
  )
}
