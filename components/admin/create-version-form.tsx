"use client";

import { useActionState } from "react";
import { createVersion, type CatalogueActionResult } from "@/lib/catalogue/actions";

const initialState: CatalogueActionResult = {};

export function CreateVersionForm({
  generationId,
  modelId,
}: {
  generationId: string;
  modelId: string;
}) {
  const [state, formAction, pending] = useActionState(createVersion, initialState);

  return (
    <form action={formAction} className="mt-2 flex flex-wrap items-end gap-2">
      <input type="hidden" name="generationId" value={generationId} />
      <input type="hidden" name="modelId" value={modelId} />

      <input
        name="name"
        required
        placeholder="325i"
        className="w-28 rounded-md border border-black/20 px-2 py-1 text-sm"
      />
      <input
        name="engineDescription"
        placeholder="Moteur (texte libre, à vérifier)"
        className="w-64 rounded-md border border-black/20 px-2 py-1 text-sm"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-black/20 px-3 py-1 text-sm disabled:opacity-50"
      >
        {pending ? "..." : "+ Version"}
      </button>

      {state.error ? (
        <p role="alert" className="w-full text-xs text-red-600">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
