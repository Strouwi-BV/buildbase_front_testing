import { test } from "@playwright/test";
const { login } = require("../Utils/login.ts");
const generateRandomString = require("../Utils/randomString");

let page;

//Creating a new browser context and then creating a new page within the context,
//so that every test runs in the same browser session so we don't lose time opening browsers
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await login(page);
});

//closing the browser session after tests
test.afterAll(async () => {
  await page.context().close();
});

test("testTeamsBT13", async () => {
  await page.goto("https://backoffice-dev.buildbase.be/settings/parameters");

  // Wait for the checkbox element to appear
  const checkboxSelector =
    "(//div[@class='v-input__slot'])[6]//input[@type='checkbox']";
  await page.waitForSelector(checkboxSelector);

  // Check if the switch is checked
  const switchChecked = await page.$eval(
    checkboxSelector,
    (switchElement: HTMLInputElement) => switchElement.checked
  );

  // Click the switch only if it's not already checked
  if (!switchChecked) {
    await page.click("(//div[@class='v-input__slot'])[6]");
  }

  await page.waitForTimeout(3000);

  await page.goto("https://backoffice-dev.buildbase.be/teams");

  await page.getByRole("button", { name: "Nieuw team" }).click();

  const randomString = generateRandomString();

  await page.locator('input[type="text"]').fill(randomString);

  await page.getByRole("button", { name: "Opslaan" }).click();

  await page.click('(//button[@type="button"])[5]');

  await page.getByRole("button", { name: "Personeelslid *" }).click();

  await page.click("(//div[@role='option'])[1]");

  await page.getByRole("button", { name: "Toevoegen" }).click();

  await page.click('(//button[@type="button"])[6]');

  await page.getByRole("button", { name: "Personeelslid *" }).click();

  await page.click("(//div[@role='option'])[2]");

  await page.getByRole("button", { name: "Toevoegen" }).click();

  await page.getByRole("button", { name: "TERUG NAAR TEAM OVERZICHT" }).click();

  const teamRow = await page.locator(
    `//tr[.//div[contains(@class, 'pl-2 align-self-center') and contains(text(), '${randomString}')]]`
  );

  await teamRow.locator('button[type="button"]:nth-child(3)').click();

  await page.getByRole("button", { name: "Bevestig" }).click();

  await page.waitForTimeout(3000);

  await page.goto("https://backoffice-dev.buildbase.be/settings/parameters");

  await page.click("(//div[@class='v-input__slot'])[6]");
});
