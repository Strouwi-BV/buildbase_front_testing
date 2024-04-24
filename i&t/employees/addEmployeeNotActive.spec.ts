import { test, expect } from "@playwright/test";

const generateRandomEmail = require("../Utils/generateEmail.ts");
const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("addEmployeeNotActive", async ({ page }) => {
  await page.getByRole("link", { name: "Werknemers" }).click();
  await page.getByRole("button", { name: "Nieuwe werknemer" }).click();
  await page.getByLabel("Voornaam").fill("Ed");

  await page.getByLabel("Achternaam").fill("Steward");

  const email = generateRandomEmail();

  await page.getByLabel("Email").fill(email);

  await page.getByLabel("Werkrooster").click();

  await page.getByText("40-uren week").click();

  await page.getByLabel("Statuut").fill("Zelfstandige");

  await page.getByLabel("Rijksregisternummer").fill("457812345863");

  await page.getByLabel("Rol").click();
  await page.getByRole("option", { name: "Beheerder" }).locator("i").click();
  await page.getByRole("button", { name: "Stel wachtwoord in" }).click();

  await page.getByLabel("Wachtwoord", { exact: true }).fill("test123");

  await page.getByLabel("Bevestig wachtwoord", { exact: true }).fill("test123");
  await page.locator(".v-input--selection-controls__ripple").click();
  await page.getByRole("button", { name: "Opslaan" }).click();

  await page.waitForSelector(
    "(//div[contains(text(),'Werknemer werdt succesvol aangemaakt')])[1]"
  );

  const addedMessage = await page
    .locator(
      "(//div[contains(text(),'Werknemer werdt succesvol aangemaakt')])[1]"
    )
    .innerText();
  expect(addedMessage).toContain("Werknemer werdt succesvol aangemaakt");
});
