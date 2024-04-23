import { test, expect } from "@playwright/test";
import path from "path";
const { login } = require("../Utils/login");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("manageProjectImagesTest", async ({ page }) => {
  await page.getByRole("link", { name: "Projecten" }).click();
  await page.waitForSelector("tbody tr:nth-child(1) td:nth-child(1)");

  const elementGrid = await page.locator(
    "tbody tr:nth-child(1) td:nth-child(1)"
  );

  await elementGrid.click();

  await page
    .locator("header")
    .filter({ hasText: "Project foto's" })
    .getByRole("link")
    .click();

  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();

  await page
    .locator("(//div[@role='option'][normalize-space()='Uploaden'])[1]")
    .click();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("(//div[@class='v-file-input__text'])[1]").click();
  const fileChooser = await fileChooserPromise;

  // Select one file
  const filePath = path.join(__dirname, "testImageClient.png");

  // Voeg het bestand toe aan het bestandskeuzevenster
  await fileChooser.setFiles(filePath);

  await page.getByRole("button", { name: "Upload", exact: true }).click();

  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();
  await page
    .locator("(//div[@role='option'][normalize-space()='Inspecteren'])[1]")
    .click();

  await page.locator("(//div[@class='v-responsive__content'])[3]").click();

  await page
    .locator("(//i[@class='v-icon notranslate mdi mdi-close theme--dark'])[1]")
    .click();

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

  const downloadPromise = page.waitForEvent("download");

  await page.locator("(//span[normalize-space()='Download'])[1]").click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toContain("testImageClient");

  await page.locator("(//div[@class='v-responsive__content'])[3]").click();

  await page
    .locator(
      "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light'])[1]"
    )
    .click();

  await page.locator("(//div[normalize-space()='Verwijderen'])[1]").click();

  await page.locator("(//div[@class='v-responsive__content'])[3]").click();

  await page.locator("(//span[normalize-space()='Verwijder'])[1]").click();

  // Wacht tot de afbeelding is verwijderd
  await page.waitForSelector(".v-responsive__content");

  // Controleer of de afbeelding niet meer aanwezig is op de pagina
  const imageCount = await page
    .locator("(//div[@class='v-responsive__content'])[3]")
    .count();

  expect(imageCount).toBe(0);
});
