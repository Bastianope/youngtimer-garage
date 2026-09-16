"use client";

import { useState, useTransition } from "react";
import { proposeVehicleModelAction } from "@/app/vehicules/ajouter/actions";
import type { VehicleGenerationSearchResult } from "@/lib/queries/vehicles";

type Props = {
  onCreated: (generation: VehicleGenerationSearchResult) => void;
  onCancel: () => void;
};

export function VehicleModelProposalForm({ onCreated, onCancel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const generation = await proposeVehicleModelAction(formData);
        onCreated(generation);
      } catch {
        setError("Impossible d'ajouter ce modèle. Vérifie les champs et réessaie.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-md border border-neutral-200 p-4">
      <div>
        <p className="text-sm font-medium">Ton véhicule n&apos;est pas dans la liste ?</p>
        <p className="mt-1 text-xs text-neutral-500">
          Ajoute-le ci-dessous. Il sera visible immédiatement, marqué « à vérifier », et complété par la suite si besoin.
        </p>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Marque</span>
        <input type="text" name="makeName" required className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Modèle</span>
        <input type="text" name="modelName" required className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Génération / version (ex: W124, Phase 2...)</span>
        <input type="text" name="generationName" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Année de début</span>
          <input type="number" name="yearStart" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Année de fin</span>
          <input type="number" name="yearEnd" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Carrosserie (optionnel)</span>
        <input type="text" name="bodyType" placeholder="Berline, Coupé, Cabriolet..." className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50">
          {isPending ? "Ajout..." : "Ajouter ce modèle"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-neutral-300 px-4 py-2 text-sm">
          Annuler
        </button>
      </div>
    </form>
  );
}