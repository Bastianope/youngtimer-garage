import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { toggleListingAlertAction } from "@/lib/actions/listing-alerts";
import { ListingAlertNotice } from "@/components/models/listing-alert-notice";

type Props = { modelId: string; modelName: string; path: string };

// Alerte e-mail sur les nouvelles annonces du modèle
export async function ListingAlertButton({ modelId, modelName, path }: Props) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) {
    return (
      <div id="alerte" className="mt-3 scroll-mt-24">
        <Link href={`/auth/connexion?next=${encodeURIComponent(path)}`} className="text-sm underline">
          Se connecter pour être alerté des annonces {modelName}
        </Link>
      </div>
    );
  }

  const { data: alert } = await supabase.from("listing_alerts").select("id").eq("model_id", modelId).maybeSingle();
  const action = toggleListingAlertAction.bind(null, modelId, path);

  return (
    <div id="alerte" className="mt-3 scroll-mt-24">
      <form action={action}>
        <button type="submit" className="rounded-md border border-black/20 px-4 py-2 text-sm">
          {alert ? "🔔 Alerte annonces activée — désactiver" : "🔔 M'alerter par e-mail des annonces"}
        </button>
      </form>
      <p className="mt-1 text-xs text-black/50">
        {alert
          ? `Tu reçois un e-mail dès qu'une ${modelName} est mise en vente sur le site.`
          : `Un e-mail dès qu'une ${modelName} est mise en vente sur le site. Désinscription en un clic.`}
      </p>
      <Suspense fallback={null}>
        <ListingAlertNotice />
      </Suspense>
    </div>
  );
}
