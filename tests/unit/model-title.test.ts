import { describe, expect, it } from "vitest";
import { modelSearchName } from "@/lib/model-title";

describe("modelSearchName", () => {
  it("met le code de génération en tête", () => {
    expect(modelSearchName("BMW", "Série 7 (E38)")).toBe("BMW E38 (Série 7)");
    expect(modelSearchName("Mercedes-Benz", "Classe S (W126)")).toBe("Mercedes-Benz W126 (Classe S)");
  });

  it("garde le nom tel quel sans code", () => {
    expect(modelSearchName("Volkswagen", "Golf I")).toBe("Volkswagen Golf I");
    expect(modelSearchName("Porsche", "928")).toBe("Porsche 928");
  });
});
