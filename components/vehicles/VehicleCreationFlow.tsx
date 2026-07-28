"use client";

import { useEffect, useState } from "react";
import { VehicleGenerationSearchForm } from "@/components/vehicles/VehicleGenerationSearchForm";
import { createVehicleAction, getVersionsAction } from "@/app/vehicules/ajouter/actions";
import type { VehicleGenerationSearchResult, VehicleVersionOption } from "@/lib/queries/vehicles";

export function VehicleCreationFlow() {
  const [selected, setSelected] = useState<VehicleGenerationSearchResult | null>(null);
  const [versions, setVersions] = useState<VehicleVersionOption[]>([]);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    getVersionsAction(selected.generationId).then((result) => {
      if (!cancelled) setVersions(result);
    });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  function handleSelect(generation: VehicleGenerationSearchResult) {
    setVersions([]);
    setSelected(generation);
  }

  function handleReset() {
    setVersions([]);
    setSelected(null);
  }

  if (!selected) {
    return <VehicleGenerationSearchForm onSelect={handleSelect} />;
  }

  return (
    <form action={createVehicleAction} className="space-y-4">
      <input type="hidden" name="generationId" value={selected.generationId} />

      <div className="rounded-md border border-neutral-200 p-3">
        <p className="font-medium">{selected.makeName} {selected.modelName}</p>
        <p className="text-sm text-neutral-500">{selected.generationName}</p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 text-sm text-neutral-500 underline"
        >
          Changer de modèle
        </button>
      </div>

      {versions.length > 0 && (
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Version (optionnel)</span>
          <select name="versionId" className="w-full rounded-md border border-neutral-300 px-3 py-2">
            <option value="">Non précisée</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Année</span>
        <input type="number" name="modelYear" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Kilométrage</span>
        <input type="number" name="mileageKm" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">VIN (optionnel)</span>
        <input type="text" name="vin" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Numéro de châssis (optionnel)</span>
        <input type="text" name="chassisNumber" className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Visibilité</span>
        <select name="privacyLevel" defaultValue="private" className="w-full rounded-md border border-neutral-300 px-3 py-2">
          <option value="private">Privé</option>
          <option value="unlisted">Non répertorié</option>
          <option value="public">Public</option>
        </select>
      </label>

      <button type="submit" className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white">
        Créer le véhicule
      </button>
    </form>
  );
}
