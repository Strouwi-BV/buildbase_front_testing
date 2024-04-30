import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login");
const generateRandomString = require("../Utils/randomString");

// This test runs before each test case to ensure the user is logged in
test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("ChangePassword", async ({ page }) => {
  test.setTimeout(180000);

  //Clicking on the element to navigate to the change password page
  await page
    .locator(
      "(//div[@class='v-card__title text-h6 small-caps font-weight-bold pl-1'])[1]"
    )
    .click();
  await page
    .locator("(//span[normalize-space()='WIJZIG WACHTWOORD'])[1]")
    .click();

  //Filling in current password
  await page.locator("(//input[@type='password'])[1]").click();
  await page.locator("(//input[@type='password'])[1]").fill("Test123");
  await page.locator("(//input[@type='password'])[2]").click();

  //Filling & confirming the new password
  await page.locator("(//input[@type='password'])[2]").fill("Test321");
  await page.locator("(//input[@type='password'])[3]").click();
  await page.locator("(//input[@type='password'])[3]").fill("Test321");
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();

  await page.waitForTimeout(2000);

  //Changing the password back to the old one
  await page
    .locator(
      "(//div[@class='v-card__title text-h6 small-caps font-weight-bold pl-1'])[1]"
    )
    .click();
  await page
    .locator("(//span[normalize-space()='WIJZIG WACHTWOORD'])[1]")
    .click();

  //Filling in current password
  await page.locator("(//input[@type='password'])[1]").click();
  await page.locator("(//input[@type='password'])[1]").fill("Test321");
  await page.locator("(//input[@type='password'])[2]").click();

  //Filling & confirming the new password
  await page.locator("(//input[@type='password'])[2]").fill("Test123");
  await page.locator("(//input[@type='password'])[3]").click();
  await page.locator("(//input[@type='password'])[3]").fill("Test123");
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click();
});
