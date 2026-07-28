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
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function runSearch() {
    if (query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    startTransition(async () => {
      const found = await searchGenerationsAction(query);
      setResults(found);
      setHasSearched(true);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un modèle (ex: Golf GTI, 205 GTI...)"
          className="w-full rounded-md border border-neutral-300 px-3 py-2"
        />
        <button
          type="button"
          onClick={runSearch}
          className="whitespace-nowrap rounded-md border border-neutral-300 px-4 py-2 text-sm"
        >
          Rechercher
        </button>
      </div>
      {isPending && <p className="text-sm text-neutral-500">Recherche...</p>}
      {!isPending && hasSearched && results.length === 0 && (
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
