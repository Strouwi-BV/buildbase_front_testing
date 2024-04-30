import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')
const generateRandomString = require('../Utils/randomString');

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('FilterAndSearch', async ({ page }) => {
    test.setTimeout(180000);
    await page.locator("(//div[contains(text(),'Klanten')])[1]").click();
    await page.locator("(//button[@class='tertiary text-none v-btn v-btn--outlined theme--light v-size--default mr-2'])[1]").click();
    await page.waitForTimeout(1000);
    await page.locator("(//label[normalize-space()='Actief'])[1]").click();
    await page.waitForTimeout(1000);
    await page.locator("(//label[normalize-space()='Actief'])[1]").click();
    await page.locator("(//div)[117]").click();
    await page.waitForTimeout(1000);
    await page.locator("(//input[@type='search'])[1]").click();
    await page.locator("(//div)[117]").click();
    await page.locator("(//input[@type='search'])[1]").fill('testen');

})