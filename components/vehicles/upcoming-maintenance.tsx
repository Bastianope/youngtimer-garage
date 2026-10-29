import { dateStatus, type ItemSchedule } from "@/lib/maintenance/schedule";
import type { VehicleReminders } from "@/lib/queries/maintenance";

type Props = {
  schedule: ItemSchedule[];
  reminders: VehicleReminders;
  vehicleType: "car" | "van";
  mileageKm: number | null;
  today: string;
};

const TONE = {
  overdue: "border-red-300 bg-red-50",
  soon: "border-amber-300 bg-amber-50",
  ok: "border-neutral-200",
} as const;

const BADGE = {
  overdue: "bg-red-700 text-white",
  soon: "bg-amber-600 text-white",
  ok: "border border-neutral-300 text-neutral-600",
} as const;

const BADGE_TEXT = { overdue: "Dépassé", soon: "Bientôt", ok: "À jour" } as const;

function fr(value: string | null) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : null;
}

function km(value: number | null) {
  return value !== null ? `${value.toLocaleString("fr-FR")} km` : null;
}

function nextLabel(row: ItemSchedule) {
  return [fr(row.nextDate) && `avant le ${fr(row.nextDate)}`, km(row.nextKm) && `à ${km(row.nextKm)}`].filter(Boolean).join(" ou ");
}

function lastLabel(row: ItemSchedule) {
  const parts = [fr(row.lastDate), km(row.lastKm)].filter(Boolean).join(" · ");
  return parts ? `Dernier : ${parts}` : null;
}

// Bloc « Prochaines échéances » de la fiche véhicule (propriétaire uniquement)
export function UpcomingMaintenance({ schedule, reminders, vehicleType, mileageKm, today }: Props) {
  const dates = [
    { key: "ct", title: "Contrôle technique", due: reminders.ctDueDate, prefix: "avant le", hint: null as string | null },
    {
      key: "warranty",
      title: "Garantie constructeur",
      due: reminders.warrantyEndDate,
      prefix: "fin le",
      hint:
        reminders.warrantyEndMileageKm !== null
          ? `ou à ${km(reminders.warrantyEndMileageKm)}${mileageKm !== null && mileageKm >= reminders.warrantyEndMileageKm ? " (atteint)" : ""}`
          : null,
    },
    {
      key: "insurance",
      title: "Assurance",
      due: reminders.insuranceRenewalDate,
      prefix: "échéance le",
      hint: "Compare les offres avant le renouvellement.",
    },
  ].filter((d) => d.due);

  const urgent = schedule.filter((r) => r.status === "overdue" || r.status === "soon");
  const never = schedule.filter((r) => r.status === "never");
  const upToDate = schedule.filter((r) => r.status === "ok");

  return (
    <section id="echeances" className="mt-10 scroll-mt-20">
      <h2 className="text-lg font-semibold">Prochaines échéances</h2>

      {dates.length > 0 && (
        <ul className="mt-3 space-y-2">
          {dates.map((d) => {
            const state = dateStatus(d.due, today) ?? "ok";
            return (
              <li key={d.key} className={`flex flex-wrap items-center justify-between gap-2 rounded-md border p-3 text-sm ${TONE[state]}`}>
                <div>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-xs text-neutral-600">
                    {d.prefix} {fr(d.due)}
                    {d.hint ? ` · ${d.hint}` : ""}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${BADGE[state]}`}>{BADGE_TEXT[state]}</span>
              </li>
            );
          })}
        </ul>
      )}

      {vehicleType === "van" && (
        <p className="mt-2 text-xs text-neutral-500">
          Utilitaire : pense au contrôle complémentaire pollution annuel entre deux contrôles techniques.
        </p>
      )}

      {urgent.length > 0 && (
        <ul className="mt-3 space-y-2">
          {urgent.map((row) => {
            const state = row.status === "overdue" ? "overdue" : "soon";
            return (
              <li key={row.item.code} className={`rounded-md border p-3 text-sm ${TONE[state]}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{row.item.label}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${BADGE[state]}`}>{BADGE_TEXT[state]}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600">{[nextLabel(row), lastLabel(row)].filter(Boolean).join(" · ")}</p>
                <a href="#pieces" className="mt-2 inline-block text-xs font-medium underline">
                  Trouver la pièce
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {dates.length === 0 && urgent.length === 0 && (
        <p className="mt-2 text-sm text-neutral-500">
          Rien d&apos;urgent. Renseigne tes échéances (CT, garantie, assurance) et coche ce qui est remplacé à chaque entretien : le
          carnet calcule la suite.
        </p>
      )}

      {(never.length > 0 || upToDate.length > 0) && (
        <details className="mt-3 rounded-md border border-neutral-200 p-3 text-sm">
          <summary className="cursor-pointer font-medium">Tous les éléments suivis</summary>
          <ul className="mt-2 divide-y divide-neutral-100">
            {upToDate.map((row) => (
              <li key={row.item.code} className="flex flex-wrap justify-between gap-2 py-2">
                <span>{row.item.label}</span>
                <span className="text-xs text-neutral-500">Prochain {nextLabel(row)}</span>
              </li>
            ))}
            {never.map((row) => (
              <li key={row.item.code} className="flex flex-wrap justify-between gap-2 py-2">
                <span>{row.item.label}</span>
                <span className="text-xs text-neutral-500">Jamais enregistré</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
