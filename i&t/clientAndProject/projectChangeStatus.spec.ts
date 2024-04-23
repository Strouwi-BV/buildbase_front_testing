import { test, expect } from "@playwright/test";
import path from "path";
const { login } = require("../Utils/login");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("manageProjectImagesTest", async ({ page }) => {
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr:nth-child(2) td:nth-child(2)");

  const elementGrid = await page.locator(
    "tbody tr:nth-child(2) td:nth-child(2)"
  );

  await elementGrid.click();

  await page.getByRole("button", { name: "Acties" }).click();
  await page.getByText("Zet op inactief").click();
  await page.getByRole("button", { name: "Bevestig" }).click();
  await page.getByRole("button", { name: "Acties" }).click();
  await page.getByText("Verwijder").click();
  await page.getByRole("button", { name: "Bevestig" }).click();
});
