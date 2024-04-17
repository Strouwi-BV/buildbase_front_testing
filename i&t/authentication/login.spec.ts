import { test, expect } from '@playwright/test';
const { login } = require("../Utils/login");

test.beforeEach('Login', async ({ page }) => {
  await login(page);
});

test('Login-Logout', async ({ page }) => {
  await page.getByRole('button', { name: 'Kyan Decerf KD' }).click();
  await page.getByRole('button', { name: 'AFMELDEN' }).click();
  await page.waitForNavigation({ timeout: 5000 });
  await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/login")
});