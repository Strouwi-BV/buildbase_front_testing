import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
const { login } = require("../Utils/login.ts");

let page; // Declare page variable

test.beforeAll(async ({ browser }) => {
  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page inside the context
  page = await context.newPage();

  // Log in once
  await login(page);
});

test("get started link - Purchase subscription", async () => {
  // Navigate to the license settings page
  await page.goto("https://backoffice-dev.buildbase.be/settings/license");

  // Click on the 'Koop abonnement' link
  await page.click("//span[normalize-space()='Koop abonnement']");
  await page.waitForTimeout(1000);

  // Click 'VOLGENDE' button
  await page.getByRole("button", { name: "VOLGENDE" }).click();
  await page.waitForTimeout(1000);

  // Fill in the number of users and projects
  await page.locator("(//input[@type='number'])[1]").fill("2");
  await page.locator("(//input[@type='number'])[2]").fill("4");
  await page.waitForTimeout(1000);

  // Click 'VOLGENDE' button
  await page.getByRole("button", { name: "VOLGENDE" }).click();
  await page.waitForTimeout(1000);

  // Click on KBC payment button
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();

  // Click on 'Naar betaling' button
  await page.locator("(//span[normalize-space()='Naar betaling'])[1]").click();

  // Click on 'Submit status' button
  await page.locator("(//input[@value='Submit status'])[1]").click();

  // Expect success message after payment
  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );

  // Wait for 2 seconds
  await page.waitForTimeout(2000);
});

test("get started link - Renew subscription", async () => {
  // Navigate to the license settings page
  await page.goto("https://backoffice-dev.buildbase.be/settings/license");

  // Click on the 'Verleng abonnement' link
  await page.click("//span[normalize-space()='Verleng abonnement']");

  // Fill in the number of users for subscription renewal
  await page.locator("(//input[@type='number'])[1]").fill("3");

  // Click on KBC payment button
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();

  // Click on 'Betaal' button
  await page.getByRole("button", { name: "Betaal" }).click();

  // Click on 'Submit status' button
  await page.locator("(//input[@value='Submit status'])[1]").click();

  // Expect success message after payment
  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );

  // Wait for 2 seconds
  await page.waitForTimeout(2000);
});
