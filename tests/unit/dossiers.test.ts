import { describe, expect, it } from "vitest";
import { getAllDossiers, getDossierBySlug } from "@/lib/dossiers";

describe("dossiers", () => {
  const dossiers = getAllDossiers();

  it("ont des slugs uniques", () => {
    const slugs = dossiers.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ont des ancres de titres uniques dans chaque dossier", () => {
    for (const d of dossiers) {
      const ids = d.blocks.flatMap((b) => (b.type === "h2" ? [b.id] : []));
      expect(new Set(ids).size, d.slug).toBe(ids.length);
    }
  });

  it("ont un titre Google de 75 caractères maximum et une description de 200 maximum", () => {
    for (const d of dossiers) {
      expect(d.seoTitle.length, d.slug).toBeLessThanOrEqual(75);
      expect(d.description.length, d.slug).toBeLessThanOrEqual(200);
    }
  });

  it("ne pointent que vers des dossiers existants", () => {
    for (const d of dossiers) {
      const text = JSON.stringify(d.blocks);
      for (const [, slug] of text.matchAll(/\]\(\/dossiers\/([a-z0-9-]+)\)/g)) {
        expect(getDossierBySlug(slug), `${d.slug} -> ${slug}`).toBeDefined();
      }
    }
  });

  it("citent des sources et une fiche modèle", () => {
    for (const d of dossiers) {
      expect(d.sources.length, d.slug).toBeGreaterThan(0);
      if (d.category === "modele") expect(d.models.length, d.slug).toBeGreaterThan(0);
    }
  });
});
