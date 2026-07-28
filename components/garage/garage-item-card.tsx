import {
  deleteGarageItemAction,
  updateGarageItemStatusAction,
} from "@/lib/actions/garage";
import type { GarageItemWithModel } from "@/lib/queries/garage";

const STATUS_LABELS: Record<string, string> = {
  dream: "Rêve",
  searching: "Recherche",
  owned: "Possédée",
  archived: "Archivée",
};

export function GarageItemCard({ item }: { item: GarageItemWithModel }) {
  const modelName = item.car_models
    ? `${item.car_models.car_makes?.name ?? ""} ${item.car_models.name}`.trim()
    : "Modèle supprimé";

  return (
    <div className="rounded-md border border-black/10 p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">{item.title_override || modelName}</p>
        <span className="text-xs text-black/50">
          {STATUS_LABELS[item.status]}
        </span>
      </div>

      {item.notes ? (
        <p className="mt-1 text-sm text-black/70">{item.notes}</p>
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
  );
}
