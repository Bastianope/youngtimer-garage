import Link from "next/link";
import { getVehiclesForSale } from "@/lib/queries/vehicle-listings";
import { VehicleSaleCard } from "@/components/vehicles/vehicle-sale-card";

// Voitures de ce modèle actuellement en vente ; rien ne s'affiche s'il n'y en a pas
export async function ModelForSaleSection({ makeSlug, modelSlug }: { makeSlug: string; modelSlug: string }) {
  const sales = await getVehiclesForSale({ makeSlug, modelSlug });
  if (sales.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">En vente</h2>
        <Link href="/annonces" className="text-sm text-black/60 underline">Toutes les annonces</Link>
      </div>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2">
        {sales.map((sale) => (
          <VehicleSaleCard key={sale.id} sale={sale} />
        ))}
      </ul>
    </section>
  );
}
