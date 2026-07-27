"use client";

import { useActionState } from "react";
import { createGeneration, type CatalogueActionResult } from "@/lib/catalogue/actions";

const initialState: CatalogueActionResult = {};

export function CreateGenerationForm({ modelId }: { modelId: string }) {
  const [state, formAction, pending] = useActionState(createGeneration, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="modelId" value={modelId} />

      <div className="flex flex-col gap-1">
        <label htmlFor="gen-name" className="text-sm font-medium">
          Nom
        </label>
        <input
          id="gen-name"
          name="name"
          required
          placeholder="E30"
          className="w-32 rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="yearStart" className="text-sm font-medium">
          Année début
        </label>
        <input
          id="yearStart"
          name="yearStart"
          type="number"
          placeholder="1982"
          className="w-24 rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="yearEnd" className="text-sm font-medium">
          Année fin
        </label>
        <input
          id="yearEnd"
          name="yearEnd"
          type="number"
          placeholder="1994"
          className="w-24 rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bodyType" className="text-sm font-medium">
          Carrosserie (optionnel)
        </label>
        <input
          id="bodyType"
          name="bodyType"
          placeholder="Berline / Coupé"
          className="w-40 rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "..." : "Ajouter"}
      </button>

      {state.error ? (
        <p role="alert" className="w-full text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
