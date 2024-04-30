import { test, expect } from "@playwright/test";
import { before } from "node:test";
import { text } from "stream/consumers";
const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("get started link", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/settings/license");
  await page.click("//span[normalize-space()='Koop abonnement']");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "VOLGENDE" }).click();
  await page.waitForTimeout(1000);
  await page.locator("(//input[@type='number'])[1]").fill("2");
  await page.locator("(//input[@type='number'])[2]").fill("4");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "VOLGENDE" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();
  await page.locator("(//span[normalize-space()='Naar betaling'])[1]").click();
  await page.locator("(//input[@value='Submit status'])[1]").click();
  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );
  await page.waitForTimeout(2000);
});
