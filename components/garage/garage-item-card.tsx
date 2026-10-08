import Link from "next/link";
import {
  deleteGarageItemAction,
  updateGarageItemStatusAction,
} from "@/lib/actions/garage";
import type { GarageItemWithModel } from "@/lib/queries/garage";
import type { ModelInsight } from "@/lib/queries/model-insights";

const STATUS_LABELS: Record<string, string> = {
  dream: "Rêve",
  searching: "Recherche",
  owned: "Possédée",
  archived: "Archivée",
};

export function GarageItemCard({ item, photoUrl, insight }: { item: GarageItemWithModel; photoUrl?: string; insight?: ModelInsight }) {
  const modelName = item.car_models
    ? `${item.car_models.car_makes?.name ?? ""} ${item.car_models.name}`.trim()
    : "Modèle supprimé";

  const modelHref = item.car_models?.car_makes
    ? `/modeles/${item.car_models.car_makes.slug}/${item.car_models.slug}`
    : null;
  // Pour une voiture recherchée ou rêvée : photo, description et prix du modèle
  const showInsight = !item.vehicle_id && insight !== undefined;

  return (
    <div className="flex gap-4 rounded-md border border-black/10 p-4">
      {showInsight && insight.coverImageUrl && modelHref ? (
        <Link href={modelHref} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={insight.coverImageUrl} alt={modelName} className="h-20 w-28 rounded-md object-cover" />
        </Link>
      ) : null}
      {photoUrl && item.vehicle_id ? (
        <Link href={`/vehicules/${item.vehicle_id}`} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt={modelName} className="h-20 w-28 rounded-md object-cover" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          {item.vehicle_id ? (
            <Link href={`/vehicules/${item.vehicle_id}`} className="underline">
              {item.title_override || modelName}
            </Link>
          ) : (
            item.title_override || modelName
          )}
        </p>
        <span className="text-xs text-black/50">
          {STATUS_LABELS[item.status]}
        </span>
      </div>

      {item.notes ? (
        <p className="mt-1 text-sm text-black/70">{item.notes}</p>
      ) : null}

      {showInsight ? (
        <div className="mt-2 text-sm">
          {insight.description ? (
            <p className="line-clamp-2 text-black/60">{insight.description}</p>
          ) : null}
          {insight.priceText ? (
            <p className="mt-1">
              <span className="text-black/50">Prix observés : </span>
              {insight.priceText}
            </p>
          ) : null}
          {modelHref ? (
            <p className="mt-1 flex flex-wrap gap-x-4">
              <Link href={modelHref} className="underline">Voir la fiche</Link>
              {insight.forSaleCount > 0 ? (
                <Link href={modelHref} className="font-medium text-red-800 underline">
                  {insight.forSaleCount} en vente sur le site
                </Link>
              ) : null}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {(["dream", "searching", "owned"] as const)
          .filter((status) => status !== item.status)
          .map((status) => (
            <form key={status} action={updateGarageItemStatusAction}>
              <input type="hidden" name="itemId" value={item.id} />
              <input type="hidden" name="status" value={status} />
              <button type="submit" className="underline">
                Passer en {STATUS_LABELS[status].toLowerCase()}
              </button>
            </form>
          ))}

        {item.status !== "archived" ? (
          <form action={updateGarageItemStatusAction}>
            <input type="hidden" name="itemId" value={item.id} />
            <input type="hidden" name="status" value="archived" />
            <button type="submit" className="text-black/50 underline">
              Archiver
            </button>
          </form>
        ) : null}

        <form action={deleteGarageItemAction}>
          <input type="hidden" name="itemId" value={item.id} />
          <button type="submit" className="text-red-700 underline">
            Supprimer
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
