import { describe, expect, it } from "vitest";
import { parseRichText } from "@/lib/dossiers/rich-text";

describe("parseRichText", () => {
  it("reconnaît liens internes, externes et gras", () => {
    expect(parseRichText("Voir [la fiche](/modeles/bmw/e30) et **le site** [officiel](https://acm.mc).")).toEqual([
      { kind: "text", text: "Voir " },
      { kind: "link", text: "la fiche", href: "/modeles/bmw/e30", external: false },
      { kind: "text", text: " et " },
      { kind: "bold", text: "le site" },
      { kind: "text", text: " " },
      { kind: "link", text: "officiel", href: "https://acm.mc", external: true },
      { kind: "text", text: "." },
    ]);
  });

  it("reconnaît les ancres de la page", () => {
    expect(parseRichText("[Tour Auto](#tour-auto)")).toEqual([
      { kind: "link", text: "Tour Auto", href: "#tour-auto", external: false },
    ]);
  });

  it("ignore les liens non https", () => {
    expect(parseRichText("[x](javascript:alert(1))")).toEqual([{ kind: "text", text: "[x](javascript:alert(1))" }]);
  });
});
