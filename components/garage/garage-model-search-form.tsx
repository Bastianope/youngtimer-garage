"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Formulaire de recherche dédié au flux "+ Ajouter une voiture".
 * Volontairement distinct de ModelSearchForm (utilisé sur /modeles) :
 * ce dernier soumet vers /modeles et n'a pas été inspecté en détail —
 * le modifier à l'aveugle risquait de casser la page publique existante.
 */
export function GarageModelSearchForm({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (value) params.set("q", value);
        router.push(`/garage/ajouter?${params.toString()}`);
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Rechercher un modèle (ex. Golf GTI)"
        className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded-md border border-black/20 px-4 py-2 text-sm"
      >
        Rechercher
      </button>
    </form>
  );
}
