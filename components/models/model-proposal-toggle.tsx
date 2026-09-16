"use client";

import { useState } from "react";
import { ModelProposalForm } from "@/components/models/model-proposal-form";

export function ModelProposalToggle() {
  const [open, setOpen] = useState(false);

  if (open) return <ModelProposalForm />;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="mt-6 text-sm underline"
    >
      Vous ne trouvez pas un modèle ?
    </button>
  );
}