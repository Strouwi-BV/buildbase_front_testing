import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')
const generateRandomString = require('../Utils/randomString');

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('ChangePassword', async ({ page }) => {
    test.setTimeout(180000);
    await page.locator("(//div[@class='v-card__title text-h6 small-caps font-weight-bold pl-1'])[1]").click();
    await page.locator("(//span[normalize-space()='WIJZIG WACHTWOORD'])[1]").click();
    await page.locator("(//input[@type='password'])[1]").click();
    await page.locator("(//input[@type='password'])[1]").fill('Test123');
    await page.locator("(//input[@type='password'])[2]").click();
    await page.locator("(//input[@type='password'])[2]").fill('Test321');
    await page.locator("(//input[@type='password'])[3]").click();
    await page.locator("(//input[@type='password'])[3]").fill('Test321');
    await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();

    await page.waitForTimeout(2000);
    //reset
    await page.locator("(//div[@class='v-card__title text-h6 small-caps font-weight-bold pl-1'])[1]").click();
    await page.locator("(//span[normalize-space()='WIJZIG WACHTWOORD'])[1]").click();
    await page.locator("(//input[@type='password'])[1]").click();
    await page.locator("(//input[@type='password'])[1]").fill('Test321');
    await page.locator("(//input[@type='password'])[2]").click();
    await page.locator("(//input[@type='password'])[2]").fill('Test123');
    await page.locator("(//input[@type='password'])[3]").click();
    await page.locator("(//input[@type='password'])[3]").fill('Test123');
    await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();
})