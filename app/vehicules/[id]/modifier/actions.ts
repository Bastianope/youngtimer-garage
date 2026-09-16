"use server";

import { redirect } from "next/navigation";
import { updateVehicle } from "@/lib/queries/vehicles";
import type { VehiclePrivacyLevel } from "@/lib/queries/vehicles";

export async function updateVehicleAction(vehicleId: string, formData: FormData): Promise<void> {
  const generationId = String(formData.get("generationId") ?? "");
  const versionIdRaw = String(formData.get("versionId") ?? "");
  const vinRaw = String(formData.get("vin") ?? "").trim();
  const chassisRaw = String(formData.get("chassisNumber") ?? "").trim();
  const modelYearRaw = String(formData.get("modelYear") ?? "").trim();
  const mileageRaw = String(formData.get("mileageKm") ?? "").trim();
  const privacyLevel = String(formData.get("privacyLevel") ?? "private") as VehiclePrivacyLevel;
  const purchasePriceRaw = String(formData.get("purchasePriceAmount") ?? "").trim();
  const purchaseDateRaw = String(formData.get("purchaseDate") ?? "").trim();
  const descriptionRaw = String(formData.get("description") ?? "").trim();

  if (!generationId) throw new Error("Modèle requis");

  await updateVehicle(vehicleId, {
    generationId,
    versionId: versionIdRaw || null,
    vin: vinRaw || null,
    chassisNumber: chassisRaw || null,
    modelYear: modelYearRaw ? Number(modelYearRaw) : null,
    mileageKm: mileageRaw ? Number(mileageRaw) : null,
    privacyLevel,
    purchasePriceAmount: purchasePriceRaw ? Number(purchasePriceRaw) : null,
    purchaseDate: purchaseDateRaw || null,
    description: descriptionRaw || null,
  });

  redirect(`/vehicules/${vehicleId}`);
}