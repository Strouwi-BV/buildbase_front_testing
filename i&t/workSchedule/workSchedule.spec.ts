

import { test, expect } from '@playwright/test';
import { time } from 'console';
const { login } = require("../Utils/login");

test.beforeEach('Login', async ({ page }) => {
    await login(page);
});

test('ScheduleCreate/delete', async ({ page }) => {
    //werkrooster
    test.setTimeout(180000);
    await page.getByRole('link', { name: 'Instellingen' }).click();
    await page.locator("(//div[@class='v-list-item__content ml-1 pa-0 text-uppercase small-caps font-weight-bold'][normalize-space()='Werkroosters'])[1]").click();
    await page.getByRole('button', { name: 'Nieuw werkrooster' }).click();//maakt werkrooster aan
    //vul naam in
    await page.locator("(//input[@type='text'])[1]").click();
    await page.locator("(//input[@type='text'])[1]").fill('Test');
    //pauze in minuten
    await page.locator("(//input[@type='text'])[2]").click();
    await page.locator("(//input[@type='text'])[2]").fill('50');
    //werkuren maandag
    await page.locator("(//input[@type='number'])[1]").click();
    await page.locator("(//input[@type='number'])[1]").fill('1');
    //werkuren dinsdag
    await page.locator("(//input[@type='number'])[2]").click();
    await page.locator("(//input[@type='number'])[2]").fill('2');
    //werkuren woensdag
    await page.locator("(//input[@type='number'])[3]").click();
    await page.locator("(//input[@type='number'])[3]").fill('3');
    //werkuren donderdag
    await page.locator("(//input[@type='number'])[4]").click();
    await page.locator("(//input[@type='number'])[4]").fill('4');
    //werkuren vrijdag
    await page.locator("(//input[@type='number'])[5]").click();
    await page.locator("(//input[@type='number'])[5]").fill('5');
    //werkuren zaterdag
    await page.locator("(//input[@type='number'])[6]").click();
    await page.locator("(//input[@type='number'])[6]").fill('6');
    //werkuren zondag
    await page.locator("(//input[@type='number'])[7]").click();
    await page.locator("(//input[@type='number'])[7]").fill('7');
    //werkuren maandag
    await page.locator("(//input[@type='time'])[1]").click();
    await page.locator("(//input[@type='time'])[1]").fill('07:00');
    //werkuren dinsdag
    await page.locator("(//input[@type='time'])[2]").click();
    await page.locator("(//input[@type='time'])[2]").fill('07:00');
    //werkuren woendag
    await page.locator("(//input[@type='time'])[3]").click();
    await page.locator("(//input[@type='time'])[3]").fill('07:00');
    //werkuren donderdag
    await page.locator("(//input[@type='time'])[4]").click();
    await page.locator("(//input[@type='time'])[4]").fill('07:00');
    //werkuren vrijdag
    await page.locator("(//input[@type='time'])[5]").click();
    await page.locator("(//input[@type='time'])[5]").fill('07:00');
    //werkuren zaterdag
    await page.locator("(//input[@type='time'])[6]").click();
    await page.locator("(//input[@type='time'])[6]").fill('07:00');
    //werkuren zondag
    await page.locator("(//input[@type='time'])[7]").click();
    await page.locator("(//input[@type='time'])[7]").fill('07:00');
    //click op opslaan
    await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click()
    // verwijdert
    //await page.locator("(//button[@class='v-btn v-btn--fab v-btn--icon v-btn--round theme--dark v-size--default primary--text'])[3]").click();

})


