import { test, expect } from "@playwright/test";
import { before } from "node:test";
import { text } from "stream/consumers";
const { login } = require('./utils');

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('get started link', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/settings/license');
    await page.click("//span[normalize-space()='Koop abonnement']");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "Straat:" }).click();
    await page.getByRole("textbox", { name: "Straat:" }).fill("Bonkenstraat");
    await page.click("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)");
    await page.fill("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)", "5");
    await page.waitForTimeout(2000);
});