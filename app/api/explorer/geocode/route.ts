import { NextRequest, NextResponse } from 'next/server'

// Géocodage via Nominatim (OpenStreetMap) — gratuit, cohérent avec Leaflet déjà utilisé.
// Respecte la politique d'usage Nominatim : User-Agent identifié, pas d'appel en boucle côté client.
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ error: 'Adresse trop courte' }, { status: 400 })
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=fr&q=${encodeURIComponent(query)}`

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
