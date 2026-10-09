"use client";

import { useSearchParams } from "next/navigation";

const MESSAGES: Record<string, { text: string; tone: "ok" | "error" }> = {
  activee: { text: "Alerte activée : tu recevras un e-mail à chaque nouvelle annonce de ce modèle.", tone: "ok" },
  desactivee: { text: "Alerte désactivée.", tone: "ok" },
  erreur: { text: "L'alerte n'a pas pu être modifiée. Réessaie dans un instant.", tone: "error" },
};

export function ListingAlertNotice() {
  const params = useSearchParams();
  const message = MESSAGES[params.get("alerte") ?? ""];
  if (!message) return null;

  return (
    <p
      role="status"
      className={`mt-2 rounded-md p-3 text-sm ${
        message.tone === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
      }`}
    >
      {message.text}
    </p>
  );
}
