"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { proposeVehicleModelAction } from "@/app/vehicules/ajouter/actions";

export function ModelProposalForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const generation = await proposeVehicleModelAction(formData);
        router.push(`/modeles/${generation.slugMake}/${generation.slugModel}`);
      } catch {
        setError("Impossible d'ajouter ce modèle. Vérifie les champs et réessaie.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="mt-4 space-y-4 rounded-md border border-black/20 p-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Marque</span>
        <input type="text" name="makeName" required className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Modèle</span>
        <input type="text" name="modelName" required className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Génération / version (ex: W124, Phase 2...)</span>
        <input type="text" name="generationName" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Année de début</span>
          <input type="number" name="yearStart" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Année de fin</span>
          <input type="number" name="yearEnd" className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium">Carrosserie (optionnel)</span>
        <input type="text" name="bodyType" placeholder="Berline, Coupé, Cabriolet..." className="w-full rounded-md border border-black/20 px-3 py-2 text-sm" />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={isPending} className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50">
        {isPending ? "Ajout..." : "Ajouter ce modèle"}
      </button>
    </form>
  );
}