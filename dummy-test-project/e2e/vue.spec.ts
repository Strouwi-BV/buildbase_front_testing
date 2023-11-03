import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})

test.describe('azure dev', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  
  test('visits buildbase dev login', async ({ page }) => {
    await page.goto('/login', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('h1')).toHaveText('Welkom bij');
  })
})
  