"use client";

import { useState, useTransition } from "react";
import { searchGenerationsAction } from "@/app/vehicules/ajouter/actions";
import type { VehicleGenerationSearchResult } from "@/lib/queries/vehicles";

type Props = {
  onSelect: (generation: VehicleGenerationSearchResult) => void;
};

export function VehicleGenerationSearchForm({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VehicleGenerationSearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    startTransition(async () => {
      const found = await searchGenerationsAction(value);
      setResults(found);
    });
  }

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Rechercher un modèle (ex: Golf GTI, 205 GTI...)"
        className="w-full rounded-md border border-neutral-300 px-3 py-2"
      />
      {isPending && <p className="text-sm text-neutral-500">Recherche...</p>}
      {!isPending && query.trim().length >= 2 && results.length === 0 && (
        <p className="text-sm text-neutral-500">Aucun modèle ne correspond.</p>
      )}
      <ul className="divide-y divide-neutral-200">
        {results.map((result) => (
          <li key={result.generationId}>
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="w-full py-2 text-left hover:bg-neutral-50"
            >
              <span className="font-medium">{result.makeName} {result.modelName}</span>
              <span className="ml-2 text-sm text-neutral-500">{result.generationName}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
