"use client";

import { useState } from "react";
import { GarageModelProposalForm } from "@/components/garage/garage-model-proposal-form";

export function GarageModelProposalToggle() {
  const [open, setOpen] = useState(false);

  if (open) return <GarageModelProposalForm />;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="mt-6 text-sm underline"
    >
      Ton véhicule n&apos;est pas dans la liste ?
    </button>
  );
}