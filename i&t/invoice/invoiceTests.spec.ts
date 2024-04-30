import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login.ts");

let page;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  await login(page);
});

test.afterAll(async () => {
  await page.context().close();
});

test("addInvoice", async () => {
  //navigate to invoice page & adding a new invoice
  await page.getByRole("link", { name: "Facturatie" }).click();
  await page.getByRole("button", { name: "Nieuwe factuur" }).click();

  //Filling out necessary invoice information
  await page.getByRole("button", { name: "Klant *" }).click();
  await page.click("(//div[@role='option'])[1]");
  await page.getByLabel("Factuurnummer").click();
  await page.getByLabel("Factuurnummer").fill("1");
  await page.getByLabel("Betalingstermijn (dagen)").click();
  await page.getByLabel("Betalingstermijn (dagen)").fill("30");
  await page.getByRole("button", { name: "Personeelslid *" }).click();
  await page.click("(//div[@role='option'])[2]");
  await page.getByRole("button", { name: "Klantnaam *" }).click();
  await page.click("(//div[@role='option'])[3]");
  await page.getByRole("button", { name: "Projectnaam *" }).click();
  await page.click("(//div[@role='option'])[4]");
  await page.getByLabel("BTW (%)").click();
  await page.getByLabel("BTW (%)").fill("21");
  await page.getByLabel("Bedrag per uur (€)").click();
  await page.getByLabel("Bedrag per uur (€)").fill("100");
  await page.getByRole("main").locator("button").nth(3).click();

  //Generate the invoice
  await page.getByRole("button", { name: "Genereer" }).click();
  await page.getByText("Factuur werd succesvol").click();
});
