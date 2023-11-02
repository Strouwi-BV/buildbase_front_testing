import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro


test('visits the app root url', async ({ page }) => {
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})


// test('fails', async () => {
//   await expect(true).toBeFalsy();
// })