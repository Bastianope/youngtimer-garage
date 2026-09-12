"use server";

import { redirect } from "next/navigation";
import {
  createOwnedVehicleAndGarageItem,
  type VehiclePrivacyLevel,
} from "@/lib/queries/vehicles";

export async function createOwnedVehicleAction(formData: FormData) {
  const generationId = formData.get("generationId");
  if (typeof generationId !== "string" || generationId.length === 0) {
    throw new Error("Génération manquante.");
  }

  const modelYearRaw = formData.get("modelYear");
  const modelYear = typeof modelYearRaw === "string" && modelYearRaw.length > 0 ? Number(modelYearRaw) : null;

  const mileageKmRaw = formData.get("mileageKm");
  const mileageKm = typeof mileageKmRaw === "string" && mileageKmRaw.length > 0 ? Number(mileageKmRaw) : null;

  const vinRaw = formData.get("vin");
  const vin = typeof vinRaw === "string" && vinRaw.length > 0 ? vinRaw : null;

  const chassisNumberRaw = formData.get("chassisNumber");
  const chassisNumber = typeof chassisNumberRaw === "string" && chassisNumberRaw.length > 0 ? chassisNumberRaw : null;

  const purchasePriceRaw = formData.get("purchasePriceAmount");
  const purchasePriceAmount = typeof purchasePriceRaw === "string" && purchasePriceRaw.length > 0 ? Number(purchasePriceRaw) : null;

  const purchaseDateRaw = formData.get("purchaseDate");
  const purchaseDate = typeof purchaseDateRaw === "string" && purchaseDateRaw.length > 0 ? purchaseDateRaw : null;

  const descriptionRaw = formData.get("description");
  const description = typeof descriptionRaw === "string" && descriptionRaw.length > 0 ? descriptionRaw : null;

  const privacyLevel = (formData.get("privacyLevel") as VehiclePrivacyLevel) || "private";

  const vehicleId = await createOwnedVehicleAndGarageItem({
    generationId,
    versionId: null,
    vin,
    chassisNumber,
    modelYear,
    mileageKm,
    privacyLevel,
    purchasePriceAmount,
    purchaseDate,
    description,
  });

  redirect(`/vehicules/${vehicleId}`);
}