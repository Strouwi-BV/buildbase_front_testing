import { test, expect } from "@playwright/test";
import { before } from "node:test";
import { text } from "stream/consumers";
const { login } = require("../Utils/login.ts");

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('get started link', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/hours');
    await page.getByRole("button", { name: "Optie" }).click();
    await page.click("(//div[@role='option'])[2]");
    await page.getByRole("button", { name: "Personeelslid" }).click();
    await page.click("//div[@class='v-list-item__title'][normalize-space()='Alle']");
    await page.getByRole("button", { name: "Deze maand" }).click();
    await page.click("//div[@class='v-list-item__title'][normalize-space()='Dit jaar']");
    await page.getByRole("button", { name: "TOON DATA" }).click();
});

