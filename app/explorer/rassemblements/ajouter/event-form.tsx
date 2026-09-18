'use client'

import { useState, useTransition } from 'react'
import { createEventAction } from './actions'

type ModelOption = { id: string; label: string }

export function EventForm() {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<ModelOption[]>([])
  const [selected, setSelected] = useState<ModelOption[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [addressQuery, setAddressQuery] = useState('')
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; label: string } | null>(null)
  const [geocodeError, setGeocodeError] = useState<string | null>(null)
  const [isGeocoding, setIsGeocoding] = useState(false)

  async function handleLocate() {
    if (addressQuery.trim().length < 3) {
      setGeocodeError('Entrez au moins une ville pour localiser.')
      return
    }
    setIsGeocoding(true)
    setGeocodeError(null)
    try {
      const res = await fetch(`/api/explorer/geocode?q=${encodeURIComponent(addressQuery)}`)
      const data = await res.json()
      if (!res.ok) {
        setGeocodeError(data.error ?? 'Adresse introuvable, essayez avec plus de précision.')
        setCoords(null)
        return
      }
      setCoords(data)
    } catch {
      setGeocodeError('Erreur de géocodage, réessayez.')
    } finally {
      setIsGeocoding(false)
    }
  }

  async function handleSearch(value: string) {
    setQuery(value)
    if (value.trim().length < 2) {
      setOptions([])
      return
    }
    const res = await fetch(`/api/explorer/car-models?q=${encodeURIComponent(value)}`)
    if (res.ok) {
      setOptions(await res.json())
    }
  }

  function addModel(option: ModelOption) {
    if (!selected.find((m) => m.id === option.id)) {
      setSelected([...selected, option])
    }
    setQuery('')
    setOptions([])
  }

  function removeModel(id: string) {
    setSelected(selected.filter((m) => m.id !== id))
  }

  function handleSubmit(formData: FormData) {
    setError(null)
    if (!coords) {
      setError("Localisez d'abord le lieu avant de soumettre.")
      return
    }
    formData.set('latitude', String(coords.latitude))
    formData.set('longitude', String(coords.longitude))
    startTransition(async () => {
      const result = await createEventAction(
        selected.map((m) => m.id),
        formData
      )
      if (result?.error) setError(result.error)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Titre *</label>
        <input name="title" required className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" rows={4} className="w-full border rounded px-3 py-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date de début *</label>
          <input type="date" name="start_date" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de fin</label>
          <input type="date" name="end_date" className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Lieu</label>
        <input name="venue_name" placeholder="Nom du lieu (ex. Circuit de Nogaro)" className="w-full border rounded px-3 py-2 mb-2" />
        <input name="address" placeholder="Adresse (optionnel)" className="w-full border rounded px-3 py-2" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ville *</label>
          <input
            name="city"
            required
            onChange={(e) => setAddressQuery(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Département</label>
          <input name="department" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Région</label>
          <input name="region" className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pays</label>
        <input name="country" defaultValue="France" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <button
          type="button"
          onClick={handleLocate}
          disabled={isGeocoding}
          className="border rounded px-4 py-2 text-sm disabled:opacity-50"
        >
          {isGeocoding ? 'Recherche...' : 'Localiser sur la carte'}
        </button>
        {geocodeError && <p className="text-sm text-red-600 mt-2">{geocodeError}</p>}
        {coords && (
          <p className="text-sm text-green-700 mt-2">
            Localisé : {coords.label}
          </p>
        )}
      </div>

      <input type="hidden" name="latitude" value={coords?.latitude ?? ''} readOnly />
      <input type="hidden" name="longitude" value={coords?.longitude ?? ''} readOnly />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Site web</label>
          <input name="website_url" type="url" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email de contact</label>
          <input name="contact_email" type="email" className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Modèles concernés</label>
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher un modèle (ex. Peugeot 205)"
          className="w-full border rounded px-3 py-2"
        />
        {options.length > 0 && (
          <ul className="border rounded mt-1 divide-y">
            {options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => addModel(opt)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selected.map((m) => (
              <span
                key={m.id}
                className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm"
              >
                {m.label}
                <button type="button" onClick={() => removeModel(m.id)} aria-label="Retirer">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Source *</label>
        <select name="source_type" required className="w-full border rounded px-3 py-2">
          <option value="contribution_utilisateur">Contribution personnelle</option>
          <option value="annonces_observees">Annonces observées</option>
          <option value="guide_specialise">Guide spécialisé</option>
          <option value="forum_club">Forum / club</option>
          <option value="expertise_pro">Expertise professionnelle</option>
          <option value="autre">Autre</option>
        </select>
        <input
          name="source_url"
          type="url"
          placeholder="URL de la source (optionnel)"
          className="w-full border rounded px-3 py-2 mt-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {isPending ? 'Envoi...' : 'Proposer ce rassemblement'}
      </button>
      <p className="text-xs text-gray-500">
Votre rassemblement sera immédiatement visible par tous les visiteurs.
      </p>
    </form>
  )
}
