import { describe, expect, it } from "vitest";
import { buildListingAlertEmail } from "@/lib/alerts/listing-alert-email";

const data = {
  vehicleId: "11111111-1111-4111-8111-111111111111",
  makeName: "BMW",
  modelName: "Série 5 (E39)",
  makeSlug: "bmw",
  modelSlug: "serie-5-e39",
  modelYear: 1999,
  priceAmount: 12500,
  mileageKm: 182000,
  location: "Carhaix <b>",
  country: "France",
};

describe("buildListingAlertEmail", () => {
  const email = buildListingAlertEmail(data, "token-123");

  it("résume l'annonce dans l'objet", () => {
    expect(email.subject).toBe("Nouvelle annonce : BMW Série 5 (E39) de 1999 – 12 500 €");
  });

  it("contient le lien de l'annonce et le lien de désinscription", () => {
    expect(email.html).toContain("https://www.youngtimer-garage.fr/vehicules/11111111-1111-4111-8111-111111111111");
    expect(email.unsubscribeUrl).toBe("https://www.youngtimer-garage.fr/alertes/desabonnement?jeton=token-123");
    expect(email.html).toContain(email.unsubscribeUrl);
  });

  it("échappe le texte saisi par le vendeur", () => {
    expect(email.html).toContain("Carhaix &lt;b&gt;, France");
    expect(email.html).not.toContain("<b>");
    expect(email.html).toContain("182 000 km");
  });
});
