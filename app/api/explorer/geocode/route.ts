import { NextRequest, NextResponse } from 'next/server'

// Pays couverts : la France et ses voisins francophones (Belgique, Suisse romande)
const COUNTRY_CODES: Record<string, string> = {
  France: 'fr',
  Belgique: 'be',
  Suisse: 'ch',
  Luxembourg: 'lu',
}

// Géocodage via Nominatim (OpenStreetMap) — gratuit, cohérent avec Leaflet déjà utilisé.
// Respecte la politique d'usage Nominatim : User-Agent identifié, pas d'appel en boucle côté client.
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  const country = request.nextUrl.searchParams.get('country') ?? ''

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ error: 'Adresse trop courte' }, { status: 400 })
  }

  // Pays choisi dans le formulaire, sinon recherche sur les trois pays
  const countryCodes = COUNTRY_CODES[country] ?? Object.values(COUNTRY_CODES).join(',')
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=${countryCodes}&q=${encodeURIComponent(query)}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'youngtimer-garage.fr (contact via le site)',
    },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Géocodage indisponible' }, { status: 502 })
  }

  const results = (await res.json()) as { lat: string; lon: string; display_name: string }[]

  if (results.length === 0) {
    return NextResponse.json({ error: 'Adresse introuvable' }, { status: 404 })
  }

  return NextResponse.json({
    latitude: parseFloat(results[0].lat),
    longitude: parseFloat(results[0].lon),
    label: results[0].display_name,
  })
}
