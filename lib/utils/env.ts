import { z } from "zod";

/**
 * Variables d'environnement requises pour la Phase 0.
 * Toute variable manquante fait échouer le build/démarrage immédiatement,
 * plutôt que de provoquer une erreur confuse plus tard dans l'app.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_SUPABASE_URL doit être une URL valide" }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY est requis"),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Variables d'environnement invalides ou manquantes.\n${details}\n\nVérifie ton fichier .env.local (voir .env.example).`,
    );
  }

  return parsed.data;
}

/**
 * Chargé une seule fois. N'importer que côté serveur ou dans du code
 * exécuté aussi bien côté client (ces deux variables sont publiques par design).
 */
export const env = loadEnv();
