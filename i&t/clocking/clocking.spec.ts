import { test, expect } from '@playwright/test';
const { login } = require("../Utils/login");




test('Clocking process - Chromium', async ({ browserName, page }) => {
  if (browserName === 'chromium') {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('dkyan007@gmail.com');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
    await page.waitForNavigation();
    await page.locator("(//div[contains(text(),'Prikking')])[1]").click();
    await page.click("(//input[@type='text'])[1]");
    await page.click("(//div[@role='option'])[1]");
    await page.getByLabel('Projectnaam').click();
    await page.locator("(//div[@class='v-list-item v-list-item--link theme--light'])[1]").click();
    await page.getByRole('button', { name: 'Start' }).click();
    //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
    await page.waitForTimeout(60000);
    await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();
    //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
    await page.locator("(//button[@class='text-none pl-0 v-btn v-btn--text theme--light v-size--default grey--text'])[1]").isVisible();
  }
});


test('Clocking process - Firefox', async ({ browserName, page }) => {
  if (browserName === 'firefox') {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@student.ucll.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
    await page.waitForNavigation();
    await page.locator("(//div[contains(text(),'Prikking')])[1]").click();
    await page.waitForNavigation();
    await page.click("(//input[@type='text'])[1]");
    await page.click("(//div[@role='option'])[1]");
    await page.getByLabel('Projectnaam').click();
    await page.locator("//body/div[@class='v-application v-application--is-ltr theme--light']/div[@class='v-menu__content theme--light menuable__content__active']/div[@role='listbox']/div[1]/div[1]").click();
    await page.locator("(//span[normalize-space()='Start'])[1]").click();
    //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
    // Wacht 60 seconden
    await page.waitForTimeout(60000);
    
    await page.locator("(//span[normalize-space()='Stop'])[1]").click();
    //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
    await page.locator("(//button[@class='text-none pl-0 v-btn v-btn--text theme--light v-size--default grey--text'])[1]").isVisible();
  }
});


// test('Clocking process start - WebKit', async ({ browserName, page }) => {
//   if (browserName === 'webkit') {
//     await page.goto('https://backoffice-dev.buildbase.be/login');
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('dkyan007@gmail.com');
//     await page.getByLabel('Wachtwoord', { exact: true }).click();
//     await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
//     await page.getByRole('button', { name: 'Inloggen' }).click();
//     await page.waitForNavigation();
//     await page.getByRole('link', { name: 'Prikking' }).click();
//     await page.click("(//input[@type='text'])[1]");
//     await page.click("(//div[@role='option'])[1]");
//     await page.getByLabel('Projectnaam').click();
//     await page.locator("(//div[@class='v-list-item v-list-item--link theme--light'])[1]").click();
//     await page.getByRole('button', { name: 'Start' }).click();
//     //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
    
//   }
// });

// test('Clocking process stop - WebKit', async ({ browserName, page }) => {
//   if (browserName === 'webkit') {
// // Wacht 60 seconden
// await page.waitForTimeout(60000);
    
// await page.getByRole('button', { name: 'Stop' }).click();
// //await expect(page.locator("(//div[@class='v-snack__wrapper v-sheet theme--light banner-green'])[1]")).toBeVisible();
// await expect(page.getByRole('main')).toContainText('Terug naar kalender');
//   }
// });



test('Clocking process - WebKit', async ({ browserName, page }) => {
  if (browserName === 'webkit') {
    test.slow();
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@hotmail.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
    await page.waitForNavigation();
    await page.locator("(//div[contains(text(),'Prikking')])[1]").click();
    await page.waitForNavigation();
    await page.click("(//input[@type='text'])[1]");
    await page.click("(//div[@role='option'])[1]");
    await page.getByLabel('Projectnaam').click();
    await page.locator("(//div[@class='v-list-item v-list-item--link theme--light'])[1]").click();
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForTimeout(60000);
    await page.locator("(//span[normalize-space()='Stop'])[1]").click();
    await page.locator("(//button[@class='text-none pl-0 v-btn v-btn--text theme--light v-size--default grey--text'])[1]").isVisible();
  }
});



