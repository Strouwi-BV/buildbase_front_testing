import { test, expect } from '@playwright/test';
const { login } = require('./utils');

test.beforeEach('Login', async ({ page }) => {
  await login(page);
});

test('Create client', async ({ page }) => {
  await page.getByRole('link', { name: 'Klanten' }).click();
  await page.getByRole('button', { name: 'Nieuwe klant' }).click();
  await page.getByLabel('Klant naam').click();
  await page.getByLabel('Klant naam').fill('Dirk');
  await page.getByLabel('Start datum', { exact: true }).click();
  await page.getByRole('button', { name: '31' }).click();
  await page.getByLabel('Eind datum').click();
  await page.getByRole('button', { name: '22' }).click();
  await page.getByRole('button', { name: 'Opslaan' }).click();

  await expect(page.locator('h1').first()).toHaveText("Dirk");

  //datum laten werken doormiddel van zelf te typen.


});