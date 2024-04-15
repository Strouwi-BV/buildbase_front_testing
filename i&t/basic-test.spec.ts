import { test, expect } from '@playwright/test';

test.describe('azure dev', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  
  test('visits buildbase dev login', async ({ page }) => {
    await page.goto('/login', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('h1')).toHaveText('Welkom bij');
  })
})

test.describe('Login-Logout', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});


  test('Login-Logout', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('Kyan.decerf@student.ucll.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
    await page.getByRole('button', { name: 'Kyan Decerf KD' }).click();
    await page.getByRole('button', { name: 'AFMELDEN' }).click();
    await page.waitForNavigation({ timeout: 5000 });
    await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/login")
  });
})

