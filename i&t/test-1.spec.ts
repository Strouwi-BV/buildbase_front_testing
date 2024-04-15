import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/payment");
  await page.locator("#input-41").click();
  await page.locator("#input-41").fill("Registration With Payment");
  await page.locator("#input-42").click();
  await page.locator("#input-42").fill("Payment");
  await page.locator("#input-43").click();
  await page.locator("#input-43").fill("Succesfull");
  await page.locator("#input-44").click();
  await page.locator("#input-44").fill("WithPayment5.be@google.com"); // Verander email
  await page.locator("#input-46").click();
  await page.locator("#input-46").fill("testing7894");
  await page.locator("#confirmPassword").click();
  await page.locator("#confirmPassword").fill("testing7894");
  await page
    .locator(
      ".v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple"
    )
    .first()
    .click();
  await page.getByRole("button", { name: "Volgende" }).click();

  await page.locator("#input-63").click();

  await page.locator("#input-63").click();
  await page.locator("#input-63").fill("hengouwenstraat");

  await page.locator("#input-64").click();
  await page.locator("#input-64").fill("12");

  await page.locator("#input-66").click();
  await page.locator("#input-66").fill("3300");

  await page.locator("#input-67").click();
  await page.locator("#input-67").fill("Tienen");
  await page.locator("#input-69").click();
  await page.getByText("België").click();
  await page.locator("#input-72").click();
  await page.locator("#input-72").fill("5184484151115");

  await page.getByRole("button", { name: "Volgende" }).click();
  await page.locator("#input-80").click();
  await page.locator("#input-80").fill("2");
  await page.locator("#input-81").click();
  await page.locator("#input-81").fill("4");

  await page.waitForTimeout(2000); // Wachten aangezien pagina niet direct mag klikken op Volgende
  await page.getByRole("button", { name: "Volgende" }).click();
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();
  await page.getByRole("button", { name: "Naar betaling" }).click();
  await page.getByRole("button", { name: "Submit status" }).click();

  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );

  //getByText("Uw betaling is succesvol");
});
