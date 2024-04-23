import { test, expect } from "@playwright/test";
import { before } from "node:test";
import { text } from "stream/consumers";
const { login } = require('./utils');

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('get started link', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/hours');
    await page.getByRole("button", { name: "Optie" }).click();
    await page.getByRole("option", { name: "Personen" }).click();
    await page.getByRole("button", { name: "Personeelslid" }).click();  // Afhankelijk van de keuze Optie !!
    await page.getByRole("option", { name: "Steven Reynaerts" }).click();
    await page.getByRole("button", { name: "Deze maand" }).click();
    await page.getByRole("option", { name: "Dit jaar" }).click();
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "TOON DATA" }).click();
    await page.waitForTimeout(3000);
});

