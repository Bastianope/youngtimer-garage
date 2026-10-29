import { CATEGORY_LABELS, type ItemCategory, type MaintenanceItemType } from "@/lib/maintenance/schedule";

type Props = {
  itemTypes: MaintenanceItemType[];
  checked?: string[];
  idPrefix: string;
};

// Cases à cocher « ce qui a été remplacé », groupées par catégorie (champ de formulaire « items »)
export function MaintenanceChecklistFields({ itemTypes, checked = [], idPrefix }: Props) {
  const groups = new Map<ItemCategory, MaintenanceItemType[]>();
  for (const item of itemTypes) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  return (
    <fieldset className="sm:col-span-2">
      <legend className="block text-xs text-neutral-500">Ce qui a été remplacé ou fait</legend>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        {Array.from(groups.entries()).map(([category, items]) => (
          <div key={category}>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{CATEGORY_LABELS[category]}</p>
            <ul className="mt-1 space-y-1">
              {items.map((item) => {
                const id = `${idPrefix}-${item.code}`;
                return (
                  <li key={item.code}>
                    <label htmlFor={id} className="flex min-h-11 items-center gap-3 rounded-md px-2 text-sm hover:bg-neutral-50">
                      <input
                        id={id}
                        type="checkbox"
                        name="items"
                        value={item.code}
                        defaultChecked={checked.includes(item.code)}
                        className="h-5 w-5"
                      />
                      {item.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
