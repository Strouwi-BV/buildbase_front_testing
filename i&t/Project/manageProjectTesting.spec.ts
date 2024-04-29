import { test, expect } from "@playwright/test"; // Importing Playwright test functions
import path from "path"; // Importing path module

// Importing functions to generate random email and string
const generateRandomEmail = require("../Utils/generateEmail.ts");
const generateRandomString = require("../Utils/randomString.ts");

// Importing login function
const { login } = require("../Utils/login.ts");

let context; // Declare context variable
let page; // Declare page variable

// Before all tests, create a new browser context and page and log in
test.beforeAll(async ({ browser }) => {
  context = await browser.newContext(); // Create a new browser context
  page = await context.newPage(); // Create a new page inside the context
  await login(page); // Log in once
});

// After all tests, close the browser context
test.afterAll(async () => {
  await context.close(); // Close the browser context after all tests are executed
});

// Test to create a project
test("createProject", async ({}) => {
  // Navigate to projects
  await page.waitForSelector("(//div[contains(text(),'Projecten')])[1]");
  await page.locator("(//div[contains(text(),'Projecten')])[1]").click();

  // Click on "Nieuw Project" button
  await page.click(
    "(//button[@class='secondary text-none v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]"
  );

  // Fill project name
  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@role='option'])[1]");
  const randomString = generateRandomString();
  await page.locator("(//input[@type='text'])[2]").fill(randomString);

  // Select project type and other details
  await page.click("(//input[@role='button'])[1]");
  await page.click("(//button[@type='button'])[31]");
  await page.click("(//input[@aria-expanded='false'])[1]");
  await page.click("(//button[@type='button'])[66]");
  await page.click("(//input[@type='number'])[1]");
  await page.locator("(//input[@type='number'])[1]").fill("50");

  // Click on "Opslaan" button
  await page.getByRole("button", { name: "Opslaan" }).click();

  // Check if project name matches the randomly generated string
  await expect(page.locator("h1").first()).toHaveText(randomString);
});

// Test to change project location
test("changeProjectLocationTest", async () => {
  // Navigate to project list
  await page.getByRole("link", { name: "Kalender" }).click();
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr");

  // Click on the first project in the list
  await page.click("tbody tr:nth-child(1) td:nth-child(1)");

  // Click on "Bewerken" button for project details
  await page
    .locator(
      "(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[1]"
    )
    .click();

  // Fill in new project location details
  await page.waitForSelector("(//input[@type='text'])[1]");
  await page.locator("(//input[@type='text'])[1]").click();
  await page.locator("(//input[@type='text'])[1]").fill("EditedProjectName");

  // Save the changes
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();

  // Fill in new address details
  await page
    .locator(
      "(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[3]"
    )
    .click();
  await page.locator("(//input[@type='text'])[3]").fill("Fabiolastraat");
  await page.locator("(//input[@type='text'])[4]").fill("7");
  await page.locator("(//input[@type='text'])[6]").fill("3300");
  await page.locator("(//input[@type='text'])[7]").fill("Arnhem");
  await page.locator("(//input[@type='text'])[8]").fill("Noord-Brabant");
  await page.locator("(//input[@autocomplete='off'])[1]").click();

  // Select country from dropdown
  await page.waitForSelector("(//div[contains(text(),'Nederland')])[1]");
  const elementCountry = await page.locator(
    "(//div[contains(text(),'Nederland')])[1]"
  );
  await elementCountry.click();

  // Save the changes
  await page.getByRole("button", { name: "Opslaan" }).click();
});

// Test to change contact information
test("changeContactInformationTest", async () => {
  // Navigate to project list
  await page.goto("https://backoffice-dev.buildbase.be/");
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr");

  // Click on the first project in the list
  await page.click("tbody tr:nth-child(1) td:nth-child(1)");

  // Click on "Bewerken" button for contact information
  await page
    .locator(
      "(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[4]"
    )
    .click();

  // Fill in new contact information
  await page.locator("(//input[@type='text'])[1]").fill("Peter");
  await page.locator("(//input[@type='text'])[2]").fill("DeVorst");
  await page.locator("(//input[@type='text'])[3]").fill("0496474755");
  const newEmail = generateRandomEmail();
  await page.locator("(//input[@type='email'])[1]").fill(newEmail);
  await page.locator("(//input[@type='text'])[4]").fill("Zelfstandig");

  // Save the changes
  await page.getByRole("button", { name: "Opslaan" }).click();

  // Check if success message appears
  await page.waitForSelector(
    "(//div[contains(text(),'Contact informatie werd succesvol gewijzigd')])[1]"
  );
  const successMessage = await page
    .locator(
      "(//div[contains(text(),'Contact informatie werd succesvol gewijzigd')])[1]"
    )
    .innerText();
  expect(successMessage).toContain(
    "Contact informatie werd succesvol gewijzigd"
  );
});

