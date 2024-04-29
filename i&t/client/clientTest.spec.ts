import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login");
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

test("Create client", async () => {
  test.setTimeout(60000);
  await page.getByRole("link", { name: "Klanten" }).click();
  //clicking on buttons and filling out forms fields
  await page
    .locator(
      "(//button[@class='secondary text-none v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]"
    )
    .click();
  await page.locator("(//input[@type='text'])[1]").click();
  const randomString = generateRandomString();
  await page.locator("(//input[@type='text'])[1]").fill(randomString);
  await page.click("(//input[@role='button'])[1]");
  await page.click("(//button[@type='button'])[26]");
  await page.click("(//input[@aria-expanded='false'])[1]");
  await page.click("(//button[@type='button'])[64]");

  await page
    .locator(
      "(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]"
    )
    .click();

  //expecting the correct client name
  await expect(page.locator("h1").first()).toHaveText(randomString);
});
