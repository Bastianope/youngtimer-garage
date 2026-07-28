import { z } from "zod";

export const garageStatusSchema = z.enum([
  "dream",
  "searching",
  "owned",
  "archived",
]);

export const addGarageItemSchema = z.object({
  modelId: z.string().uuid(),
  status: garageStatusSchema,
  notes: z.string().max(2000).optional(),
});

export const updateGarageItemStatusSchema = z.object({
  itemId: z.string().uuid(),
  status: garageStatusSchema,
});
