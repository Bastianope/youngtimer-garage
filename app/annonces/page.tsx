import type { Metadata } from "next";
import Link from "next/link";
import { getVehiclesForSale } from "@/lib/queries/vehicle-listings";
import { VehicleSaleCard } from "@/components/vehicles/vehicle-sale-card";

export const metadata: Metadata = {
  title: "Youngtimers à vendre entre passionnés | Youngtimer Garage",
  description:
    "Annonces de youngtimers entre particuliers, avec l'historique complet de chaque voiture : entretiens, propriétaires, photos.",
  alternates: { canonical: "/annonces" },
};

export default async function AnnoncesPage() {
  const sales = await getVehiclesForSale();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold">Annonces</h1>
      <p className="mt-2 max-w-2xl text-black/70">
        Des youngtimers vendus par des passionnés, avec l&apos;historique de chaque voiture : entretiens, propriétaires
        successifs et photos.
      </p>

      {sales.length === 0 ? (
        <p className="mt-8 rounded-md border border-dashed border-neutral-300 p-6 text-sm text-neutral-600">
          Aucune voiture en vente pour l&apos;instant. Pour vendre la tienne, ouvre sa fiche depuis{" "}
          <Link href="/garage" className="underline">Mon Garage</Link> et clique sur « Mettre en vente ».
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sales.map((sale) => (
            <VehicleSaleCard key={sale.id} sale={sale} />
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm text-neutral-600">
        Tu vends ta youngtimer ? Ajoute-la dans <Link href="/garage" className="underline">Mon Garage</Link>, puis
        clique sur « Mettre en vente » depuis sa fiche : l&apos;annonce reprend automatiquement ses photos et son
        historique.
      </p>
    </div>
  );
}
