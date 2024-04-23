import { test, expect } from "@playwright/test";

const generateRandomEmail = require("../Utils/generateEmail.ts");
const generateRandomString = require("../Utils/randomString.ts");

const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("editProjectInformation", async ({ page }) => {
  await page.getByRole("link", { name: "Projecten" }).click();

  await page.waitForSelector("tbody tr:nth-child(1) td:nth-child(1)");

  const elementGrid = await page.locator(
    "tbody tr:nth-child(1) td:nth-child(1)"
  );

  await elementGrid.click();

  // Element locator
  const nameProject = await page.waitForSelector(
    "tbody tr:nth-child(1) td:nth-child(1)"
  );

  // Tekst van het element ophalen met innerText
  const tekst = await nameProject.innerText();
  console.log("Element tekst: " + tekst);

  await page.getByRole("heading", { name: tekst }).getByRole("link").click();

  await page.locator("(//input[@type='text'])[1]").click();

  const testName = generateRandomString();

  await page.locator("(//input[@type='text'])[1]").fill("Project" + testName);

  await page.getByRole("button", { name: "Opslaan" }).click();

  await page
    .locator("header")
    .filter({ hasText: "Project informatie" })
    .getByRole("link")
    .click();

  await page.getByLabel("Start datum", { exact: true }).click();
  await page.getByLabel("Next month").click({
    clickCount: 11,
  });

  await page.locator("(//div[normalize-space()='20'])[1]").click();

  await page.locator("(//input[@type='number'])[1]").fill("30");

  await page.locator("(//input[@type='text'])[3]").fill("Fabiolastraat");

  await page.locator("(//input[@type='text'])[4]").fill("7");

  await page.locator("(//input[@type='text'])[6]").fill("3300");

  await page.locator("(//input[@type='text'])[7]").fill("Arnhem");

  await page.locator("(//input[@type='text'])[8]").fill("Noord-Brabant");
  await page.locator("(//input[@autocomplete='off'])[1]").click();

  await page.waitForSelector("(//div[contains(text(),'Nederland')])[1]");

  const elementCountry = await page.locator(
    "(//div[contains(text(),'Nederland')])[1]"
  );

  await elementCountry.click();

  await page.getByRole("button", { name: "Opslaan" }).click();
  await page
    .locator("header")
    .filter({ hasText: "Contact informatie" })
    .getByRole("link")
    .click();

  await page.getByLabel("Voornaam").fill("Peter");

  await page.getByLabel("Achternaam").fill("DeVorst");

  await page.getByLabel("Telefoon").fill("0496474755");

  const newEmail = generateRandomEmail();

  await page.getByLabel("Email").fill(newEmail);

  await page.getByLabel("Functie").fill("Zelfstandig");
  await page.getByRole("button", { name: "Opslaan" }).click();
});
