import { test, expect } from '@playwright/test';

test.describe('azure dev', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  
  test('visits buildbase dev login', async ({ page }) => {
    await page.goto('/login', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('h1')).toHaveText('Welkom bij');
  })
})
  