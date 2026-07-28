import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/validation/catalogue";

describe("slugify", () => {
  it("convertit en minuscules et remplace les espaces par des tirets", () => {
    expect(slugify("BMW E30")).toBe("bmw-e30");
  });

  it("retire les accents", () => {
    expect(slugify("Peugeot 205 GTi Édition")).toBe("peugeot-205-gti-edition");
  });

  it("retire les tirets en début et fin", () => {
    expect(slugify("  Clio Williams  ")).toBe("clio-williams");
  });

  it("réduit les caractères spéciaux consécutifs à un seul tiret", () => {
    expect(slugify("Golf GTI II / 1990")).toBe("golf-gti-ii-1990");
  });
});
