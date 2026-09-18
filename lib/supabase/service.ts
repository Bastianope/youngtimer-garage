import { createClient } from '@supabase/supabase-js'

// Client "service role" — contourne RLS, réservé aux tâches serveur de confiance
// (cron, scripts d'administration). Ne JAMAIS exposer cette clé côté client
// ni l'utiliser dans un composant ou une route accessible sans vérification d'origine.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
