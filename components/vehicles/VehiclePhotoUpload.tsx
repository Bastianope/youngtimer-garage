"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { registerPhotoAction } from "@/lib/actions/vehicle-pedigree";

const MAX_SIDE = 2000;

// Réduit la photo à 2000 px max (les photos de téléphone font souvent 5 Mo et plus)
async function resizeImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file;
  }
}

export function VehiclePhotoUpload({ vehicleId, vehicleIsPublic }: { vehicleId: string; vehicleIsPublic: boolean }) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(vehicleIsPublic);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    setBusy(true);
    setError(null);
    const supabase = createClient();
    const bucket = isPublic ? "vehicle-media-public" : "vehicle-media-private";

    for (const [index, file] of files.entries()) {
      setStatus(`Envoi de la photo ${index + 1} sur ${files.length}…`);
      const blob = await resizeImage(file);
      const path = `${vehicleId}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, blob, { contentType: blob.type || "image/jpeg", upsert: false });
      if (uploadError) {
        setError(`Échec de l'envoi : ${uploadError.message}`);
        break;
      }
      try {
        await registerPhotoAction(vehicleId, { storagePath: path, isPublic, caption: caption.trim() || null });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Photo non enregistrée");
        break;
      }
    }

    setBusy(false);
    setStatus(null);
    setCaption("");
    router.refresh();
  }

  return (
    <div className="rounded-md border border-dashed border-neutral-300 p-4">
      <p className="text-sm font-medium">Ajouter des photos</p>
      <div className="mt-3 flex flex-col gap-3">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Légende (facultatif), ex. : Côte d'Émeraude, août 2025"
          className="w-full rounded-md border border-neutral-300 p-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          Visibles par tous (si le véhicule est public)
        </label>
        <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={busy} className="text-sm" />
        {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </div>
  );
}
