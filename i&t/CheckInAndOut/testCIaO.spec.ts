import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')

test.beforeEach('Login', async ({ page }) => {
    await login(page);
    await page.context().grantPermissions(['geolocation']);
});

test('get started link', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/settings/parameters');
    const checkboxSelector =
        "//div[@role='list']//div[2]//div[2]//div[1]//div[2]//div[1]//div[1]//div[1]//div[1]//div[1]";
    await page.waitForSelector(checkboxSelector);
    await page.waitForTimeout(1000);
    await page.goto('https://backoffice-dev.buildbase.be/settings/ciao');
    await page.waitForTimeout(1000);
    await page.goto('https://backoffice-dev.buildbase.be/pricking');
    await page.getByRole("button", { name: "Klantnaam" }).click();
    await page.click("(//div[@role='option'])[3]");
    await page.getByRole("button", { name: "Projectnaam" }).click();
    await page.click("(//div[@role='option'])[1]");
    await page.getByRole("button", { name: "Start" }).click();
    await page.waitForTimeout(1000);

});