import { expect, test } from "@playwright/test";
const { login } = require("../Utils/login");
const generateRandomString = require("../Utils/randomString");

let page; // Declare page variable
let newName; // Declare newName variable

// Set up the test environment before running any test
test.beforeAll(async ({ browser }) => {
  // Create a new browser context and page
  const context = await browser.newContext();
  page = await context.newPage();

  // Log in once
  await login(page);
});

// Clean up after all tests have been executed
test.afterAll(async () => {
  // Close the browser context
  await page.context().close();
});

test("createScheduleTest", async () => {
  // Click on settings link
  await page.getByRole("link", { name: "Instellingen" }).click();
  // Click on work schedules link
  await page
    .getByRole("main")
    .getByRole("link", { name: "Werkroosters" })
    .click();
  // Click on new work schedule button
  await page.getByRole("button", { name: "Nieuw werkrooster" }).click();

  const randomString = generateRandomString();

  // Fill in new work schedule details
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

  // Check if new workschedule is added
  const createdWeekText = "42-uren week/" + randomString;
  await page.getByText(createdWeekText);
  const createdWeekElement = await page.getByText(createdWeekText);
  expect(createdWeekElement).toBeTruthy();
});

test("editScheduleTest", async () => {
  const randomString2 = generateRandomString();

  newName = "44-uren week/" + randomString2;

  // Click on the created schedule to edit
  await page.getByText("42-uren week/").click();
  // Fill in edited schedule details
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

  await page.getByText(newName);
});

test("deleteScheduleTest", async () => {
  // Click on delete button of the edited schedule
  await page
    .locator("(//i[@class='v-icon notranslate mdi mdi-delete theme--dark'])[3]")
    .click();

  const deletedElement = await page.$(`text="${newName}"`);

  expect(deletedElement).toBeNull();
});
