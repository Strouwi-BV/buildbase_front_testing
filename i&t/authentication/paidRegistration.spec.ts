import { test, expect } from "@playwright/test";

const generateRandomEmail = require("../Utils/generateEmail.ts");

test("paidRegistrationTest", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/payment");

  await page.locator("(//input[@type='text'])[1]").fill("Paid registration");

  await page.locator("(//input[@type='text'])[2]").fill("Steven");

  await page.locator("(//input[@type='text'])[3]").fill("Richards");

  const email = generateRandomEmail();

  await page.locator("//input[@type='email']").fill(email); // Verander email

  await page.locator("(//input[@type='password'])[1]").fill("testing7894");

  await page.locator("(//input[@tabindex='NaN'])[1]").fill("testing7894");
  await page
    .locator("(//div[@class='v-input--selection-controls__ripple'])[2]")
    .first()
    .click();
  await page.getByRole("button", { name: "Volgende" }).click();

  await page.locator("(//input[@type='text'])[4]").fill("hengouwenstraat");

  await page.locator("(//input[@type='text'])[5]").fill("12");

  await page.locator("(//input[@type='text'])[7]").fill("3300");

  await page.locator("(//input[@type='text'])[8]").fill("Tienen");

  await page.locator("(//input[@autocomplete='off'])[1]").click();
  await page.getByText("België").click();

  await page.locator("(//input[@type='text'])[10]").fill("5184484151115");

  await page.getByRole("button", { name: "Volgende" }).click();

  await page.locator("(//input[@type='number'])[1]").fill("2");

  await page.locator("(//input[@type='number'])[2]").fill("4");

  await page.waitForTimeout(2000); // Wachten aangezien pagina niet direct mag klikken op Volgende
  await page.getByRole("button", { name: "Volgende" }).click();
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();

  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Naar betaling" }).click();
  await page.getByRole("button", { name: "Submit status" }).click();

  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );

  //getByText("Uw betaling is succesvol");
});
