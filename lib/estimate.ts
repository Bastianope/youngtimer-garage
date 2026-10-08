// Estimation indicative du prix d'un youngtimer, à partir de la fourchette de prix observés du modèle.
// Ce n'est pas une cote : la fourchette vient d'annonces relevées, l'état et l'historique la précisent.

export type Condition = "a_restaurer" | "correct" | "tres_bon" | "exceptionnel";
export type History = "complet" | "partiel" | "inconnu";

export const CONDITION_LABELS: Record<Condition, string> = {
  a_restaurer: "À restaurer",
  correct: "Correct, roulant",
  tres_bon: "Très bon état",
  exceptionnel: "Exceptionnel, état concours",
};

export const HISTORY_LABELS: Record<History, string> = {
  complet: "Historique d'entretien complet",
  partiel: "Historique partiel",
  inconnu: "Pas d'historique",
};

// Position dans la fourchette observée (0 = prix le plus bas, 1 = prix le plus haut)
const CONDITION_SPAN: Record<Condition, [number, number]> = {
  a_restaurer: [0, 0.2],
  correct: [0.2, 0.5],
  tres_bon: [0.5, 0.8],
  exceptionnel: [0.8, 1],
};

const HISTORY_FACTOR: Record<History, number> = {
  complet: 1.05,
  partiel: 1,
  inconnu: 0.93,
};

// Au-delà de cet écart entre prix bas et prix haut, les données sont trop dispersées pour estimer
export const MAX_RANGE_RATIO = 6;

export function canEstimate(min: number | null, max: number | null): boolean {
  return min !== null && max !== null && min > 0 && max > min && max / min <= MAX_RANGE_RATIO;
}

function mileageFactor(km: number | null): number {
  if (km === null) return 1;
  if (km < 80000) return 1.08;
  if (km < 150000) return 1;
  if (km < 250000) return 0.94;
  return 0.88;
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function estimatePrice(input: {
  min: number;
  max: number;
  condition: Condition;
  mileageKm: number | null;
  history: History;
}): { low: number; high: number } {
  const [from, to] = CONDITION_SPAN[input.condition];
  const factor = mileageFactor(input.mileageKm) * HISTORY_FACTOR[input.history];
  const span = input.max - input.min;
  const step = input.max >= 20000 ? 500 : 100;
  const low = roundTo((input.min + span * from) * factor, step);
  const high = roundTo((input.min + span * to) * factor, step);
  return { low, high: Math.max(high, low + step) };
}
