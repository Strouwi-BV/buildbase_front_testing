import { test, expect } from '@playwright/test';

const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test('testSearchInvoice', async ({ page }) => {
  await page.getByRole('link', { name: 'Facturatie' }).click();
  //Searching for invoice number 1 with the search bar
  await page.locator("(//input[@type='search'])[1]").fill('1');
  //Opening the searched invoice
  await page.getByRole('cell', { name: '1', exact: true }).click();
  await expect(page.locator('h1').first()).toHaveText("Factuur informatie");
});