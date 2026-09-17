import { createClient } from '@/lib/supabase/server'

export type EventVerificationStatus = 'a_verifier' | 'verifie'

export type EventSourceType =
  | 'annonces_observees'
  | 'guide_specialise'
  | 'forum_club'
  | 'expertise_pro'
  | 'contribution_utilisateur'
  | 'autre'

export type EventListItem = {
  id: string
  title: string
  description: string | null
  start_date: string
  end_date: string | null
  venue_name: string | null
  address: string | null
  city: string
  department: string | null
  region: string | null
  country: string
  latitude: number
  longitude: number
  website_url: string | null
  contact_email: string | null
  verification_status: EventVerificationStatus
}

export type EventModelSummary = {
  car_model_id: string
  model_name: string
  make_name: string
}

// Liste des rassemblements publiés (validés), à venir, triés par date
export async function getUpcomingEvents(): Promise<EventListItem[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, description, start_date, end_date, venue_name, address, city, department, region, country, latitude, longitude, website_url, contact_email, verification_status'
    )
    .eq('verification_status', 'verifie')
    .gte('start_date', today)
    .order('start_date', { ascending: true })

  if (error) throw error
  return (data ?? []) as EventListItem[]
}

// Fiche d'un rassemblement (lecture publique, quel que soit son statut,
// pour permettre au contributeur de retrouver sa proposition en attente)
export async function getEventById(eventId: string): Promise<EventListItem | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, description, start_date, end_date, venue_name, address, city, department, region, country, latitude, longitude, website_url, contact_email, verification_status'
    )
    .eq('id', eventId)
    .maybeSingle()

  if (error) throw error
  return data as EventListItem | null
}

// Marques/modèles liés à un rassemblement
export async function getEventModels(eventId: string): Promise<EventModelSummary[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('event_models')
    .select('car_model_id, car_models(name, car_makes(name))')
    .eq('event_id', eventId)

  if (error) throw error

  return (data ?? []).map((row: any) => ({
    car_model_id: row.car_model_id,
    model_name: row.car_models?.name ?? '',
    make_name: row.car_models?.car_makes?.name ?? '',
  }))
}

// Recherche de modèles pour le sélecteur multi-modèles du formulaire
export async function searchCarModelsForEventForm(
  query: string
): Promise<{ id: string; label: string }[]> {
  const supabase = await createClient()

  let request = supabase
    .from('car_models')
    .select('id, name, car_makes(name)')
    .order('name', { ascending: true })
    .limit(20)

  if (query.trim().length > 0) {
    request = request.ilike('name', `%${query.trim()}%`)
  }

  const { data, error } = await request

  if (error) throw error

  return (data ?? []).map((row: any) => ({
    id: row.id,
    label: `${row.car_makes?.name ?? ''} ${row.name}`.trim(),
  }))
}

export type CreateEventInput = {
  title: string
  description?: string
  start_date: string
  end_date?: string
  venue_name?: string
  address?: string
  city: string
  department?: string
  region?: string
  country?: string
  latitude: number
  longitude: number
  website_url?: string
  contact_email?: string
  source_type: EventSourceType
  source_url?: string
  model_ids: string[]
}

// Création d'un rassemblement par un utilisateur connecté — statut forcé
// à 'a_verifier' côté RLS, on ne l'envoie donc pas nous-mêmes
export async function createEventProposal(
  input: CreateEventInput,
  userId: string
): Promise<string> {
  const supabase = await createClient()

  const { data: event, error: insertError } = await supabase
    .from('events')
    .insert({
      title: input.title,
      description: input.description ?? null,
      start_date: input.start_date,
      end_date: input.end_date ?? null,
      venue_name: input.venue_name ?? null,
      address: input.address ?? null,
      city: input.city,
      department: input.department ?? null,
      region: input.region ?? null,
      country: input.country ?? 'France',
      latitude: input.latitude,
      longitude: input.longitude,
      website_url: input.website_url ?? null,
      contact_email: input.contact_email ?? null,
      source_type: input.source_type,
      source_url: input.source_url ?? null,
      created_by: userId,
    })
    .select('id')
    .single()

  if (insertError) throw insertError

  if (input.model_ids.length > 0) {
    const rows = input.model_ids.map((carModelId) => ({
      event_id: event.id,
      car_model_id: carModelId,
    }))

    const { error: linkError } = await supabase.from('event_models').insert(rows)
    if (linkError) throw linkError
  }

  return event.id as string
}

// Intérêt utilisateur pour un rassemblement (bascule)
export async function toggleEventInterest(
  eventId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient()

  const { data: existing, error: fetchError } = await supabase
    .from('event_interests')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .maybeSingle()

  if (fetchError) throw fetchError

  if (existing) {
    const { error: deleteError } = await supabase
      .from('event_interests')
      .delete()
      .eq('id', existing.id)
    if (deleteError) throw deleteError
    return false
  }

  const { error: insertError } = await supabase
    .from('event_interests')
    .insert({ event_id: eventId, user_id: userId })
  if (insertError) throw insertError
  return true
}

export async function getEventInterestCount(eventId: string): Promise<number> {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('event_interests')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)

  if (error) throw error
  return count ?? 0
}
