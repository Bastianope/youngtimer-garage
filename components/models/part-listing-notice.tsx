"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, { text: string; tone: "ok" | "error" }> = {
  publiee: { text: "Annonce publiée. Elle reste visible 90 jours.", tone: "ok" },
  invalide: { text: "Annonce refusée : vérifie le titre (3 à 120 caractères), le prix et le contact.", tone: "error" },
  limite: { text: "Limite atteinte : 10 annonces maximum par 24 heures.", tone: "error" },
  erreur: { text: "L'annonce n'a pas pu être enregistrée. Réessaie dans un instant.", tone: "error" },
};

export function PartListingNotice() {
  const params = useSearchParams();
  const message = MESSAGES[params.get("annonce") ?? ""];
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
