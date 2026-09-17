'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createEventProposal } from '@/lib/queries/events'

const eventSchema = z.object({
  title: z.string().min(3).max(150),
  description: z.string().max(2000).optional(),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  venue_name: z.string().max(150).optional(),
  address: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  department: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  website_url: z.string().url().optional().or(z.literal('')),
  contact_email: z.string().email().optional().or(z.literal('')),
  source_type: z.enum([
    'annonces_observees',
    'guide_specialise',
    'forum_club',
    'expertise_pro',
    'contribution_utilisateur',
    'autre',
  ]),
  source_url: z.string().url().optional().or(z.literal('')),
})

export async function createEventAction(
  modelIds: string[],
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Vous devez être connecté pour proposer un rassemblement.' }
  }

  const raw = Object.fromEntries(formData.entries())
  const parsed = eventSchema.safeParse(raw)

  if (!parsed.success) {
    return { error: 'Formulaire invalide, vérifiez les champs obligatoires.' }
  }

  const eventId = await createEventProposal(
    {
      ...parsed.data,
      website_url: parsed.data.website_url || undefined,
      contact_email: parsed.data.contact_email || undefined,
      source_url: parsed.data.source_url || undefined,
      model_ids: modelIds,
    },
    user.id
  )

  redirect(`/explorer/rassemblements/${eventId}`)
}
