import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/site";

// Régénéré au plus une fois par jour
export const revalidate = 86400;

type ModelRow = {
  slug: string;
  updated_at: string;
  car_makes: { slug: string } | { slug: string }[] | null;
};

type EventRow = { id: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Client anonyme sans cookies : le sitemap ne lit que des données publiques
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/modeles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/explorer`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/explorer/rassemblements`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/explorer/ressources`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const { data: models } = await supabase
    .from("car_models")
    .select("slug, updated_at, car_makes!inner(slug)")
    .not("published_at", "is", null);

  const modelPages: MetadataRoute.Sitemap = ((models ?? []) as ModelRow[]).flatMap((row) => {
    const make = Array.isArray(row.car_makes) ? row.car_makes[0] : row.car_makes;
    if (!make?.slug || !row.slug) return [];
    return [{
      url: `${SITE_URL}/modeles/${make.slug}/${row.slug}`,
      lastModified: new Date(row.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }];
  });

  const today = new Date().toISOString().slice(0, 10);
  const { data: events } = await supabase
    .from("events")
    .select("id")
    .eq("verification_status", "verifie")
    .gte("start_date", today);

  const eventPages: MetadataRoute.Sitemap = ((events ?? []) as EventRow[]).map((row) => ({
    url: `${SITE_URL}/explorer/rassemblements/${row.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...modelPages, ...eventPages];
}
