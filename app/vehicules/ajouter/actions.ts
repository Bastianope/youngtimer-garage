"use server";

import { redirect } from "next/navigation";
import {
  createVehicleWithOwnership,
  searchPublishedGenerations,
  getVersionsForGenerationOptions,
} from "@/lib/queries/vehicles";
import type { VehicleGenerationSearchResult, VehicleVersionOption, VehiclePrivacyLevel } from "@/lib/queries/vehicles";

export async function searchGenerationsAction(query: string): Promise<VehicleGenerationSearchResult[]> {
  return searchPublishedGenerations(query);
}

export async function getVersionsAction(generationId: string): Promise<VehicleVersionOption[]> {
  return getVersionsForGenerationOptions(generationId);
}

export async function createVehicleAction(formData: FormData): Promise<void> {
  const generationId = String(formData.get("generationId") ?? "");
  const versionIdRaw = String(formData.get("versionId") ?? "");
  const vinRaw = String(formData.get("vin") ?? "").trim();
  const chassisRaw = String(formData.get("chassisNumber") ?? "").trim();
  const modelYearRaw = String(formData.get("modelYear") ?? "").trim();
  const mileageRaw = String(formData.get("mileageKm") ?? "").trim();
  const privacyLevel = String(formData.get("privacyLevel") ?? "private") as VehiclePrivacyLevel;

  if (!generationId) throw new Error("Modèle requis");

  const vehicleId = await createVehicleWithOwnership({
    generationId,
    versionId: versionIdRaw || null,
    vin: vinRaw || null,
    chassisNumber: chassisRaw || null,
    modelYear: modelYearRaw ? Number(modelYearRaw) : null,
    mileageKm: mileageRaw ? Number(mileageRaw) : null,
    privacyLevel,
  });

  redirect(`/vehicules/${vehicleId}`);
}
