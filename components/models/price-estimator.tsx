"use client";

import { useState } from "react";
import {
  CONDITION_LABELS,
  HISTORY_LABELS,
  estimatePrice,
  type Condition,
  type History,
} from "@/lib/estimate";

type Props = {
  title: string;
  min: number;
  max: number;
  sourceNote: string | null;
  defaultMileageKm?: number | null;
  defaultHistory?: History;
};

const input = "mt-1 w-full rounded-md border border-neutral-300 p-2 text-sm";
const label = "block text-xs text-neutral-500";

function euros(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

export function PriceEstimator({ title, min, max, sourceNote, defaultMileageKm = null, defaultHistory = "partiel" }: Props) {
  const [condition, setCondition] = useState<Condition>("correct");
  const [history, setHistory] = useState<History>(defaultHistory);
  const [mileage, setMileage] = useState(defaultMileageKm !== null ? String(defaultMileageKm) : "");

  const digits = mileage.replace(/\D/g, "");
  const mileageKm = digits.length > 0 ? Number(digits) : null;
  const result = estimatePrice({ min, max, condition, mileageKm, history });

  return (
    <section className="mt-8 rounded-md border border-neutral-200 p-4">
      <h2 className="text-lg font-semibold">Estimer {title}</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Une fourchette indicative, calculée à partir des prix observés pour ce modèle.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="est-condition">État</label>
          <select
            id="est-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
            className={input}
          >
            {Object.entries(CONDITION_LABELS).map(([value, text]) => (
              <option key={value} value={value}>{text}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="est-km">Kilométrage</label>
          <input
            id="est-km"
            inputMode="numeric"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className={input}
            placeholder="ex. 150 000"
          />
        </div>
        <div>
          <label className={label} htmlFor="est-history">Entretien</label>
          <select
            id="est-history"
            value={history}
            onChange={(e) => setHistory(e.target.value as History)}
            className={input}
          >
            {Object.entries(HISTORY_LABELS).map(([value, text]) => (
              <option key={value} value={value}>{text}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold" aria-live="polite">
        {euros(result.low)} – {euros(result.high)}
      </p>
      <p className="mt-2 text-xs text-neutral-500">
        Estimation indicative, pas une cote : elle s&apos;appuie sur des prix relevés dans des annonces
        ({euros(min)} à {euros(max)} pour ce modèle), encore à vérifier.
        {sourceNote ? ` ${sourceNote}` : ""}
      </p>
    </section>
  );
}