// Test to navigate to project images
test("navigateToProjectImagesTest", async () => {
  // Navigate to project list
  await page.getByRole("link", { name: "Kalender" }).click();
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr");

  // Click on the first project in the list
  await page.click("tbody tr:nth-child(1) td:nth-child(1)");

  // Navigate to the project images page
  await page
    .locator("header")
    .filter({ hasText: "Project foto's" })
    .getByRole("link")
    .click();
});

// Test to upload an image
test("uploadImageTest", async () => {
  // Click on "Uploaden" option
  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page
    .locator("(//div[@role='option'][normalize-space()='Uploaden'])[1]")
    .click();

  // Select image to upload
  const imagePath = path.join(__dirname, "testImageProject.png");
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("(//div[@class='v-file-input__text'])[1]").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(imagePath);

  // Click on "Upload" button
  await page.getByRole("button", { name: "Upload", exact: true }).click();
});

// Test to inspect an image
test("inspectImageTest", async () => {
  // Click on "Inspecteren" option
  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page
    .locator("(//div[@role='option'][normalize-space()='Inspecteren'])[1]")
    .click();

  // Click on the image to inspect it
  await page.locator("(//div[@class='v-responsive__content'])[3]").click();

  // Close the inspection mode
  await page
    .locator("(//i[@class='v-icon notranslate mdi mdi-close theme--dark'])[1]")
    .click();
});

// Test to verify image upload
test("verifyImageUploadTest", async () => {
  // Click on "Downloaden" option
  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page.locator("(//div[normalize-space()='Downloaden'])[1]").click();

  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-circle-outline theme--light white--text'])[1]"
    )
    .click();

  // Click on download button and wait for download to complete
  const downloadPromise = page.waitForEvent("download");
  await page.locator("(//span[normalize-space()='Download'])[1]").click();
  const download = await downloadPromise;

  // Check if the downloaded file name contains "testImageClient"
  expect(download.suggestedFilename()).toContain("testImageClient");
});

// Test to delete an uploaded image
test("deleteUploadedImageTest", async () => {
  // Click on "Verwijderen" option
  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page.locator("(//div[normalize-space()='Verwijderen'])[1]").click();

  // Confirm deletion
  await page
    .locator(
      "(//div[@class='background--white mb-0 ma-6 pa-6 rounded border'])[1]"
    )
    .click();
  await page.locator("(//span[normalize-space()='Verwijder'])[1]").click();

  // Check if success message appears
  await page.waitForSelector(
    "(//div[contains(text(),'Project afbeeldingen werden succesvol verwijderd')])[1]"
  );
  const deleteMessage = await page
    .locator(
      "(//div[contains(text(),'Project afbeeldingen werden succesvol verwijderd')])[1]"
    )
    .innerText();
  expect(deleteMessage).toContain(
    "Project afbeeldingen werden succesvol verwijderd"
  );
});

// Test to set a project as inactive
test("setInactiveProjectTest", async ({}) => {
  // Navigate to project list
  await page.getByRole("link", { name: "Kalender" }).click();
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr:nth-child(2) td:nth-child(2)");

  // Click on the second project in the list
  const elementGrid = await page.locator(
    "tbody tr:nth-child(2) td:nth-child(2)"
  );
  await elementGrid.click();

  // Set the project as inactive
  await page.getByRole("button", { name: "Acties" }).click();
  await page.getByText("Zet op inactief").click();
  await page.getByRole("button", { name: "Bevestig" }).click();

  // Check if the "Inactief" badge appears
  const inactiveElement = await page.locator(
    "(//span[@class='v-chip__content'])[1]"
  );
  expect(await inactiveElement.isVisible()).toBeTruthy();
});

// Test to delete a project
test("deleteProjectTest", async ({}) => {
  const initialURL = page.url();

  // Click on "Acties" button and select "Verwijder"
  await page.getByRole("button", { name: "Acties" }).click();
  await page.getByText("Verwijder").click();
  await page.getByRole("button", { name: "Bevestig" }).click();

  // Wait for the deletion to complete
  await page.waitForTimeout(4000);

  // Get the new URL after deletion
  const newURL = page.url();

  // Check if the new URL is different from the initial URL
  expect(newURL).not.toBe(initialURL);
});
