import { test, expect } from "@playwright/test";

test("la page d'accueil charge et affiche le slogan", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Youngtimer Garage" })).toBeVisible();
  await expect(page.getByText("Ton garage. Leur histoire.")).toBeVisible();
});

test("le lien Explorer mène à un shell fonctionnel", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explorer les youngtimers" }).click();
  await expect(page).toHaveURL(/\/explorer$/);
  await expect(page.getByRole("heading", { name: "Explorer" })).toBeVisible();
});

test("un visiteur non connecté est redirigé depuis /garage vers /auth/connexion", async ({
  page,
}) => {
  await page.goto("/garage");
  await expect(page).toHaveURL(/\/auth\/connexion/);
});

test("un visiteur non connecté est redirigé depuis /profil vers /auth/connexion", async ({
  page,
}) => {
  await page.goto("/profil");
  await expect(page).toHaveURL(/\/auth\/connexion/);
});

test("la page de connexion affiche le formulaire", async ({ page }) => {
  await page.goto("/auth/connexion");
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Mot de passe")).toBeVisible();
});
