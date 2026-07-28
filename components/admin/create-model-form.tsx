"use client";

import { useActionState } from "react";
import { createModel, type CatalogueActionResult } from "@/lib/catalogue/actions";
import type { CarMake } from "@/types/catalogue";

const initialState: CatalogueActionResult = {};

export function CreateModelForm({ makes }: { makes: CarMake[] }) {
  const [state, formAction, pending] = useActionState(createModel, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 max-w-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="makeId" className="text-sm font-medium">
          Marque
        </label>
        <select
          id="makeId"
          name="makeId"
          required
          className="rounded-md border border-black/20 px-3 py-2"
        >
          <option value="">Choisir une marque</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nom du modèle
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="E30"
          className="rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description éditoriale (optionnel)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Création..." : "Créer le modèle"}
      </button>
    </form>
  );
}
