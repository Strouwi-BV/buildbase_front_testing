import { test, expect } from '@playwright/test';
const { login } = require('./login');
const generateRandomString = require('./randomString');

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


  await page.getByRole('button', { name: 'Opslaan' }).click();

  await expect(page.locator('h1').first()).toHaveText(randomString);
});


test('Create Project', async ({ page }) => {
  test.setTimeout(60000);
  await page.getByRole('link', { name: 'Projecten' }).click();
  await page.click("(//button[@class='secondary text-none v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]");
  await page.waitForNavigation();
  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@role='option'])[1]");
  const randomString = generateRandomString();
  await page.locator("(//input[@type='text'])[2]").fill(randomString);
  await page.click("(//input[@role='button'])[1]");
  await page.click("(//button[@type='button'])[31]");
  await page.click("(//input[@aria-expanded='false'])[1]");
  await page.click("(//button[@type='button'])[66]");
  await page.click("(//input[@type='number'])[1]");
  await page.locator("(//input[@type='number'])[1]").fill("50");

  await page.getByRole('button', { name: 'Opslaan' }).click();

  await expect(page.locator('h1').first()).toHaveText(randomString);
});


