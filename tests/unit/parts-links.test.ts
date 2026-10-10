import { describe, expect, it } from "vitest";
import { leboncoinSearchQuery, leboncoinSearchUrl, ovokoSearchUrl } from "@/lib/parts-links";

describe("leboncoinSearchQuery", () => {
  it("garde le code de génération entre parenthèses", () => {
    expect(leboncoinSearchQuery("BMW", "Série 8 (E31)")).toBe("BMW E31");
    expect(leboncoinSearchQuery("Mercedes-Benz", "Classe S (W126)")).toBe("Mercedes-Benz W126");
  });

  it("utilise le nom du modèle sans code", () => {
    expect(leboncoinSearchQuery("Volkswagen", "Golf I")).toBe("Volkswagen Golf I");
  });

  it("encode la recherche dans l'adresse", () => {
    expect(leboncoinSearchUrl("BMW", "Série 8 (E31)")).toBe("https://www.leboncoin.fr/recherche?text=BMW%20E31");
  });
});

describe("ovokoSearchUrl", () => {
  it("cherche le code du modèle sur Ovoko", () => {
    expect(ovokoSearchUrl("BMW", "Série 8 (E31)")).toBe("https://ovoko.fr/chercher?q=BMW%20E31");
  });
});
