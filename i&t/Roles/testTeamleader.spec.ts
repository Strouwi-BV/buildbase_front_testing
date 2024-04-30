import { test, expect } from "@playwright/test";

let page;

// Set up the test environment before running any test
test.beforeAll(async ({ browser }) => {
  // Create a new browser context and page
  const context = await browser.newContext();
  page = await context.newPage();

  // Navigate to the login page and login with the team leader credentials (for this test unique otherwise utils login function)
  await page.goto("https://backoffice-dev.buildbase.be/login");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("teamleider@test.be");
  await page.getByLabel("Wachtwoord", { exact: true }).click();
  await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await page.waitForNavigation();
});

// Test for verifying access restrictions on various pages for different user roles
test("testDifferentUserRolesPageVisibility", async () => {
  // List of pages to test for access restrictions
  const pagesToTest = [
    "https://backoffice-dev.buildbase.be/clients",
    "https://backoffice-dev.buildbase.be/projects",
    "https://backoffice-dev.buildbase.be/hours",
    "https://backoffice-dev.buildbase.be/users",
    "https://backoffice-dev.buildbase.be/invoice",
    "https://backoffice-dev.buildbase.be/settings/parameters",
    "https://backoffice-dev.buildbase.be/settings/organization/661cdfa9af68a155b9c91a41/",
    "https://backoffice-dev.buildbase.be/settings/license",
    "https://backoffice-dev.buildbase.be/settings/work-schedules/",
  ];

  // Iterate through each page URL in the list and check for access restrictions
  for (const pageURL of pagesToTest) {
    await page.goto(pageURL);
    await expect(
      page.locator(".background--white.mb-0.ma-6.pa-6.rounded.border")
    ).toContainText("Oeps! Toegang geweigerd");
  }
});

// Test for verifying that users with different roles can only see three pages
test("testDifferentUserRolesOnlySeeingThreePages", async () => {
  // Navigate to the calendar page
  await page.goto("https://backoffice-dev.buildbase.be/calendar");
  // Get the number of links displayed on the page
  const numberOfLinks = await page.$$eval(
    ".v-list.py-0.v-sheet.theme--light > div > a",
    (links) => links.length
  );
  // Verify that the number of links is three
  await expect(numberOfLinks).toBe(3);
});

// Clean up after all tests have been executed
test.afterAll(async () => {
  // Close the browser context
  await page.context().close();
});
