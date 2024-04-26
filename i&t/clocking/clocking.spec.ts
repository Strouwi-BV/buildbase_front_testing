import { test, expect } from '@playwright/test';
const { login } = require("../Utils/login");




test('Clocking process', async ({ browserName, page }) => {
  if (browserName === 'chromium') {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('dkyan007@gmail.com');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }
  if (browserName === 'webkit') {
    test.slow();
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@hotmail.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }
  if (browserName === 'firefox') {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@student.ucll.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }
    await page.waitForNavigation();
    await page.locator("(//div[contains(text(),'Prikking')])[1]").click();
    await page.click("(//input[@type='text'])[1]");
    await page.click("(//div[@role='option'])[1]");
    await page.getByLabel('Projectnaam').click();
    // await page.locator("(//div[@class='v-list-item v-list-item--link theme--light'])[1]").click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForTimeout(60000);
    await page.locator("(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]").click();
    await page.locator("(//button[@class='text-none pl-0 v-btn v-btn--text theme--light v-size--default grey--text'])[1]").isVisible();
  }
);




test('clocking tomorrow', async ({ browserName, page }) => {
  await login(page);
  const huidigeDatum = new Date();
  const tomorrow = (huidigeDatum.getDate()+1).toString();
  await page.click(`(//span[normalize-space()='${tomorrow}'])[1]`);

  await expect(page.locator("(//span[normalize-space()='Registreer uren'])[1]")).toBeHidden();
});


test('double clocking', async ({ browserName, page }) => {
  await login(page);
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);
  await page.click("(//span[normalize-space()='Registreer uren'])[1]");
  //await page.waitForNavigation();
  await page.getByLabel('Van').click();
  await page.getByLabel('Van').fill('07:00');
  await page.keyboard.press('A')
  await page.getByLabel('Tot').click();
  await page.getByLabel('Tot').fill('20:00');
  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@class='v-list-item__content'])[1]");
  await page.click("(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light error--text'])[1]");
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.getByRole("button", { name: "opslaan" }).click();

  await expect(page.getByText('Er bestaat al een')).toBeVisible();
});

test('double abscence', async ({ browserName, page }) => {
  await login(page);
  //abscence  registerren
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);

  //   tweede afwezigheid zelfde moment
  await page.getByRole('link', { name: 'Registreer afwezigheid' }).click();
  await page.getByLabel('Afwezigheids type').click();
  await page.getByRole('option', { name: 'Verlof' }).locator('div').first().click();
  await page.getByRole('button', { name: 'Opslaan' }).click();
  await expect(page.getByText('Er bestaat al een')).toBeVisible();
});

test('abscence with  registered  hours', async ({ browserName, page }) => {
  await login(page);
  //afwezigheid met al uren
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);
  await page.getByRole('link', { name: 'Registreer afwezigheid' }).click();
  await page.getByLabel('Afwezigheids type').click();
  await page.getByText('Ziekte').click();
  await page.getByRole('button', { name: 'Opslaan' }).click();
  await expect(page.getByText('Er bestaat al een')).toBeVisible();
});

test('edit clocking', async ({ browserName, page }) => {
  if (browserName === 'webkit') {
    // await login(page);
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('dkyan007@gmail.com');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }
  if (browserName === 'chromium') {
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@student.ucll.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }
  if (browserName === 'firefox') {
    // await login(page);
    await page.goto('https://backoffice-dev.buildbase.be/login');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyan.decerf@hotmail.be');
    await page.getByLabel('Wachtwoord', { exact: true }).click();
    await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
    await page.getByRole('button', { name: 'Inloggen' }).click();
  }


    await page.waitForNavigation();
    //  afwezigheid  wijzigen
    const huidigeDatum = new Date();
    const today = huidigeDatum.getDate().toString();
    await page.click(`(//span[normalize-space()='${today}'])[1]`);
    await page.waitForTimeout(5000);
    await page.click("(//span[normalize-space()='Registreer uren'])[1]");


    const huidigeTijd = new Date();
    const uur1 = huidigeTijd.getHours();
    const minuut1 = huidigeTijd.getMinutes();
    const uur2 = uur1;
    const minuut2 = minuut1 + 5;
    const minuut3= minuut2 +5;
    const minuut4 = minuut3 +5;

    await page.getByLabel('Van').click();
    await page.getByLabel('Van').fill(`${uur1 < 10 ? '0' + uur1 : uur1}:${minuut1 < 10 ? '0' + minuut1 : minuut1}`);

    // Vul het tweede tijdstip in
    await page.getByLabel('Tot').click();
    await page.getByLabel('Tot').fill(`${uur2 < 10 ? '0' + uur2 : uur2}:${minuut2 < 10 ? '0' + minuut2 : minuut2}`);

    await page.click("(//input[@type='text'])[1]");
    await page.click("(//div[@class='v-list-item__content'])[1]");
    await page.click("(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light error--text'])[1]");
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.getByRole("button", { name: "opslaan" }).click();
    await page.locator("//tbody/tr[1]/td[5]/button[1]").click();
    await page.getByLabel('Van').click();
    await page.getByLabel('Van').fill(`${uur1 < 10 ? '0' + uur1 : uur1}:${minuut3 < 10 ? '0' + minuut3 : minuut3}`);
    await page.getByLabel('Tot').click();
    await page.getByLabel('Tot').fill(`${uur2 < 10 ? '0' + uur2 : uur2}:${minuut4 < 10 ? '0' + minuut4 : minuut4}`);
    await page.getByRole('button', { name: 'Opslaan' }).click();
    await expect(page.getByText('Prikking werd gewijzigd')).toBeVisible();
  }
);




test('delete clocking  - webkit', async ({ browserName, page }) => {
  if (browserName === 'webkit') {
  //await login(page);
  await page.goto('https://backoffice-dev.buildbase.be/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('dkyan007@gmail.com');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
  await page.getByRole('button', { name: 'Inloggen' }).click();

  
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector van het tekst-element
    const tekstSelector = 'tbody tr:nth-child(1) td:nth-child(4)';

    // Lees de tekst op de pagina en sla het op als een constante
    const opgeslagenTekst: string = await page.innerText(tekstSelector);
      
    //afwezigheid verwijderen

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Controleer of de opgeslagen tekst zichtbaar is op de pagina
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();;

  }
});

test('delete clocking  - firefox', async ({ browserName, page }) => {
  if (browserName === 'firefox') {
  //await login(page);
  await page.goto('https://backoffice-dev.buildbase.be/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('kyan.decerf@hotmail.be');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
  await page.getByRole('button', { name: 'Inloggen' }).click();
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector van het tekst-element
    const tekstSelector = 'tbody tr:nth-child(1) td:nth-child(4)';

    // Lees de tekst op de pagina en sla het op als een constante
    const opgeslagenTekst: string = await page.innerText(tekstSelector);
      
    //afwezigheid verwijderen

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Controleer of de opgeslagen tekst zichtbaar is op de pagina
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();;

  }
});

test('delete clocking  - chromium', async ({ browserName, page }) => {
  if (browserName === 'chromium') {
  await login(page);

  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector van het tekst-element
    const tekstSelector = 'tbody tr:nth-child(1) td:nth-child(4)';

    // Lees de tekst op de pagina en sla het op als een constante
    const opgeslagenTekst: string = await page.innerText(tekstSelector);
      
    //afwezigheid verwijderen

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Controleer of de opgeslagen tekst zichtbaar is op de pagina
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();;

  }
});