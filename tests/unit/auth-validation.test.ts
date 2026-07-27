import { describe, it, expect } from "vitest";
import { signInSchema, signUpSchema } from "@/lib/validation/auth";

describe("signInSchema", () => {
  it("accepte un email et un mot de passe valides", () => {
    const result = signInSchema.safeParse({
      email: "test@example.com",
      password: "quelconque",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = signInSchema.safeParse({
      email: "pas-un-email",
      password: "quelconque",
    });
    expect(result.success).toBe(false);
  });
});

describe("signUpSchema", () => {
  it("rejette un mot de passe trop court", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "court",
    });
    expect(result.success).toBe(false);
  });

  it("accepte un mot de passe d'au moins 8 caractères", () => {
    const result = signUpSchema.safeParse({
      email: "test@example.com",
      password: "motdepasse",
    });
    expect(result.success).toBe(true);
  });
});
