import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';
const generateRandomEmail = require("../Utils/generateEmail");
const generateRandomString = require("../Utils/randomString")

test.describe('Trial subscription', () => {
    test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
   
  
    test('Trial subscription account', async ({ page }) => {
      await page.goto('https://backoffice-dev.buildbase.be/');
      await page.locator("(//a[normalize-space()='Registreer.'])[1]").click();
      await page.locator("(//input[@type='text'])[1]").click();
      await page.locator("(//input[@type='text'])[1]").fill('buildByMe');
      await page.locator("(//input[@type='text'])[2]").click();
      const randomstring = generateRandomString();
      await page.locator("(//input[@type='text'])[2]").fill(randomstring);
      await page.locator("(//input[@type='text'])[3]").click();
      await page.locator("(//input[@type='text'])[3]").fill('Kyan');
      await page.locator("(//input[@type='text'])[4]").click();
      await page.locator("(//input[@type='text'])[4]").fill('Decerf');
      await page.locator("(//input[@type='email'])[1]").click();
      const randomEmail = generateRandomEmail();
      await page.locator("(//input[@type='email'])[1]").fill(randomEmail);
      await page.locator("(//input[@type='text'])[5]").click();
      await page.locator("(//input[@type='text'])[5]").fill(randomstring);
      await page.locator("(//input[@type='password'])[1]").click();
      await page.fill("(//input[@type='password'])[1]",'Test123');
      await page.click("(//input[@tabindex='NaN'])[1]");
      await page.locator("(//input[@tabindex='NaN'])[1]").fill('Test123');
      await page.locator('div').filter({ hasText: /^Gratis proefversie$/ }).locator('div').nth(1).click();
      await page.locator("(//div[@class='v-input--selection-controls__ripple'])[2]").click();
      await page.getByRole('button', { name: 'Start 30 dagen gratis' }).click();
      await page.waitForNavigation({ timeout: 5000 });
      await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/calendar")
    });
  })