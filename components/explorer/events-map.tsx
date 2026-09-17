'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { EventListItem } from '@/lib/queries/events'

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export function EventsMap({ events }: { events: EventListItem[] }) {
  const center: [number, number] =
    events.length > 0 ? [events[0].latitude, events[0].longitude] : [46.6, 2.2]

  return (
    <MapContainer
      center={center}
      zoom={events.length > 0 ? 6 : 5}
      style={{ height: '480px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker key={event.id} position={[event.latitude, event.longitude]} icon={markerIcon}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            {event.city}
            <br />
            {new Date(event.start_date).toLocaleDateString('fr-FR')}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
