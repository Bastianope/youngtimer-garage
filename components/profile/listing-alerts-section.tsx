import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteListingAlertAction } from "@/lib/actions/listing-alerts";

type AlertRow = {
  id: string;
  car_models: { name: string; slug: string; car_makes: { name: string; slug: string } };
};

// Liste des alertes e-mail du membre, avec désactivation
export async function ListingAlertsSection() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listing_alerts")
    .select("id, car_models!inner(name, slug, car_makes!inner(name, slug))")
    .order("created_at", { ascending: false });
  if (error) console.error("ListingAlertsSection error:", error);
  const alerts = (data ?? []) as unknown as AlertRow[];

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">Mes alertes annonces</h2>
      <p className="mt-1 text-sm text-black/60">
        Un e-mail dès qu&apos;un véhicule de ces modèles est mis en vente. Pour en ajouter une, utilise le bouton
        « M&apos;alerter » sur la fiche d&apos;un modèle.
      </p>
      {alerts.length === 0 ? (
        <p className="mt-3 text-sm text-black/60">
          Aucune alerte pour l&apos;instant. <Link href="/modeles" className="underline">Parcourir les modèles</Link>
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-black/10 rounded-md border border-black/10">
          {alerts.map((alert) => {
            const model = alert.car_models;
            return (
              <li key={alert.id} className="flex items-center justify-between gap-3 p-3 text-sm">
                <Link href={`/modeles/${model.car_makes.slug}/${model.slug}`} className="underline">
                  {model.car_makes.name} {model.name}
                </Link>
                <form action={deleteListingAlertAction.bind(null, alert.id)}>
                  <button type="submit" className="rounded-md border border-black/20 px-3 py-1 text-xs">
                    Désactiver
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
