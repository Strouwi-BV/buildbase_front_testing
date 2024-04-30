import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login.ts");

let page;

//Creating a new browser context and then creating a new page within the context,
//so that every test runs in the same browser session so we don't lose time opening browsers
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();

  await login(page);
});

//closing the browser session after tests
test.afterAll(async () => {
  await page.context().close();
});

test("testAbscentRegistrationBt7", async () => {
  // Test for absence registration

  //navigation to the calender page
  await page.goto("https://backoffice-dev.buildbase.be/calendar");

  await page.waitForSelector(".v-calendar-weekly");

  //getting dates
  const today: Date = new Date();
  const day: number = today.getDate();

  //selecting day and filling out the dropdowns and selecting options of abscense
  await page.click(`.v-calendar-weekly__day-label button:has-text("${day}")`);

  await page.click("//span[normalize-space()='Registreer afwezigheid']");

  await page.click(
    'div.v-input__control:has(label:has-text("Afwezigheids type")) >> .v-input__icon--append'
  );

  await page.click("//div[@role='option']//div[normalize-space()='Verlof']");

  await page.click("(//input[@role='button'])");

  await page.click(`(//div[normalize-space()='${day}'])`);

  await page.getByRole("button", { name: "Duur afwezigheid" }).click();

  await page.click(
    "//div[@role='option']//div[normalize-space()='Volledige dag']"
  );

  await page.click(
    "//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default']"
  );

  //if an abscense is already registered then it gives an error message, we wait for this and then expect the message
  const popup = await page
    .waitForSelector(".v-snack__wrapper", { timeout: 2000 })
    .catch(() => null);

  if (popup) {
    const popupText = await popup.textContent();
    expect(popupText).toContain(
      "Er bestaat al een tijdsregistratie voor deze tijdspanne"
    );
  }
});
