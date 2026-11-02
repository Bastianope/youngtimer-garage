import { describe, expect, it } from "vitest";
import {
  addMonths,
  computeSchedule,
  computedAnnualKm,
  dateForMileage,
  estimateMileage,
  currentMileage,
  dateStatus,
  nextCtDeadline,
  type MaintenanceItemType,
  type MileageEstimate,
} from "@/lib/maintenance/schedule";

const oil: MaintenanceItemType = { code: "huile_moteur", label: "Huile moteur", category: "moteur", defaultIntervalKm: 15000, defaultIntervalMonths: 12 };
const air: MaintenanceItemType = { code: "filtre_air", label: "Filtre à air", category: "filtres", defaultIntervalKm: 30000, defaultIntervalMonths: 24 };
const brakeFluid: MaintenanceItemType = { code: "liquide_frein", label: "Liquide de frein", category: "liquides", defaultIntervalKm: null, defaultIntervalMonths: 24 };
const pads: MaintenanceItemType = { code: "plaquettes_av", label: "Plaquettes AV", category: "freinage", defaultIntervalKm: null, defaultIntervalMonths: null };

describe("addMonths", () => {
  it("ajoute des mois en gardant le jour", () => {
    expect(addMonths("2025-03-14", 12)).toBe("2026-03-14");
  });
  it("ramène au dernier jour du mois si besoin", () => {
    expect(addMonths("2025-01-31", 1)).toBe("2025-02-28");
  });
});

describe("dateStatus", () => {
  it("détecte une échéance dépassée, proche ou lointaine", () => {
    expect(dateStatus("2026-10-01", "2026-10-29")).toBe("overdue");
    expect(dateStatus("2026-12-01", "2026-10-29")).toBe("soon");
    expect(dateStatus("2027-06-01", "2026-10-29")).toBe("ok");
    expect(dateStatus(null, "2026-10-29")).toBeNull();
  });
});

describe("currentMileage", () => {
  it("prend le plus grand kilométrage connu", () => {
    expect(currentMileage(180000, [{ performedAt: "2026-09-01", mileageKm: 187400, itemCodes: [] }])).toBe(187400);
    expect(currentMileage(null, [])).toBeNull();
  });
});

// Estimation sans rythme annuel : seul le kilométrage connu compte
function fixed(km: number | null): MileageEstimate {
  return { estimatedKm: km, annualKm: null, source: null, lastReading: km === null ? null : { date: "2026-10-29", km } };
}

describe("computeSchedule", () => {
  const today = "2026-10-29";

  it("ne compte que les éléments réellement cochés", () => {
    const [oilRow, airRow] = computeSchedule({
      itemTypes: [oil, air],
      overrides: {},
      records: [
        { performedAt: "2026-09-14", mileageKm: 187400, itemCodes: ["huile_moteur"] },
        { performedAt: "2024-06-01", mileageKm: 160000, itemCodes: ["huile_moteur", "filtre_air"] },
      ],
      estimate: fixed(188000),
      today,
    });
    expect(oilRow.lastDate).toBe("2026-09-14");
    expect(oilRow.nextKm).toBe(202400);
    expect(oilRow.status).toBe("ok");
    expect(airRow.lastDate).toBe("2024-06-01");
    expect(airRow.nextKm).toBe(190000);
    expect(airRow.status).toBe("overdue"); // 24 mois dépassés depuis juin 2026
  });

  it("signale « bientôt » à moins de 1 500 km", () => {
    const [row] = computeSchedule({
      itemTypes: [oil],
      overrides: {},
      records: [{ performedAt: "2026-08-01", mileageKm: 100000, itemCodes: ["huile_moteur"] }],
      estimate: fixed(114000),
      today,
    });
    expect(row.status).toBe("soon");
  });

  it("applique l'intervalle personnalisé du véhicule", () => {
    const [row] = computeSchedule({
      itemTypes: [oil],
      overrides: { huile_moteur: { intervalKm: 10000, intervalMonths: null } },
      records: [{ performedAt: "2026-01-01", mileageKm: 100000, itemCodes: ["huile_moteur"] }],
      estimate: fixed(105000),
      today,
    });
    expect(row.nextKm).toBe(110000);
    expect(row.nextDate).toBeNull();
    expect(row.status).toBe("ok");
  });

  it("distingue jamais enregistré et non suivi", () => {
    const [fluid, padsRow] = computeSchedule({ itemTypes: [brakeFluid, pads], overrides: {}, records: [], estimate: fixed(null), today });
    expect(fluid.status).toBe("never");
    expect(padsRow.status).toBe("untracked");
  });
});

describe("nextCtDeadline", () => {
  it("ajoute 2 ans au dernier CT", () => {
    expect(nextCtDeadline({ lastCtDate: "2025-06-10", firstRegistration: null })).toBe("2027-06-10");
  });
  it("utilise les 4 ans de la 1re immatriculation sans CT connu", () => {
    expect(nextCtDeadline({ lastCtDate: null, firstRegistration: "2023-03-01" })).toBe("2027-03-01");
  });
});

describe("kilométrage estimé", () => {
  const readings = [
    { date: "2025-10-29", km: 160000 },
    { date: "2026-04-29", km: 166000 },
  ];

  it("calcule la moyenne annuelle à partir des relevés datés", () => {
    expect(computedAnnualKm(readings)).toBe(12000); // 6 000 km en 182 jours, arrondi à la centaine
  });

  it("ignore des relevés trop rapprochés", () => {
    expect(computedAnnualKm([{ date: "2026-10-01", km: 100000 }, { date: "2026-10-20", km: 101000 }])).toBeNull();
  });

  it("estime le kilométrage du jour au rythme calculé", () => {
    const e = estimateMileage({ readings, declaredAnnualKm: null, today: "2026-10-29" });
    expect(e.source).toBe("calcul");
    expect(e.estimatedKm).toBe(172000);
  });

  it("utilise le kilométrage annuel déclaré faute de relevés suffisants", () => {
    const e = estimateMileage({ readings: [{ date: "2026-04-29", km: 100000 }], declaredAnnualKm: 10000, today: "2026-10-29" });
    expect(e.source).toBe("declare");
    expect(e.estimatedKm).toBe(105000);
  });

  it("ignore les relevés sans date ou sans kilométrage", () => {
    const e = estimateMileage({ readings: [{ date: null, km: 5 }, { date: "2026-01-01", km: null }], declaredAnnualKm: null, today: "2026-10-29" });
    expect(e.estimatedKm).toBeNull();
  });

  it("convertit un kilométrage cible en date", () => {
    const e = estimateMileage({ readings: [{ date: "2026-01-01", km: 100000 }], declaredAnnualKm: 12000, today: "2026-01-01" });
    expect(dateForMileage(106000, e)).toBe("2026-07-03");
  });

  it("donne une échéance en date même pour un intervalle en km", () => {
    const e = estimateMileage({ readings: [{ date: "2026-01-01", km: 100000 }], declaredAnnualKm: 12000, today: "2026-02-01" });
    const [row] = computeSchedule({
      itemTypes: [{ code: "filtre_air", label: "Filtre à air", category: "filtres", defaultIntervalKm: 6000, defaultIntervalMonths: 24 }],
      overrides: {},
      records: [{ performedAt: "2026-01-01", mileageKm: 100000, itemCodes: ["filtre_air"] }],
      estimate: e,
      today: "2026-02-01",
    });
    expect(row.dueDate).toBe("2026-07-03"); // avant les 24 mois
    expect(row.status).toBe("ok");
  });
});
