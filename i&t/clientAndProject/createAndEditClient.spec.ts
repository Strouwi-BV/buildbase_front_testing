import { test, expect } from '@playwright/test';
const { login } = require('../Utils/login')
const generateRandomString = require('../Utils/randomString');

test.beforeEach('Login', async ({ page }) => {
  await login(page);
});

const randomString = generateRandomString();
test('Create client', async ({ page }) => {
  test.setTimeout(60000);
  await page.getByRole('link', { name: 'Klanten' }).click();
  await page.locator("(//button[@class='secondary text-none v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();
  await page.locator("(//input[@type='text'])[1]").click();
  await page.locator("(//input[@type='text'])[1]").fill(randomString);
  await page.click("(//input[@role='button'])[1]");
  await page.click("(//button[@type='button'])[26]");
  await page.click("(//input[@aria-expanded='false'])[1]");
  await page.click("(//button[@type='button'])[64]");


  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();

  await expect(page.locator('h1').first()).toHaveText(randomString);


  await page.locator("(//a[normalize-space()='Terug naar klanten'])[1]").click();

  await page.locator("(//tr[@class='clickable'])[4]").click();

  await page.getByRole('button', { name: 'Acties' }).click();
  await page.getByText('Zet op inactief').click();
  await page.getByRole('button', { name: 'Bevestig' }).click();
  await page.getByRole('button', { name: 'Acties' }).click();
  await page.getByText('Zet op actief').click();
  await page.getByRole('button', { name: 'Bevestig' }).click();


  await page.locator("(//a[@class='text-decoration-none clickable'])[1]")
    .first()
    .click();
  await page.locator("(//input[@type='text'])[1]").click()
  await page.locator("(//input[@type='text'])[1]").fill('bob');
  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();

  await page.locator("(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[2]")
    .first()
    .click();
  await page.locator("(//input[@type='text'])[4]").click()
  await page.locator("(//input[@type='text'])[4]").fill('bobsonstraat');
  await page.locator("(//input[@type='text'])[5]").click()
  await page.locator("(//input[@type='text'])[5]").fill('5');
  await page.locator("(//input[@type='text'])[6]").click()
  await page.locator("(//input[@type='text'])[6]").fill('585768');
  await page.locator("(//input[@type='text'])[7]").click()
  await page.locator("(//input[@type='text'])[7]").fill('70702');
  await page.locator("(//input[@type='text'])[8]").click()
  await page.locator("(//input[@type='text'])[8]").fill('bobrijk');
  await page.locator("(//input[@type='text'])[9]").click()
  await page.locator("(//input[@type='text'])[9]").fill('Limburg');
  await page.locator("(//input[@autocomplete='off'])[1]").click()
  await page.locator("(//div[contains(text(),'België')])[1]").click()
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click()

  await page.locator("(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[3]")
    .first()
    .click();
  await page.locator("(//input[@type='text'])[1]").click()
  await page.locator("(//input[@type='text'])[1]").fill('bob');
  await page.locator("(//input[@type='text'])[2]").click()
  await page.locator("(//input[@type='text'])[2]").fill('bobson');
  await page.locator("(//input[@type='text'])[3]").click()
  await page.locator("(//input[@type='text'])[3]").fill('32 111 111 111');
  await page.locator("(//input[@type='email'])[1]").click()
  await page.locator("(//input[@type='email'])[1]").fill('bob.bobson@gmail.com');
  await page.locator("(//input[@type='text'])[4]").click()
  await page.locator("(//input[@type='text'])[4]").fill('iets');
  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]")
    .first()
    .click();

  await page.getByRole('button', { name: 'Acties' }).click();
  await page.getByText('Verwijder').click();
  await page.getByRole('button', { name: 'Bevestig' }).click();
});