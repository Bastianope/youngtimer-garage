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
  // Échéance estimée la plus proche (date ou kilométrage converti au rythme annuel)
  dueDate: string | null;
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

// Kilométrage le plus élevé connu (fiche véhicule et entretiens), sans estimation
export function currentMileage(vehicleKm: number | null, records: DoneRecord[]): number | null {
  const values = [vehicleKm, ...records.map((r) => r.mileageKm)].filter((v): v is number => typeof v === "number");
  return values.length > 0 ? Math.max(...values) : null;
}

// ---------- Kilométrage estimé ----------
// Personne ne met son compteur à jour chaque semaine : on estime le kilométrage du jour
// à partir des relevés datés (fiche véhicule, entretiens, factures, CT) et d'une moyenne annuelle.

export type MileageReading = { date: string; km: number };

export type MileageEstimate = {
  estimatedKm: number | null;
  annualKm: number | null;
  source: "calcul" | "declare" | null;
  lastReading: MileageReading | null;
};

// Écart minimal entre deux relevés pour calculer une moyenne fiable
export const MIN_SPAN_DAYS = 90;

export function cleanReadings(readings: (MileageReading | { date: string | null; km: number | null })[]): MileageReading[] {
  return readings
    .filter((r): r is MileageReading => typeof r.km === "number" && r.km >= 0 && typeof r.date === "string" && r.date.length >= 10)
    .sort((a, b) => a.date.localeCompare(b.date) || a.km - b.km);
}

// Moyenne annuelle tirée des relevés : du premier au dernier relevé, si l'écart est suffisant
export function computedAnnualKm(readings: MileageReading[]): number | null {
  if (readings.length < 2) return null;
  const first = readings[0];
  const last = readings[readings.length - 1];
  const days = daysBetween(first.date, last.date);
  const diff = last.km - first.km;
  if (days < MIN_SPAN_DAYS || diff <= 0) return null;
  return Math.round(((diff / days) * 365) / 100) * 100;
}

export function estimateMileage(input: {
  readings: (MileageReading | { date: string | null; km: number | null })[];
  declaredAnnualKm: number | null;
  today: string;
}): MileageEstimate {
  const readings = cleanReadings(input.readings);
  const lastReading = readings.length > 0 ? readings.reduce((a, b) => (b.km >= a.km ? b : a)) : null;
  const computed = computedAnnualKm(readings);
  const annualKm = computed ?? (input.declaredAnnualKm && input.declaredAnnualKm > 0 ? input.declaredAnnualKm : null);
  const source = computed ? "calcul" : annualKm ? "declare" : null;

  if (!lastReading) return { estimatedKm: null, annualKm, source, lastReading: null };
  if (!annualKm) return { estimatedKm: lastReading.km, annualKm: null, source: null, lastReading };

  const days = Math.max(0, daysBetween(lastReading.date, input.today));
  const estimated = lastReading.km + (annualKm * days) / 365;
  return { estimatedKm: Math.round(estimated / 100) * 100, annualKm, source, lastReading };
}

// Date à laquelle un kilométrage sera atteint, au rythme annuel estimé
export function dateForMileage(targetKm: number, estimate: MileageEstimate): string | null {
  if (!estimate.annualKm || !estimate.lastReading) return null;
  const days = Math.ceil(((targetKm - estimate.lastReading.km) / estimate.annualKm) * 365);
  const d = toDay(estimate.lastReading.date);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
}

function earliest(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a < b ? a : b;
}

export function computeSchedule(input: {
  itemTypes: MaintenanceItemType[];
  overrides: Record<string, IntervalOverride>;
  records: DoneRecord[];
  estimate: MileageEstimate;
  today: string;
}): ItemSchedule[] {
  const km = input.estimate.estimatedKm;

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
    // Échéance unique : la plus proche entre la date et le kilométrage converti en date
    const dueDate = earliest(nextDate, nextKm !== null ? dateForMileage(nextKm, input.estimate) : null);

    let status: DueStatus;
    if (!intervalKm && !intervalMonths) {
      status = "untracked";
    } else if (!last) {
      status = "never";
    } else {
      const dateState = dateStatus(dueDate, input.today);
      const kmLeft = nextKm !== null && km !== null ? nextKm - km : null;
      const kmState = kmLeft === null ? null : kmLeft < 0 ? "overdue" : kmLeft <= SOON_KM ? "soon" : "ok";
      const states = [dateState, kmState];
      status = states.includes("overdue") ? "overdue" : states.includes("soon") ? "soon" : "ok";
    }

    return { item, intervalKm, intervalMonths, lastDate, lastKm, nextDate, nextKm, dueDate, status };
  });
}

// Premier contrôle technique : dans les 6 mois avant les 4 ans de la 1re mise en circulation,
// puis tous les 2 ans. Renvoie la date limite du prochain CT à partir du dernier CT ou de la mise en circulation.
export function nextCtDeadline(input: { lastCtDate: string | null; firstRegistration: string | null }): string | null {
  if (input.lastCtDate) return addMonths(input.lastCtDate, 24);
  if (input.firstRegistration) return addMonths(input.firstRegistration, 48);
  return null;
}
