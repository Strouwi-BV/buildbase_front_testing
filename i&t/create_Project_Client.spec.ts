import { test, expect } from '@playwright/test';
const { login } = require('./login');
const generateRandomString = require('./randomString');

test.beforeEach('Login', async ({ page }) => {
  await login(page);
});

test('Create client', async ({ page }) => {
  await page.getByRole('link', { name: 'Klanten' }).click();
  await page.getByRole('button', { name: 'Nieuwe klant' }).click();
  await page.getByLabel('Klant naam').click();
  const randomString = generateRandomString();
  await page.getByLabel('Klant naam').fill(randomString);
  await page.click('//label[contains(text(), "Start datum")]/following-sibling::input');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Backspace');
  }
  await page.fill('//label[contains(text(), "Start datum")]/following-sibling::input', '27/12/2018');
  await page.click('//label[contains(text(), "Eind datum")]/following-sibling::input');
  await page.fill('//label[contains(text(), "Eind datum")]/following-sibling::input', '29/12/2018');


  await page.getByRole('button', { name: 'Opslaan' }).click();

  await expect(page.locator('h1').first()).toHaveText(randomString);
});


test('Create Project', async ({ page }) => {
  await page.getByRole('link', { name: 'Projecten' }).click();
  await page.click('button i.mdi.mdi-plus');
  await page.waitForNavigation();
  await page.getByLabel('Klant').selectOption({});
  const randomString = generateRandomString();
  await page.getByLabel('Project naam').fill(randomString);
  await page.click('xpath=//label[contains(text(), "Start datum")]/following-sibling::input');
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Backspace');
  }
  await page.fill('xpath=//label[contains(text(), "Start datum")]/following-sibling::input', '27/12/2018');
  await page.click('xpath=//label[contains(text(), "Eind datum")]/following-sibling::input');
  await page.fill('xpath=//label[contains(text(), "Eind datum")]/following-sibling::input', '29/12/2018');

  await page.getByRole('button', { name: 'Opslaan' }).click();

  await expect(page.locator('h1').first()).toHaveText(randomString);
});


