import { test, expect } from '@playwright/test';
import { time } from 'console';


test('ScheduleCreate/delete', async ({ page }) => {
  //inlogen
  await page.goto('https://backoffice-dev.buildbase.be/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('Rune.Theunis@student.ucll.be');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('Test321');
  await page.getByRole('button', { name: 'Inloggen' }).click();

  //------------------------------------------------------------------------------------------------------------------------------------
  //werkrooster
  test.setTimeout(180000);

  await page.getByRole('link', { name: 'Instellingen' }).click();
  await page.locator("(//div[@class='v-list-item__content ml-1 pa-0 text-uppercase small-caps font-weight-bold'][normalize-space()='Werkroosters'])[1]").click();

  //await page.goto('https://backoffice-dev.buildbase.be/settings/work-schedules/');

  await page.getByRole('button', { name: 'Nieuw werkrooster' }).click();
  await page.locator("(//input[@type='text'])[1]").click();
  await page.locator("(//input[@type='text'])[1]").fill('Test2');
  await page.locator("(//input[@type='text'])[2]").click();
  await page.locator("(//input[@type='text'])[2]").fill('50');
  await page.locator("(//input[@type='number'])[1]").click();
  await page.locator("(//input[@type='number'])[1]").fill('1');
  await page.locator("(//input[@type='number'])[2]").click();
  await page.locator("(//input[@type='number'])[2]").fill('2');
  await page.locator("(//input[@type='number'])[3]").click();
  await page.locator("(//input[@type='number'])[3]").fill('3');
  await page.locator("(//input[@type='number'])[4]").click();
  await page.locator("(//input[@type='number'])[4]").fill('4');
  await page.locator("(//input[@type='number'])[5]").click();
  await page.locator("(//input[@type='number'])[5]").fill('5');
  await page.locator("(//input[@type='number'])[6]").click();
  await page.locator("(//input[@type='number'])[6]").fill('6');
  await page.locator("(//input[@type='number'])[7]").click();
  await page.locator("(//input[@type='number'])[7]").fill('7');
  await page.locator("(//input[@type='time'])[1]").click();
  await page.locator("(//input[@type='time'])[1]").fill('07:00');
  await page.locator("(//input[@type='time'])[2]").click();
  await page.locator("(//input[@type='time'])[2]").fill('07:00');
  await page.locator("(//input[@type='time'])[3]").click();
  await page.locator("(//input[@type='time'])[3]").fill('07:00');
  await page.locator("(//input[@type='time'])[4]").click();
  await page.locator("(//input[@type='time'])[4]").fill('07:00');
  await page.locator("(//input[@type='time'])[5]").click();
  await page.locator("(//input[@type='time'])[5]").fill('07:00');
  await page.locator("(//input[@type='time'])[6]").click();
  await page.locator("(//input[@type='time'])[6]").fill('07:00');
  await page.locator("(//input[@type='time'])[7]").click();
  await page.locator("(//input[@type='time'])[7]").fill('07:00');
  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click()
  await page.locator("(//button[@class='v-btn v-btn--fab v-btn--icon v-btn--round theme--dark v-size--default primary--text'])[3]").click();
  //------------------------------------------------------------------------------------------------------------------------------------
  //klanten edit

  await page.getByRole('link', { name: 'Klanten' }).click();
  await page.getByText('bob').click();//bob is een exemplaar(werkt alleen op mijn acount) vul een naam hier in

  await page.waitForNavigation({ timeout: 5000 });
  await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/clients/00209")

  await page.getByRole('button', { name: 'Acties' }).click();
  await page.getByText('Zet op inactief').click();
  await page.getByRole('button', { name: 'Bevestig' }).click();
  await page.getByRole('button', { name: 'Acties' }).click();
  await page.getByText('Zet op actief').click();
  await page.getByRole('button', { name: 'Bevestig' }).click();

  await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/clients/00209")

  await page.locator("(//a[@class='text-decoration-none clickable'])[1]")
    .first()
    .click();


  await page.locator("(//input[@type='text'])[1]").click()
  await page.locator("(//input[@type='text'])[1]").fill('john');
  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();
  //automatisch terug naar bob zetten zodar ik het opnieuw kan testen zonder handmatig iets te veranderen
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
  await page.locator("(//input[@type='text'])[4]").fill('bobsonstraat2');
  await page.locator("(//input[@type='text'])[5]").click()
  await page.locator("(//input[@type='text'])[5]").fill('5');
  await page.locator("(//input[@type='text'])[7]").click()
  await page.locator("(//input[@type='text'])[7]").fill('70702');
  await page.locator("(//input[@type='text'])[8]").click()
  await page.locator("(//input[@type='text'])[8]").fill('bobrijk2');
  await page.locator("(//input[@type='text'])[9]").click()
  await page.locator("(//input[@type='text'])[9]").fill('Limburg2');
  await page.locator("(//input[@autocomplete='off'])[1]").click()
  await page.locator("(//div[contains(text(),'België')])[1]").click()
  await page.locator("(//span[normalize-space()='Opslaan'])[1]").click()

  await page.locator("(//i[@class='v-icon notranslate vertical-align-baseline v-icon--dense mdi mdi-pencil theme--light'])[3]")
    .first()
    .click();
  await page.locator("(//input[@type='text'])[1]").click()
  await page.locator("(//input[@type='text'])[1]").fill('bob2');
  await page.locator("(//input[@type='text'])[2]").click()
  await page.locator("(//input[@type='text'])[2]").fill('bobson2');
  await page.locator("(//input[@type='text'])[3]").click()
  await page.locator("(//input[@type='text'])[3]").fill('32 111 111 1112');
  await page.locator("(//input[@type='email'])[1]").click()
  await page.locator("(//input[@type='email'])[1]").fill('bob.bobson@gmail.com2');
  await page.locator("(//input[@type='text'])[4]").click()
  await page.locator("(//input[@type='text'])[4]").fill('iets2');
  await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]")
    .first()
    .click();
  //-----------------------------------------------------------
  //await page.getByRole('button', { name: 'Acties' }).click();
  //await page.getByText('Verwijder').click();
  //await page.getByRole('button', { name: 'Bevestig' }).click();

})