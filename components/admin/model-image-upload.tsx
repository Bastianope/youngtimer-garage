"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateModelCoverImage } from "@/lib/catalogue/actions";

export function ModelImageUpload({
  modelId,
  currentImageUrl,
}: {
  modelId: string;
  currentImageUrl: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl);
  const [isPending, startTransition] = useTransition();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    const supabase = createClient();
    const path = `models/${modelId}-${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("catalogue-images")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(`Échec de l'upload : ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("catalogue-images").getPublicUrl(path);

    startTransition(async () => {
      await updateModelCoverImage(modelId, data.publicUrl);
      setPreview(data.publicUrl);
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Image de couverture du modèle"
          className="h-32 w-48 rounded-md object-cover"
        />
      ) : (
        <div className="flex h-32 w-48 items-center justify-center rounded-md border border-dashed border-black/20 text-xs text-black/50">
          Aucune image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isPending}
        className="text-sm"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
