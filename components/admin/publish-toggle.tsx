"use client";

import { useTransition } from "react";
import { togglePublishModel } from "@/lib/catalogue/actions";

export function PublishToggle({
  modelId,
  isPublished,
}: {
  modelId: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await togglePublishModel(modelId, !isPublished);
        })
      }
      className={
        isPublished
          ? "rounded-md border border-black/20 px-4 py-2 text-sm"
          : "rounded-md bg-black px-4 py-2 text-sm text-white"
      }
    >
      {isPending
        ? "..."
        : isPublished
          ? "Dépublier"
          : "Publier"}
    </button>
  );
}
