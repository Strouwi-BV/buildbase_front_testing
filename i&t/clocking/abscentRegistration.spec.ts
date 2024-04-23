import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("testAbscentRegistrationBt7", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/calendar");

  await page.waitForSelector(".v-calendar-weekly");

  const today: Date = new Date();
  const day: number = today.getDate();

  await page.click(`.v-calendar-weekly__day-label button:has-text("${day}")`);

  await page.click("//span[normalize-space()='Registreer afwezigheid']");

  await page.getByRole("button", { name: "Afwezigheids type *" }).click();

  await page.click("//div[@role='option']//div[normalize-space()='Verlof']");

  await page.click("(//input[@role='button'])");

  await page.click(`(//div[normalize-space()='${day}'])`);

  await page.getByRole("button", { name: "Duur afwezigheid" }).click();

  await page.click(
    "//div[@role='option']//div[normalize-space()='Volledige dag']"
  );

  await page.click(
    "//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default']"
  );

  const popup = await page
    .waitForSelector(".v-snack__wrapper", { timeout: 2000 })
    .catch(() => null);

  if (popup) {
    const popupText = await popup.textContent();
    expect(popupText).toContain(
      "Er bestaat al een tijdsregistratie voor deze tijdspanne"
    );
  }
});
