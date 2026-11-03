import { describe, expect, it } from "vitest";
import {
  RECURRING_SERIES,
  eventPath,
  getSeriesBySlug,
  isUuid,
  keepNextOccurrence,
  nthSundayOfMonth,
  recurrenceLabel,
} from "@/lib/events/series";
import { buildSeriesDates } from "@/components/explorer/series-page";

describe("rendez-vous récurrents", () => {
  it("ont des slugs uniques et valides, jamais confondus avec un identifiant", () => {
    const slugs = RECURRING_SERIES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(isUuid(slug)).toBe(false);
    }
  });

  it("reconnaît un identifiant d'événement", () => {
    expect(isUuid("b9d48e21-d1fd-4683-8c93-1e4d4b3cc389")).toBe(true);
    expect(isUuid("vincennes-en-anciennes")).toBe(false);
  });

  it("calcule le n-ième dimanche du mois", () => {
    expect(nthSundayOfMonth(2026, 10, 1)).toBe("2026-11-01");
    expect(nthSundayOfMonth(2026, 11, 3)).toBe("2026-12-20");
  });

  it("décrit la récurrence en français", () => {
    expect(recurrenceLabel(getSeriesBySlug("vincennes-en-anciennes")!)).toBe("Chaque 1er dimanche du mois");
    expect(recurrenceLabel(getSeriesBySlug("exposition-mensuelle-gouesnou")!)).toBe(
      "Chaque 3e dimanche du mois, sauf juillet et août",
    );
    expect(recurrenceLabel(getSeriesBySlug("rassemblement-port-de-morlaix")!)).toBe(
      "Chaque 1er dimanche du mois, les mois pairs",
    );
  });

  it("pointe vers la page fixe d'une série, sinon vers l'événement", () => {
    expect(eventPath({ id: "abc", series_slug: "vincennes-en-anciennes" })).toBe("/explorer/rassemblements/vincennes-en-anciennes");
    expect(eventPath({ id: "abc", series_slug: null })).toBe("/explorer/rassemblements/abc");
  });

  it("ne garde que la prochaine date de chaque série dans les listes", () => {
    const list = keepNextOccurrence([
      { start_date: "2026-11-01", series_slug: "vincennes-en-anciennes" },
      { start_date: "2026-11-20", series_slug: null },
      { start_date: "2026-12-06", series_slug: "vincennes-en-anciennes" },
    ]);
    expect(list.map((e) => e.start_date)).toEqual(["2026-11-01", "2026-11-20"]);
  });

  it("complète les dates manquantes d'après la règle de récurrence", () => {
    const series = getSeriesBySlug("exposition-mensuelle-gouesnou")!;
    const dates = buildSeriesDates(series, [], "2027-06-01", 3);
    expect(dates.map((d) => d.date)).toEqual(["2027-06-20", "2027-09-19", "2027-10-17"]);
  });
});
