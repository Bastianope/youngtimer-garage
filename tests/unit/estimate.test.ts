import { describe, expect, it } from "vitest";
import { canEstimate, estimatePrice } from "@/lib/estimate";

describe("canEstimate", () => {
  it("refuse une fourchette incomplète ou trop dispersée", () => {
    expect(canEstimate(7000, null)).toBe(false);
    expect(canEstimate(3500, 40000)).toBe(false);
    expect(canEstimate(6000, 18500)).toBe(true);
  });
});

describe("estimatePrice", () => {
  const base = { min: 6000, max: 18000, mileageKm: 120000, history: "partiel" as const };

  it("place une voiture à restaurer dans le bas de la fourchette", () => {
    expect(estimatePrice({ ...base, condition: "a_restaurer" })).toEqual({ low: 6000, high: 8400 });
  });

  it("place une voiture exceptionnelle dans le haut de la fourchette", () => {
    expect(estimatePrice({ ...base, condition: "exceptionnel" })).toEqual({ low: 15600, high: 18000 });
  });

  it("valorise un historique complet et un faible kilométrage", () => {
    const sans = estimatePrice({ ...base, condition: "tres_bon" });
    const avec = estimatePrice({ ...base, condition: "tres_bon", history: "complet", mileageKm: 60000 });
    expect(avec.low).toBeGreaterThan(sans.low);
    expect(avec.high).toBeGreaterThan(sans.high);
  });
});
