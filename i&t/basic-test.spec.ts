import { test, expect } from '@playwright/test';

test.describe('azure dev', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  
  test('visits buildbase dev login', async ({ page }) => {
    await page.goto('/login', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('h1')).toHaveText('Welkom bij');
  })
})
  
test.describe('Trial subscription', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  test.setTimeout(60000);

  test('test', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/');
    await page.getByRole('link', { name: 'Registreer.' }).click();
    await page.locator('#input-58').click();
    await page.locator('#input-58').fill('buildByMe');
    await page.locator('#input-59').click();
    await page.locator('#input-59').fill('Kyan');
    await page.locator('#input-60').click();
    await page.locator('#input-60').fill('Decerf');
    await page.locator('#input-61').click();
    await page.locator('#input-61').fill('dkyan007@gmail.com');
    await page.locator('#input-63').click();
    await page.locator('#input-63').fill('Test123');
    await page.locator('#confirmPassword').click();
    await page.locator('#confirmPassword').fill('Test123');
    await page.getByText('Gratis proefversie').click();
    await page.locator('.v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').first().click();
    await page.getByRole('button', { name: 'Start 30 dagen gratis' }).click();
  });
})