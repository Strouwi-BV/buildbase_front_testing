import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/");
  await page.goto("https://backoffice-dev.buildbase.be/login");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("Kyan.decerf@student.ucll.be");
  await page.getByLabel("Wachtwoord", { exact: true }).click();
  await page.getByLabel("Wachtwoord", { exact: true }).press("CapsLock");
  await page.getByLabel("Wachtwoord", { exact: true }).fill("T");
  await page.getByLabel("Wachtwoord", { exact: true }).press("CapsLock");
  await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
  await page.getByLabel("Wachtwoord", { exact: true }).press("Enter");

  await page.getByRole("link", { name: "Instellingen" }).click();
  await page
    .getByRole("main")
    .getByRole("link", { name: "Werkroosters" })
    .click();

  await page.getByRole("button", { name: "Nieuw werkrooster" }).click();

  await page.locator("#input-289").fill("42-uren week");

  await page.locator("#input-293").fill("35");

  await page.locator("#input-307").fill("09");

  await page.locator("#input-301").fill("09");

  await page.locator("#input-322").fill("08:00");

  await page.locator("#input-326").fill("08:00");

  await page.locator("#input-330").fill("08:00");

  await page.locator("#input-334").fill("08:00");

  await page.locator("#input-338").fill("08:00");
  await page.getByRole("button", { name: "Opslaan" }).click();

  await page.getByText("42-uren week").click();

  await page.locator("#input-394").fill("44-uren week");

  await page.locator("#input-398").fill("40");

  await page.locator("#input-403").fill("09");

  await page.locator("#input-415").fill("09");

  await page.locator("#input-427").fill("08:30");

  await page.locator("#input-431").fill("08:30");

  await page.locator("#input-435").fill("08:30");

  await page.locator("#input-439").fill("08:30");

  await page.locator("#input-443").fill("08:30");
  await page
    .getByRole("row", { name: "Vrijdag Clear" })
    .getByLabel("Clear")
    .click();

  await page.locator("#input-443").fill("08:30");

  await page.getByRole("button", { name: "Opslaan" }).click();

  await page.getByRole("main").getByRole("button").nth(3).click();
});
