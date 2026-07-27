import { z } from "zod";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export { slugify };

export const makeSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  countryOrigin: z.string().optional(),
});

export const modelSchema = z.object({
  makeId: z.string().uuid("Marque invalide"),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
});

export const generationSchema = z.object({
  modelId: z.string().uuid("Modèle invalide"),
  name: z.string().min(1, "Le nom est requis"),
  yearStart: z.coerce.number().int().min(1900).max(2100).optional(),
  yearEnd: z.coerce.number().int().min(1900).max(2100).optional(),
  bodyType: z.string().optional(),
});

export const versionSchema = z.object({
  generationId: z.string().uuid("Génération invalide"),
  name: z.string().min(1, "Le nom est requis"),
  engineDescription: z.string().optional(),
});

export type MakeInput = z.infer<typeof makeSchema>;
export type ModelInput = z.infer<typeof modelSchema>;
export type GenerationInput = z.infer<typeof generationSchema>;
export type VersionInput = z.infer<typeof versionSchema>;
