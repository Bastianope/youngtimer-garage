"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, { text: string; tone: "ok" | "error" }> = {
  publiee: { text: "Annonce publiée. Elle reste visible 90 jours, avec tout l'historique de ta voiture.", tone: "ok" },
  invalide: { text: "Annonce refusée : vérifie le prix, le kilométrage et le contact.", tone: "error" },
  deja: { text: "Cette voiture a déjà une annonce en cours.", tone: "error" },
  erreur: { text: "L'annonce n'a pas pu être enregistrée. Réessaie dans un instant.", tone: "error" },
};

const FIELD_MESSAGES: Record<string, string> = {
  prix: "Annonce refusée : indique un prix en euros, par exemple 12 500.",
  km: "Annonce refusée : le kilométrage doit être un nombre, par exemple 182 000.",
  lieu: "Annonce refusée : la localisation ne doit pas dépasser 80 caractères.",
  pays: "Annonce refusée : choisis le pays dans la liste.",
  contact: "Annonce refusée : indique un moyen de te contacter (3 à 200 caractères).",
  details: "Annonce refusée : la description ne doit pas dépasser 4 000 caractères.",
};

export function SaleNotice() {
  const params = useSearchParams();
  const code = params.get("vente") ?? "";
  const fieldMessage = code === "invalide" ? FIELD_MESSAGES[params.get("champ") ?? ""] : undefined;
  const message = fieldMessage ? { text: fieldMessage, tone: "error" as const } : MESSAGES[code];
  if (!message) return null;

  return (
    <p
      role="status"
      className={`mt-3 rounded-md p-3 text-sm ${
        message.tone === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
      }`}
    >
      {message.text}
    </p>
  );
}
