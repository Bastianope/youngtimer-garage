// Calcul des prochaines échéances d'entretien, sans accès base (testable).

export type ItemCategory =
  | "moteur"
  | "filtres"
  | "liquides"
  | "distribution"
  | "freinage"
  | "liaison_sol"
  | "electricite"
  | "divers";

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  moteur: "Moteur",
  filtres: "Filtres",
  liquides: "Liquides",
  distribution: "Distribution et courroies",
  freinage: "Freinage",
  liaison_sol: "Pneus et liaison au sol",
  electricite: "Électricité",
  divers: "Divers",
};

export type MaintenanceItemType = {
  code: string;
  label: string;
  category: ItemCategory;
  defaultIntervalKm: number | null;
  defaultIntervalMonths: number | null;
};

export type IntervalOverride = { intervalKm: number | null; intervalMonths: number | null };

export type DoneRecord = { performedAt: string | null; mileageKm: number | null; itemCodes: string[] };

export type DueStatus = "overdue" | "soon" | "ok" | "never" | "untracked";

export type ItemSchedule = {
  item: MaintenanceItemType;
  intervalKm: number | null;
  intervalMonths: number | null;
  lastDate: string | null;
  lastKm: number | null;
  nextDate: string | null;
  nextKm: number | null;
  status: DueStatus;
};

export const SOON_KM = 1500;
export const SOON_DAYS = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

function toDay(value: string): Date {
  return new Date(`${value.slice(0, 10)}T00:00:00Z`);
}

function iso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addMonths(value: string, months: number): string {
  const d = toDay(value);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return iso(d);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((toDay(to).getTime() - toDay(from).getTime()) / DAY_MS);
}

// Statut d'une date d'échéance seule (CT, garantie, assurance…)
export function dateStatus(due: string | null, today: string, soonDays = SOON_DAYS): "overdue" | "soon" | "ok" | null {
  if (!due) return null;
  const left = daysBetween(today, due);
  if (left < 0) return "overdue";
  if (left <= soonDays) return "soon";
  return "ok";
}

// Kilométrage actuel estimé : le plus grand entre la fiche véhicule et les entretiens saisis
export function currentMileage(vehicleKm: number | null, records: DoneRecord[]): number | null {
  const values = [vehicleKm, ...records.map((r) => r.mileageKm)].filter((v): v is number => typeof v === "number");
  return values.length > 0 ? Math.max(...values) : null;
}

export function computeSchedule(input: {
  itemTypes: MaintenanceItemType[];
  overrides: Record<string, IntervalOverride>;
  records: DoneRecord[];
  vehicleMileageKm: number | null;
  today: string;
}): ItemSchedule[] {
  const km = currentMileage(input.vehicleMileageKm, input.records);

  return input.itemTypes.map((item) => {
    const override = input.overrides[item.code];
    const intervalKm = override ? override.intervalKm : item.defaultIntervalKm;
    const intervalMonths = override ? override.intervalMonths : item.defaultIntervalMonths;

    // Dernier remplacement : le plus récent par date, à défaut par kilométrage
    const done = input.records
      .filter((r) => r.itemCodes.includes(item.code))
      .sort((a, b) => {
        if (a.performedAt && b.performedAt) return b.performedAt.localeCompare(a.performedAt);
        if (a.performedAt) return -1;
        if (b.performedAt) return 1;
        return (b.mileageKm ?? 0) - (a.mileageKm ?? 0);
      });
    const last = done[0] ?? null;
    const lastDate = last?.performedAt ?? null;
    const lastKm = last?.mileageKm ?? null;

    const nextDate = lastDate && intervalMonths ? addMonths(lastDate, intervalMonths) : null;
    const nextKm = lastKm !== null && intervalKm ? lastKm + intervalKm : null;

    let status: DueStatus;
    if (!intervalKm && !intervalMonths) {
      status = "untracked";
    } else if (!last) {
      status = "never";
    } else {
      const dateState = dateStatus(nextDate, input.today);
      const kmLeft = nextKm !== null && km !== null ? nextKm - km : null;
      const kmState = kmLeft === null ? null : kmLeft < 0 ? "overdue" : kmLeft <= SOON_KM ? "soon" : "ok";
      const states = [dateState, kmState];
      status = states.includes("overdue") ? "overdue" : states.includes("soon") ? "soon" : "ok";
    }

    return { item, intervalKm, intervalMonths, lastDate, lastKm, nextDate, nextKm, status };
  });
}

// Premier contrôle technique : dans les 6 mois avant les 4 ans de la 1re mise en circulation,
// puis tous les 2 ans. Renvoie la date limite du prochain CT à partir du dernier CT ou de la mise en circulation.
export function nextCtDeadline(input: { lastCtDate: string | null; firstRegistration: string | null }): string | null {
  if (input.lastCtDate) return addMonths(input.lastCtDate, 24);
  if (input.firstRegistration) return addMonths(input.firstRegistration, 48);
  return null;
}
