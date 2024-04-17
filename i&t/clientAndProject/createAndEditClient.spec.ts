import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')
const generateRandomString = require('../Utils/randomString');

test.beforeEach('Login', async ({ page }) => {
  await login(page);
});

test('Create client', async ({ page }) => {
  test.setTimeout(60000);
  await page.getByRole('link', { name: 'Klanten' }).click();
  await page.locator("(//button[@class='secondary text-none v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();
  await page.locator("(//input[@type='text'])[1]").click();
  const randomString = generateRandomString();
  await page.locator("(//input[@type='text'])[1]").fill(randomString);
  await page.click("(//input[@role='button'])[1]");
  await page.click("(//button[@type='button'])[26]");
  await page.click("(//input[@aria-expanded='false'])[1]");
  await page.click("(//button[@type='button'])[64]");


  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();

  await expect(page.locator('h1').first()).toHaveText(randomString);
});