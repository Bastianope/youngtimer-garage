import { createClient } from "@/lib/supabase/server";

export default async function GaragePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Mon Garage</h1>
      <p className="mt-2 text-black/70">
        Bonjour {data.user?.email} 👋 Cette page est un placeholder de la
        Phase 0 : elle confirme que la route est protégée et que
        l&apos;authentification fonctionne. Le tableau de bord du Garage
        (voitures, recherches, rêves) sera implémenté en Phase 2.
      </p>
    </div>
  );
}
