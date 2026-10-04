import { Suspense } from "react";
import Link from "next/link";
import { getVehicleSale } from "@/lib/queries/vehicle-listings";
import {
  createVehicleListingAction,
  markVehicleSoldAction,
  renewVehicleListingAction,
  withdrawVehicleListingAction,
} from "@/lib/actions/vehicle-listings";
import { SaleNotice } from "@/components/vehicles/sale-notice";
import { SITE_URL } from "@/lib/site";

type Props = {
  vehicleId: string;
  isOwner: boolean;
  title: string;
  modelYear: number | null;
  mileageKm: number | null;
};

const input = "mt-1 w-full rounded-md border border-neutral-300 p-2 text-sm";
const label = "block text-xs text-neutral-500";
const smallLink = "text-xs text-neutral-500 underline";

function euros(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

export async function VehicleSaleSection({ vehicleId, isOwner, title, modelYear, mileageKm }: Props) {
  const sale = await getVehicleSale(vehicleId);
  if (!sale && !isOwner) return null;

  const path = `/vehicules/${vehicleId}`;
  const loginHref = `/auth/connexion?next=${encodeURIComponent(path)}`;

  // Texte prêt à copier pour Leboncoin, LesAnciennes ou Facebook, avec le lien vers l'historique complet
  const kit = sale
    ? [
        `${title}${modelYear ? ` de ${modelYear}` : ""} à vendre : ${euros(sale.priceAmount)}.`,
        sale.mileageKm !== null ? `${sale.mileageKm.toLocaleString("fr-FR")} km.` : null,
        sale.location ? `Visible à ${sale.location} (${sale.country}).` : null,
        `Historique complet (entretiens, propriétaires, photos) : ${SITE_URL}${path}`,
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <section id="vente" className="mt-8 scroll-mt-20">
      <Suspense fallback={null}>
        <SaleNotice />
      </Suspense>

      {sale ? (
        <div className="mt-3 rounded-md border-2 border-red-700/70 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">En vente</h2>
            <span className="text-xl font-semibold">{euros(sale.priceAmount)}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {[
              sale.mileageKm !== null ? `${sale.mileageKm.toLocaleString("fr-FR")} km` : null,
              [sale.location, sale.country].filter(Boolean).join(", "),
              `annonce du ${new Date(sale.createdAt).toLocaleDateString("fr-FR")}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {sale.description && <p className="mt-3 whitespace-pre-line text-sm">{sale.description}</p>}
          <div className="mt-3 text-sm">
            {sale.contact ? (
              <p>
                <span className="text-neutral-500">Contact : </span>
                <span className="break-words">{sale.contact}</span>
              </p>
            ) : (
              <Link href={loginHref} className="underline">
                Connecte-toi pour voir le contact du vendeur
              </Link>
            )}
          </div>

          {sale.isMine && (
            <div className="mt-4 border-t border-neutral-200 pt-3">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <form action={markVehicleSoldAction.bind(null, vehicleId, sale.id)}>
                  <button type="submit" className={smallLink}>Marquer comme vendue</button>
                </form>
                {sale.expiresSoon && (
                  <form action={renewVehicleListingAction.bind(null, vehicleId, sale.id)}>
                    <button type="submit" className={smallLink}>Prolonger de 90 jours</button>
                  </form>
                )}
                <form action={withdrawVehicleListingAction.bind(null, vehicleId, sale.id)}>
                  <button type="submit" className={smallLink}>Retirer l&apos;annonce</button>
                </form>
              </div>
              <label className={`${label} mt-4`} htmlFor="kit-diffusion">
                Texte prêt à copier pour Leboncoin, LesAnciennes ou Facebook
              </label>
              <textarea id="kit-diffusion" readOnly rows={4} className={input} defaultValue={kit} />
            </div>
          )}
        </div>
      ) : (
        <details className="mt-3 rounded-md border border-neutral-200 p-4">
          <summary className="cursor-pointer text-sm font-medium">Mettre en vente</summary>
          <form action={createVehicleListingAction.bind(null, vehicleId)} className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="sale-price">Prix en € *</label>
              <input id="sale-price" name="price" required inputMode="decimal" className={input} placeholder="ex. 12 500" />
            </div>
            <div>
              <label className={label} htmlFor="sale-km">Kilométrage</label>
              <input
                id="sale-km"
                name="mileage"
                inputMode="numeric"
                className={input}
                defaultValue={mileageKm !== null ? String(mileageKm) : ""}
                placeholder="ex. 182 000"
              />
            </div>
            <div>
              <label className={label} htmlFor="sale-location">Ville ou département</label>
              <input id="sale-location" name="location" maxLength={80} className={input} placeholder="ex. Carhaix (29)" />
            </div>
            <div>
              <label className={label} htmlFor="sale-country">Pays</label>
              <select id="sale-country" name="country" defaultValue="France" className={input}>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Luxembourg">Luxembourg</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="sale-description">Ce que l&apos;acheteur doit savoir (facultatif)</label>
              <textarea
                id="sale-description"
                name="description"
                rows={4}
                maxLength={4000}
                className={input}
                placeholder="État, travaux récents, défauts connus, raison de la vente…"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label} htmlFor="sale-contact">Comment te contacter ? *</label>
              <input id="sale-contact" name="contact" required minLength={3} maxLength={200} className={input} placeholder="Téléphone, e-mail ou lien Facebook" />
              <p className="mt-1 text-xs text-neutral-500">Visible uniquement par les membres connectés.</p>
            </div>
            <p className="text-xs text-neutral-500 sm:col-span-2">
              L&apos;annonce s&apos;affiche ici et dans la rubrique Annonces pendant 90 jours. La fiche de ta voiture passe en
              « Public » ; les photos et entretiens que tu as marqués privés le restent.
            </p>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-md bg-black px-4 py-2 text-sm text-white">
                Publier l&apos;annonce
              </button>
            </div>
          </form>
        </details>
      )}
    </section>
  );
}
