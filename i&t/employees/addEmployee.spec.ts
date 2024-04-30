import { test, expect } from "@playwright/test";
const generateRandomEmail = require("../Utils/generateEmail.ts");
const { login } = require("../Utils/login.ts");

let page; // Declare page variable

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

// Function to add a new employee with given details
async function addEmployee(firstName, lastName, email) {
  // Navigate to the employees page
  await page.getByRole("link", { name: "Werknemers" }).click();
  await page.waitForTimeout(8000);

  // Click on the button to add a new employee
  await page.locator("//span[normalize-space()='Nieuwe werknemer']").click();

  // Fill in employee details
  await page.locator("(//input[@type='text'])[1]").fill(firstName);
  await page.locator("(//input[@type='text'])[2]").fill(lastName);
  await page.locator("(//input[@type='email'])[1]").fill(email);

  // Choose workschedule
  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page.locator("(//div[contains(text(),'40-uren week')])[1]").click();
  await page.locator("(//input[@type='text'])[4]").fill("Zelfstandige");

  // Check if the national insurance number input field is visible
  const nationalInsuranceNumber = await page.isVisible(
    "(//input[@type='text'])[6]"
  );
  if (nationalInsuranceNumber) {
    await page.locator("(//input[@type='text'])[6]").fill("457812345863");
  }

  // Choose role
  await page.locator("(//input[@type='text'])[5]").click();
  await page.locator("(//i[@aria-hidden='true'])[21]").click();

  // Set password
  await page
    .locator("(//span[normalize-space()='Stel wachtwoord in'])[1]")
    .click();
  await page.locator("(//input[@type='password'])[1]").fill("test123");
  await page.locator("(//input[@tabindex='NaN'])[1]").fill("test123");

  // Save the employee details
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();

  // Wait for the success message to appear
  await page.waitForSelector(
    "(//div[contains(text(),'Werknemer werdt succesvol aangemaakt')])[1]"
  );

  // Verify that the success message appears
  const addedMessage = await page
    .locator(
      "(//div[contains(text(),'Werknemer werdt succesvol aangemaakt')])[1]"
    )
    .innerText();
  expect(addedMessage).toContain("Werknemer werdt succesvol aangemaakt");
}

// Test for adding an employee who is not active
test("addEmployeeNotActive", async () => {
  await addEmployee("Ed", "Steward", generateRandomEmail());
});

// Test for adding an active employee
test("addEmployeeActiveTest", async () => {
  await page.getByRole("link", { name: "Kalender" }).click();
  await addEmployee("Ed", "Steward", generateRandomEmail());
});
