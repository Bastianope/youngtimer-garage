"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, { text: string; tone: "ok" | "error" }> = {
  publiee: { text: "Annonce publiée. Elle reste visible 90 jours.", tone: "ok" },
  invalide: { text: "Annonce refusée : vérifie le titre (3 à 120 caractères), le prix et le contact.", tone: "error" },
  limite: { text: "Limite atteinte : 10 annonces maximum par 24 heures.", tone: "error" },
  erreur: { text: "L'annonce n'a pas pu être enregistrée. Réessaie dans un instant.", tone: "error" },
};

// Message précis selon le champ refusé
const FIELD_MESSAGES: Record<string, string> = {
  type: "Annonce refusée : choisis « Je cherche » ou « Je vends ».",
  titre: "Annonce refusée : le nom de la pièce doit faire entre 3 et 120 caractères.",
  details: "Annonce refusée : les détails ne doivent pas dépasser 2 000 caractères.",
  prix: "Annonce refusée : le prix doit être compris entre 0 et 100 000 €, par exemple 70.",
  lieu: "Annonce refusée : la localisation ne doit pas dépasser 80 caractères.",
  contact: "Annonce refusée : indique un moyen de te contacter (3 à 200 caractères).",
};

export function PartListingNotice() {
  const params = useSearchParams();
  const code = params.get("annonce") ?? "";
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
