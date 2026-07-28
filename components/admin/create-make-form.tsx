"use client";

import { useActionState } from "react";
import { createMake, type CatalogueActionResult } from "@/lib/catalogue/actions";

const initialState: CatalogueActionResult = {};

export function CreateMakeForm() {
  const [state, formAction, pending] = useActionState(createMake, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nom de la marque
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="BMW"
          className="rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="countryOrigin" className="text-sm font-medium">
          Pays d&apos;origine (optionnel)
        </label>
        <input
          id="countryOrigin"
          name="countryOrigin"
          placeholder="Allemagne"
          className="rounded-md border border-black/20 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Création..." : "Ajouter"}
      </button>

      {state.error ? (
        <p role="alert" className="w-full text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
