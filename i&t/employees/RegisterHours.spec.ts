import { test, expect } from "@playwright/test";

const generateRandomEmail = require("../Utils/generateEmail.ts");
const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
    await login(page);
});

test("registerHoursForOthers", async ({ page }) => {
    test.setTimeout(600000);
    await page.locator("(//div[contains(text(),'Werknemers')])[1]").click();
    await page.waitForLoadState;
    await page.locator("(//tr[@class='clickable'])[4]").click();
    await page.locator("(//span[normalize-space()='Acties'])[1]").click();
    await page.locator("(//div[normalize-space()='Registreer uren'])[1]").click();
    await page.locator("(//button[@class='v-btn v-btn--fab v-btn--has-bg v-btn--round theme--light v-size--small primary'])[1]").click();
    await page.locator("(//span[normalize-space()='Registreer uren'])[1]").click();
    //await page.locator("(//input[@type='time'])[1]").click();
    await page.locator("(//input[@type='time'])[1]").fill("08:30");
    await page.locator("(//input[@type='time'])[2]").fill("08:30");
    await page.locator("(//input[@type='text'])[1]").click();
    await page.locator("(//div[@class='v-list-item__content'])[1]").click();
    await page.locator("(//input[@type='text'])[2]").click();
    await page.locator("(//div[contains(text(),'Testrv1wly3cc0')])[1]").click();
    await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();
});