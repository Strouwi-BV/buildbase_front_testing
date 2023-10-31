import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro


test('visits the app root url', async ({ page }, testInfo) => {
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
  const screenshot = await page.screenshot({ path: 'screenshot.png' });
  await testInfo.attach('visits_the_app_root_url', { body: screenshot, contentType: 'image/png' })
})


test('fails', async ({ page }, testInfo) => {
  await expect(true).toBeFalsy();
  const screenshot = await page.screenshot({ path: 'screenshot.png' });
  await testInfo.attach('fails', { body: screenshot, contentType: 'image/png' })
})