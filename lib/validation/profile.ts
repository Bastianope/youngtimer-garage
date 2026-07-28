import { z } from "zod";

export const locationPrecisionSchema = z.enum([
  "country",
  "region",
  "department",
  "city",
  "approximate",
]);

export const updateLocationSchema = z.object({
  regionName: z.string().max(120).optional(),
  departmentName: z.string().max(120).optional(),
  city: z.string().max(120).optional(),
  postalCode: z.string().max(20).optional(),
  locationPrecision: locationPrecisionSchema,
  publicLocationEnabled: z.boolean(),
});
