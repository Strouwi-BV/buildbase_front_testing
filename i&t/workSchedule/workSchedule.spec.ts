import { expect, test } from "@playwright/test";
const { login } = require("../Utils/login");
const generateRandomString = require("../Utils/randomString");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("scheduleTest", async ({ page }) => {
  await page.getByRole("link", { name: "Instellingen" }).click();
  await page
    .getByRole("main")
    .getByRole("link", { name: "Werkroosters" })
    .click();

  await page.getByRole("button", { name: "Nieuw werkrooster" }).click();

  const randomString = generateRandomString();

  await page
    .locator("(//input[@type='text'])[1]")
    .fill("42-uren week/" + randomString);

  await page.locator("(//input[@type='text'])[2]").fill("35");

  await page.locator("(//input[@type='number'])[1]").fill("09");

  await page.locator("(//input[@type='number'])[4]").fill("09");

  await page.locator("(//input[@type='time'])[1]").fill("08:00");

  await page.locator("(//input[@type='time'])[2]").fill("08:00");

  await page.locator("(//input[@type='time'])[3]").fill("08:00");

  await page.locator("(//input[@type='time'])[4]").fill("08:00");

  await page.locator("(//input[@type='time'])[5]").fill("08:00");
  await page.getByRole("button", { name: "Opslaan" }).click();

  const createdWeekText = "42-uren week/" + randomString;
  await page.getByText(createdWeekText); // Zoek naar de tekst van het werkrooster
  const createdWeekElement = await page.getByText(createdWeekText); // Zoek het element met de tekst
  expect(createdWeekElement).toBeTruthy(); // Controleer of het element met de tekst bestaat

  await page.getByText(createdWeekText).click();

  const randomString2 = generateRandomString();

  const newName = "44-uren week/" + randomString2;

  await page.locator("(//input[@type='text'])[1]").fill(newName);

  await page.locator("(//input[@type='text'])[2]").fill("40");

  await page.locator("(//input[@type='number'])[2]").fill("09");

  await page.locator("(//input[@type='number'])[3]").fill("09");

  await page.locator("(//input[@type='time'])[1]").fill("08:30");

  await page.locator("(//input[@type='time'])[2]").fill("08:30");

  await page.locator("(//input[@type='time'])[3]").fill("08:30");

  await page.locator("(//input[@type='time'])[4]").fill("08:30");

  await page.locator("(//input[@type='time'])[5]").fill("08:30");
  await page
    .getByRole("row", { name: "Vrijdag Clear" })
    .getByLabel("Clear")
    .click();

  await page.locator("(//input[@type='time'])[5]").fill("08:30");

  await page.getByRole("button", { name: "Opslaan" }).click();

  await page
    .locator("(//i[@class='v-icon notranslate mdi mdi-delete theme--dark'])[3]")
    .click();

  const deletedElement = await page.$(`text="${newName}"`);

  // Controleer of het element niet aanwezig is
  expect(deletedElement).toBeFalsy();
});
