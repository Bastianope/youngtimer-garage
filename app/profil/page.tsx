import { createClient } from "@/lib/supabase/server";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Profil</h1>
      <p className="mt-2 text-black/70">
        Connecté en tant que {data.user?.email}. Cette page est un
        placeholder de la Phase 0. La gestion complète du profil
        (préférences de localisation et de notification) sera implémentée
        en Phase 2.
      </p>
    </div>
  );
}
