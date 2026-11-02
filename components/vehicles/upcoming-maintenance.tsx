import { dateStatus, type ItemSchedule, type MileageEstimate } from "@/lib/maintenance/schedule";
import type { VehicleReminders } from "@/lib/queries/maintenance";
import { INSURANCE_COMPARATORS, withSource } from "@/lib/partner-links";

type Props = {
  schedule: ItemSchedule[];
  reminders: VehicleReminders;
  vehicleType: "car" | "van";
  estimate: MileageEstimate;
  updateMileage: (formData: FormData) => Promise<void>;
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

// « mars 2027 »
function month(value: string | null) {
  return value ? new Date(value).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : null;
}

// Échéance lisible : d'abord la date estimée, le kilométrage en complément
function nextLabel(row: ItemSchedule) {
  const when = month(row.dueDate);
  const parts = [when ? `vers ${when}` : null, km(row.nextKm) ? `ou à ${km(row.nextKm)}` : null].filter(Boolean);
  return parts.join(" ");
}

function lastLabel(row: ItemSchedule) {
  const parts = [fr(row.lastDate), km(row.lastKm)].filter(Boolean).join(" · ");
  return parts ? `Dernier : ${parts}` : null;
}

// Bloc « Prochaines échéances » de la fiche véhicule (propriétaire uniquement)
export function UpcomingMaintenance({ schedule, reminders, vehicleType, estimate, updateMileage, today }: Props) {
  const mileageKm = estimate.estimatedKm;
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
      hint: null,
    },
  ].filter((d) => d.due);

  const urgent = schedule.filter((r) => r.status === "overdue" || r.status === "soon");
  const never = schedule.filter((r) => r.status === "never");
  const upToDate = schedule.filter((r) => r.status === "ok");

  return (
    <section id="echeances" className="mt-10 scroll-mt-20">
      <h2 className="text-lg font-semibold">Prochaines échéances</h2>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 rounded-md bg-neutral-50 p-3 text-sm">
        <div>
          <p className="text-xs text-neutral-500">Kilométrage {estimate.annualKm ? "estimé aujourd'hui" : "connu"}</p>
          <p className="font-medium">
            {estimate.estimatedKm !== null ? `${estimate.annualKm ? "≈ " : ""}${km(estimate.estimatedKm)}` : "Non renseigné"}
          </p>
          <p className="text-xs text-neutral-500">
            {estimate.annualKm
              ? `${estimate.annualKm.toLocaleString("fr-FR")} km/an ${estimate.source === "calcul" ? "d'après tes relevés" : "déclarés"}`
              : "Indique tes km/an dans « Échéances » pour estimer les dates."}
            {estimate.lastReading ? ` · dernier relevé le ${fr(estimate.lastReading.date)}` : ""}
          </p>
        </div>
        <form action={updateMileage} className="flex items-end gap-2">
          <div>
            <label htmlFor="quick-km" className="block text-xs text-neutral-500">Compteur actuel</label>
            <input
              id="quick-km"
              name="mileageKm"
              inputMode="numeric"
              required
              placeholder="ex. 172300"
              className="w-32 rounded-md border border-neutral-300 p-2 text-sm"
            />
          </div>
          <button type="submit" className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm">
            Mettre à jour
          </button>
        </form>
      </div>

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

      <div className="mt-4 rounded-md border border-neutral-200 p-4">
        <h3 className="text-sm font-medium">Assurance</h3>
        <p className="mt-1 text-xs text-neutral-600">
          {reminders.insuranceRenewalDate
            ? `Échéance le ${fr(reminders.insuranceRenewalDate)} : compare les offres avant le renouvellement.`
            : "Compare les offres, et renseigne ta date d'échéance pour être prévenu avant le renouvellement."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {INSURANCE_COMPARATORS.map((link) => (
            <a
              key={link.url}
              href={withSource(link.url)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Pour une voiture ancienne qui roule peu, demande aussi un devis à un assureur spécialisé collection.
        </p>
      </div>

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
