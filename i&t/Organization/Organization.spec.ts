import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')
const generateRandomString = require('../Utils/randomString');

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

const randomString = generateRandomString();
test('Create client', async ({ page }) => {
    test.setTimeout(60000);
    await page.getByRole('link', { name: 'Instellingen' }).click();
    await page.locator("(//div[@role='option'])[2]").click();
    await page.locator("(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[1]").click();
    await page.locator("(//input[@type='text'])[1]").click();
    await page.locator("(//input[@type='text'])[1]").fill('test');
    await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();

    await page.locator("(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[2]").click();
    await page.locator("(//input[@type='text'])[2]").click();
    await page.locator("(//input[@type='text'])[2]").fill('btw');
    await page.locator("(//input[@type='text'])[3]").click();
    await page.locator("(//input[@type='text'])[3]").fill('straat');
    await page.locator("(//input[@type='text'])[4]").click();
    await page.locator("(//input[@type='text'])[4]").fill('huisnummer');
    await page.locator("(//input[@type='text'])[5]").click();
    await page.locator("(//input[@type='text'])[5]").fill('bus');
    await page.locator("(//input[@type='text'])[6]").click();
    await page.locator("(//input[@type='text'])[6]").fill('bostcode');
    await page.locator("(//input[@type='text'])[7]").click();
    await page.locator("(//input[@type='text'])[7]").fill('stad');
    await page.locator("(//input[@type='text'])[8]").click();
    await page.locator("(//input[@type='text'])[8]").fill('provincie');
    await page.locator("(//input[@autocomplete='off'])[1]").click()
    await page.locator("(//div[contains(text(),'België')])[1]").click()
    await page.locator("(//div[contains(text(),'Klanten')])[1]").click()
});