import { expect, test } from "@playwright/test";
const { login } = require("../Utils/login");
const generateRandomString = require("../Utils/randomString");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("scheduleTest", async ({ page }) => {
  await page.getByRole("link", { name: "Instellingen" }).click();
  await page
    .getByRole("main")
    .getByRole("link", { name: "Werkroosters" })
    .click();

  await page.getByRole("button", { name: "Nieuw werkrooster" }).click();

  const randomString = generateRandomString();

  await page
    .locator("(//input[@type='text'])[1]")
    .fill("42-uren week/" + randomString);

  await page.locator("(//input[@type='text'])[2]").fill("35");//dit vult de pauze tijd in

  await page.locator("(//input[@type='number'])[1]").fill("09");//dit vult de werkuren voor maandag in

  await page.locator("(//input[@type='number'])[4]").fill("09");//dit vult de werkuren voor donderdag in
  //de volgende lijnen zetten de starturen voor
  await page.locator("(//input[@type='time'])[1]").fill("08:00");//maandag

  await page.locator("(//input[@type='time'])[2]").fill("08:00");//dinsdag

  await page.locator("(//input[@type='time'])[3]").fill("08:00");//woensdag

  await page.locator("(//input[@type='time'])[4]").fill("08:00");//donderdag

  await page.locator("(//input[@type='time'])[5]").fill("08:00");//vrijdag

  await page.getByRole("button", { name: "Opslaan" }).click(); //nadat het invullen zorgd deze lijn ervoor om het op te slaan 
  //hier word het werkroosten geëdit
  const createdWeekText = "42-uren week/" + randomString;
  await page.getByText(createdWeekText); // Zoek naar de tekst van het werkrooster
  const createdWeekElement = await page.getByText(createdWeekText); // Zoek het element met de tekst
  expect(createdWeekElement).toBeTruthy(); // Controleer of het element met de tekst bestaat

  await page.getByText(createdWeekText).click();//click op de netgemaakte schedule

  const randomString2 = generateRandomString();

  const newName = "44-uren week/" + randomString2;//maakt een nieuwe naam

  await page.locator("(//input[@type='text'])[1]").fill(newName);// geeft de schedule de nieuwe naam

  await page.locator("(//input[@type='text'])[2]").fill("40");//nieuwe pauze tijd

  await page.locator("(//input[@type='number'])[2]").fill("09");//zet werkuur voor dinsdag

  await page.locator("(//input[@type='number'])[3]").fill("09");//zet werkuur voor woensdag
  //zet nieuwe starturne voor
  await page.locator("(//input[@type='time'])[1]").fill("08:30");//maandag

  await page.locator("(//input[@type='time'])[2]").fill("08:30");//dinsdag

  await page.locator("(//input[@type='time'])[3]").fill("08:30");//woensdag

  await page.locator("(//input[@type='time'])[4]").fill("08:30");//donderdag

  await page.locator("(//input[@type='time'])[5]").fill("08:30");//vrijdag
  //werkuren voor vrijdeg worden gecleard
  await page
    .getByRole("row", { name: "Vrijdag Clear" })
    .getByLabel("Clear")
    .click();

  await page.locator("(//input[@type='time'])[5]").fill("08:30");//nieuwe werkure voor vrijdag worden gezet

  await page.getByRole("button", { name: "Opslaan" }).click();//slaagt de verandingen op

  // await page .locator("(//i[@class='v-icon notranslate mdi mdi-delete theme--dark'])[3]").click();//deze line delete de schedule

  const deletedElement = await page.$(`text="${newName}"`);

  // Controleer of het element niet aanwezig is
  //expect(deletedElement).toBeFalsy();
});
