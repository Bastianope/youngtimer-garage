import { test, expect } from "@playwright/test";

test("la page /modeles charge et affiche le formulaire de recherche", async ({
  page,
}) => {
  await page.goto("/modeles");
  await expect(page.getByRole("heading", { name: "Modèles" })).toBeVisible();
  await expect(page.getByPlaceholder(/Rechercher un modèle/)).toBeVisible();
});

test("une recherche sans résultat affiche un message explicite", async ({
  page,
}) => {
  await page.goto("/modeles?q=vehicule-qui-nexiste-pas-xyz");
  await expect(page.getByText(/Aucun modèle ne correspond/)).toBeVisible();
});

test("un visiteur non connecté est redirigé depuis /admin vers /auth/connexion", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/auth\/connexion/);
});
