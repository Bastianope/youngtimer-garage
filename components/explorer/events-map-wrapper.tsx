'use client'

import dynamic from 'next/dynamic'
import type { EventListItem } from '@/lib/queries/events'

const EventsMap = dynamic(
  () => import('@/components/explorer/events-map').then((mod) => mod.EventsMap),
  { ssr: false }
)

export function EventsMapWrapper({ events }: { events: EventListItem[] }) {
  return <EventsMap events={events} />
}
