import Link from "next/link";
import type { VehicleForSale } from "@/lib/queries/vehicle-listings";

export function VehicleSaleCard({ sale }: { sale: VehicleForSale }) {
  return (
    <li className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      <Link href={`/vehicules/${sale.vehicleId}#vente`} className="block">
        {sale.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sale.photoUrl} alt={`${sale.makeName} ${sale.modelName}`} className="h-44 w-full object-cover" />
        ) : (
          <div className="flex h-44 items-center justify-center bg-neutral-100 text-xs text-neutral-400">Pas encore de photo</div>
        )}
        <div className="p-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-medium">
              {sale.makeName} {sale.modelName}
            </p>
            <span className="font-semibold">{sale.priceAmount.toLocaleString("fr-FR")} €</span>
          </div>
          <p className="mt-0.5 text-xs text-neutral-500">
            {[
              sale.modelYear ? String(sale.modelYear) : null,
              sale.mileageKm !== null ? `${sale.mileageKm.toLocaleString("fr-FR")} km` : null,
              [sale.location, sale.country].filter(Boolean).join(", "),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {sale.histovecAvailable && (
            <p className="mt-1 text-xs text-emerald-700">✓ Rapport HistoVec disponible</p>
          )}
        </div>
      </Link>
    </li>
  );
}
