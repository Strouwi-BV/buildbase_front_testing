import { test, expect } from "@playwright/test";

const generateRandomEmail = require("../Utils/generateEmail.ts");
test("paidRegistrationTest", async ({ page }) => {
  await page.waitForLoadState();
  await page.goto("https://backoffice-dev.buildbase.be/payment", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("(//input[@type='text'])[1]").fill("Paid registration");
  await page.locator("(//input[@type='text'])[2]").fill("5184484151115");
  await page.locator("(//input[@type='text'])[3]").fill("Steven");
  await page.locator("(//input[@type='text'])[4]").fill("Richards");
  const email = generateRandomEmail();
  await page.locator("//input[@type='email']").fill(email);
  await page.locator("(//input[@type='text'])[5]").fill("0496577642");
  await page.locator("(//input[@type='password'])[1]").fill("testing123");
  await page.locator("(//input[@tabindex='NaN'])[1]").fill("testing123");
  await page
    .locator("(//div[@class='v-input--selection-controls__ripple'])[2]")
    .first()
    .click();
  await page.getByRole("button", { name: "Volgende" }).click();
  await page.locator("(//input[@type='text'])[6]").fill("hengouwenstraat");
  await page.locator("(//input[@type='text'])[7]").fill("12");
  await page.locator("(//input[@type='text'])[9]").fill("3300");
  await page.locator("(//input[@type='text'])[10]").fill("Tienen");
  await page.locator("(//input[@autocomplete='off'])[1]").click();
  await page.getByText("België").click();
  await page.getByRole("button", { name: "Volgende" }).click();
  await page.locator("(//input[@type='number'])[1]").fill("2");
  await page.locator("(//input[@type='number'])[2]").fill("4");
  await page.waitForTimeout(2000); // Wachten aangezien pagina niet direct mag klikken op Volgende
  await page
    .locator(
      "(//span[@class='v-btn__content'][normalize-space()='Volgende'])[3]"
    )
    .click();
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();
  await page.waitForTimeout(2000);
  await page.locator("(//span[normalize-space()='Naar betaling'])[1]").click();
  await page.locator("(//input[@value='Submit status'])[1]").click();

  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );
  //getByText("Uw betaling is succesvol");
});
