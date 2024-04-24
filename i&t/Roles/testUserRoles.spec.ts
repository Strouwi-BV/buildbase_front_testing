import { test, expect } from "@playwright/test";

test.beforeEach("Login", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/login");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("gebruiker@test.com");
  await page.getByLabel("Wachtwoord", { exact: true }).click();
  await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await page.waitForNavigation();
});

test("testDifferentUserRolesPageVisibility", async ({ page }) => {
  const pagesToTest = [
    "https://backoffice-dev.buildbase.be/clients",
    "https://backoffice-dev.buildbase.be/projects",
    "https://backoffice-dev.buildbase.be/hours",
    "https://backoffice-dev.buildbase.be/users",
    "https://backoffice-dev.buildbase.be/invoice",
    "https://backoffice-dev.buildbase.be/settings/parameters",
    "https://backoffice-dev.buildbase.be/teams",
    "https://backoffice-dev.buildbase.be/settings/organization/661cdfa9af68a155b9c91a41/",
    "https://backoffice-dev.buildbase.be/settings/license",
    "https://backoffice-dev.buildbase.be/settings/work-schedules/",
  ];

  for (const pageURL of pagesToTest) {
    await page.goto(pageURL);
    await expect(
      page.locator(".background--white.mb-0.ma-6.pa-6.rounded.border")
    ).toContainText("Oeps! Toegang geweigerd");
  }
});

test("testDifferentUserRolesOnlySeeingTwoPages", async ({ page }) => {
  await page.goto("https://backoffice-dev.buildbase.be/calendar");
  const numberOfLinks = await page.$$eval(
    ".v-list.py-0.v-sheet.theme--light > div > a",
    (links) => links.length
  );
  await expect(numberOfLinks).toBe(2);
});
