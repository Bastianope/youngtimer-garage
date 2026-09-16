"use client";

import { useEffect, useState } from "react";
import { VehicleGenerationSearchForm } from "@/components/vehicles/VehicleGenerationSearchForm";
import { getVersionsAction } from "@/app/vehicules/ajouter/actions";
import type {
  VehicleGenerationSearchResult,
  VehicleVersionOption,
  VehicleWithModel,
} from "@/lib/queries/vehicles";

type Props = {
  vehicle: VehicleWithModel;
  updateAction: (formData: FormData) => Promise<void>;
};

export function VehicleEditForm({ vehicle, updateAction }: Props) {
  const [generation, setGeneration] = useState({
    generationId: vehicle.generationId,
    generationName: vehicle.generationName,
    makeName: vehicle.makeName,
    modelName: vehicle.modelName,
  });
  const [changingModel, setChangingModel] = useState(false);
  const [versions, setVersions] = useState<VehicleVersionOption[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState(vehicle.versionId ?? "");

  useEffect(() => {
    let cancelled = false;
    getVersionsAction(generation.generationId).then((result) => {
      if (!cancelled) setVersions(result);
    });
    return () => {
      cancelled = true;
    };
  }, [generation.generationId]);

  function handleSelect(g: VehicleGenerationSearchResult) {
    setGeneration({
      generationId: g.generationId,
      generationName: g.generationName,
      makeName: g.makeName,
      modelName: g.modelName,
    });
    setSelectedVersionId("");
    setChangingModel(false);
  }

  if (changingModel) {
    return <VehicleGenerationSearchForm onSelect={handleSelect} />;
  }

  return (
    <form action={updateAction} className="space-y-4">
      <input type="hidden" name="generationId" value={generation.generationId} />

      <div className="rounded-md border border-neutral-200 p-3">
        <p className="font-medium">{generation.makeName} {generation.modelName}</p>
        <p className="text-sm text-neutral-500">{generation.generationName}</p>
        <button
          type="button"
          onClick={() => setChangingModel(true)}
          className="mt-2 text-sm text-neutral-500 underline"
        >
          Changer de modèle
        </button>
      </div>

      {versions.length > 0 && (
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Version (optionnel)</span>
          <select
            name="versionId"
            value={selectedVersionId}
            onChange={(e) => setSelectedVersionId(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            <option value="">Non précisée</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Année</span>
        <input type="number" name="modelYear" defaultValue={vehicle.modelYear ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Kilométrage</span>
        <input type="number" name="mileageKm" defaultValue={vehicle.mileageKm ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">VIN (optionnel)</span>
        <input type="text" name="vin" defaultValue={vehicle.vin ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Numéro de châssis (optionnel)</span>
        <input type="text" name="chassisNumber" defaultValue={vehicle.chassisNumber ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Prix d&apos;achat (€, optionnel)</span>
        <input type="number" name="purchasePriceAmount" defaultValue={vehicle.purchasePriceAmount ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Date d&apos;achat (optionnel)</span>
        <input type="date" name="purchaseDate" defaultValue={vehicle.purchaseDate ?? ""} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Description et options (optionnel)</span>
        <textarea name="description" defaultValue={vehicle.description ?? ""} rows={4} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Visibilité</span>
        <select name="privacyLevel" defaultValue={vehicle.privacyLevel} className="w-full rounded-md border border-neutral-300 px-3 py-2">
          <option value="private">Privé</option>
          <option value="unlisted">Non répertorié</option>
          <option value="public">Public</option>
        </select>
      </label>

      <button type="submit" className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white">
        Enregistrer les modifications
      </button>
    </form>
  );
}