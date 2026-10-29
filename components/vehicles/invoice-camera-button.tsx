"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { attachDocumentAction, quickInvoiceAction } from "@/lib/actions/maintenance";
import { extensionFor, resizeImage } from "@/lib/utils/resize-image";

const BUCKET = "vehicle-documents";

type Props = {
  vehicleId: string;
  // Sans entretien : crée un entretien « fait aujourd'hui » avec la facture, puis ouvre le formulaire pour le compléter.
  // Avec entretien : ajoute le document à cet entretien.
  maintenanceRecordId?: string;
  variant?: "primary" | "link";
};

export function InvoiceCameraButton({ vehicleId, maintenanceRecordId, variant = "primary" }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const blob = await resizeImage(file);
      const path = `${vehicleId}/${crypto.randomUUID()}.${extensionFor(blob, file.name)}`;
      const { error: uploadError } = await createClient()
        .storage.from(BUCKET)
        .upload(path, blob, { contentType: blob.type || file.type || "application/octet-stream", upsert: false });
      if (uploadError) throw new Error(`Échec de l'envoi : ${uploadError.message}`);

      if (maintenanceRecordId) {
        await attachDocumentAction(vehicleId, { storagePath: path, maintenanceRecordId, label: "Facture", docType: "invoice" });
        router.refresh();
      } else {
        const recordId = await quickInvoiceAction(vehicleId, { storagePath: path });
        router.push(`/vehicules/${vehicleId}?completer=${recordId}#entretien-${recordId}`);
        router.refresh();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Facture non enregistrée");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Pas d'attribut capture : le téléphone propose « Prendre une photo », la photothèque ou un PDF */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFile}
        disabled={busy}
        className="sr-only"
        aria-label="Photo ou PDF de la facture"
      />
      {variant === "primary" ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-4 text-base font-medium text-white disabled:opacity-60"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
            <circle cx="12" cy="13.5" r="3.5" />
          </svg>
          {busy ? "Envoi de la facture…" : "Photographier une facture"}
        </button>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="text-xs text-neutral-500 underline">
          {busy ? "Envoi…" : "Ajouter une facture"}
        </button>
      )}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
