"use server";

import { redirect } from "next/navigation";
import {
  createVehicleWithOwnership,
  searchPublishedGenerations,
  getVersionsForGenerationOptions,
  proposeVehicleModel,
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
export async function proposeVehicleModelAction(
  formData: FormData
): Promise<VehicleGenerationSearchResult> {
  const makeName = String(formData.get("makeName") ?? "").trim();
  const modelName = String(formData.get("modelName") ?? "").trim();
  const generationName = String(formData.get("generationName") ?? "").trim();
  const yearStartRaw = String(formData.get("yearStart") ?? "").trim();
  const yearEndRaw = String(formData.get("yearEnd") ?? "").trim();
  const bodyTypeRaw = String(formData.get("bodyType") ?? "").trim();

  if (!makeName || !modelName) throw new Error("Marque et modèle requis");

  return proposeVehicleModel({
    makeName,
    modelName,
    generationName,
    yearStart: yearStartRaw ? Number(yearStartRaw) : null,
    yearEnd: yearEndRaw ? Number(yearEndRaw) : null,
    bodyType: bodyTypeRaw || null,
  });
}