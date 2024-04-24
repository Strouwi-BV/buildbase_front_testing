import { test } from "@playwright/test";
const { login } = require("../Utils/login");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("parameterTest", async ({ page }) => {
  await page.getByRole("link", { name: "Instellingen" }).click();

  await page.waitForTimeout(2000);

  // Wacht tot schakelaar 1 klaar zijn met laden
  await page.waitForSelector(
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[1]"
  );

  await page.locator("(//input[@type='time'])[1]").fill("08:45");

  // Schakelaar 1
  const switchSelector1 =
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[1]";
  const switchChecked1 = await page.$eval(
    switchSelector1,
    (switchElement: HTMLInputElement) => switchElement.checked
  );

  if (!switchChecked1) {
    // Schakelaar 1 is uit, klik om aan te zetten
    await page.click(switchSelector1);
  }

  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();

  await page.locator("(//div[@class='v-list-item__content'])[1]").click();

  await page.locator("(//input[@type='number'])[1]").fill("20");

  await page.locator("(//input[@type='number'])[2]").fill("20");

  // Wacht tot schakelaar 2 klaar is met laden
  await page.waitForSelector(
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[2]"
  );

  // Schakelaar 2
  const switchSelector2 =
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[2]";
  const switchChecked2 = await page.$eval(
    switchSelector2,
    (switchElement: HTMLInputElement) => switchElement.checked
  );

  if (!switchChecked2) {
    // Schakelaar 2 is uit, klik om aan te zetten
    await page.click(switchSelector2);
  }

  // Wacht tot schakelaar 3 klaar is met laden
  await page.waitForSelector(
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[3]"
  );

  // Schakelaar 3
  const switchSelector3 =
    "(//div[contains(@class,'v-input--selection-controls__ripple')])[3]";
  const switchChecked3 = await page.$eval(
    switchSelector3,
    (switchElement: HTMLInputElement) => switchElement.checked
  );

  if (!switchChecked3) {
    // Schakelaar 3 is uit, klik om aan te zetten
    await page.click(switchSelector3);
  }
});
