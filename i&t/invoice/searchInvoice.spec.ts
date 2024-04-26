import { test, expect } from '@playwright/test';

const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test('testSearchInvoice', async ({ page }) => {
  await page.getByRole('link', { name: 'Facturatie' }).click();
  //zoekt factuurnummer 1 via de zoekbalk
  await page.locator("(//input[@type='search'])[1]").fill('1');
  //openen van de gezochte factuur
  await page.getByRole('cell', { name: '1', exact: true }).click();
  await page.getByRole('link', { name: 'Terug naar factuur' }).click();
});