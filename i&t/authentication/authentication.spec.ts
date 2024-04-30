import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login");
const generateRandomEmail = require("../Utils/generateEmail.ts");
const generateRandomString = require("../Utils/randomString");

let page;

//Creating a new browser context and then creating a new page within the context,
//so that every test runs in the same browser session so we don't lose time opening browsers
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
});

//closing the browser session after tests
test.afterAll(async () => {
  await page.context().close();
});

test("Login-Logout", async () => {
  //calling the login function, that is in the Utils folder
  await login(page);
  //loggin out and checking is the right page is shown
  await page.getByRole("button", { name: "Kyan Decerf KD" }).click();
  await page.getByRole("button", { name: "AFMELDEN" }).click();
  await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/login");
});

test("paidRegistrationTest", async () => {
  //test for paid registration

  //waiting for the page to load, then navigate to it
  await page.waitForLoadState();
  await page.goto("https://backoffice-dev.buildbase.be/payment", {
    waitUntil: "domcontentloaded",
  });

  //filling in the input fields
  await page.locator("(//input[@type='text'])[1]").fill("Paid registration");
  await page.locator("(//input[@type='text'])[2]").fill("5184484151115");
  await page.locator("(//input[@type='text'])[3]").fill("Steven");
  await page.locator("(//input[@type='text'])[4]").fill("Richards");
  const email = generateRandomEmail(); //calling the generateRandomEmail function from the Utils folder
  await page.locator("//input[@type='email']").fill(email);
  await page.locator("(//input[@type='text'])[5]").fill("0496577642");
  await page.locator("(//input[@type='password'])[1]").fill("testing123");
  await page.locator("(//input[@tabindex='NaN'])[1]").fill("testing123");
  await page
    .locator("(//div[@class='v-input--selection-controls__ripple'])[2]")
    .first()
    .click();
  //clicking the 'volgende' button
  await page.getByRole("button", { name: "Volgende" }).click();

  //filling out input fields
  await page.locator("(//input[@type='text'])[6]").fill("hengouwenstraat");
  await page.locator("(//input[@type='text'])[7]").fill("12");
  await page.locator("(//input[@type='text'])[9]").fill("3300");
  await page.locator("(//input[@type='text'])[10]").fill("Tienen");
  await page.locator("(//input[@autocomplete='off'])[1]").click();
  await page.getByText("België").click();
  await page.getByRole("button", { name: "Volgende" }).click();
  await page.locator("(//input[@type='number'])[1]").fill("2");
  await page.locator("(//input[@type='number'])[2]").fill("4");
  await page.waitForTimeout(2000); // Wachten aangezien pagina niet direct mag klikken op Volgende
  await page
    .locator(
      "(//span[@class='v-btn__content'][normalize-space()='Volgende'])[3]"
    )
    .click();
  await page.getByRole("img", { name: "KBCPaymentButton" }).click();
  await page.waitForTimeout(2000);
  await page.locator("(//span[normalize-space()='Naar betaling'])[1]").click();
  await page.waitForLoadState();

  const submitButtonLocator = page.locator(
    "(//input[@value='Submit status'])[1]"
  );
  await submitButtonLocator.waitFor({ state: "visible" }); // Wait for the button to be visible
  await submitButtonLocator.click(); // Click the button

  await expect(page.locator("text=Uw betaling is succesvol")).toHaveText(
    " Uw betaling is succesvol verwerkt!  Ga naar de home pagina of ga naar instellingen om de status van uw abonnement te bekijken. "
  );
});

test.describe("Trial subscription", () => {
  test.use({ baseURL: "https://backoffice-dev.buildbase.be" });

  test("Trial subscription account", async () => {
    //navigation to builbase page
    await page.goto("https://backoffice-dev.buildbase.be/");
    await page.locator("(//a[normalize-space()='Registreer.'])[1]").click();
    //filling out form fields
    await page.locator("(//input[@type='text'])[1]").click();
    await page.locator("(//input[@type='text'])[1]").fill("buildByMe");
    await page.locator("(//input[@type='text'])[2]").click();
    const randomstring = generateRandomString();
    await page.locator("(//input[@type='text'])[2]").fill(randomstring);
    await page.locator("(//input[@type='text'])[3]").click();
    await page.locator("(//input[@type='text'])[3]").fill("Kyan");
    await page.locator("(//input[@type='text'])[4]").click();
    await page.locator("(//input[@type='text'])[4]").fill("Decerf");
    await page.locator("(//input[@type='email'])[1]").click();
    const randomEmail = generateRandomEmail();
    await page.locator("(//input[@type='email'])[1]").fill(randomEmail);
    await page.locator("(//input[@type='text'])[5]").click();
    await page.locator("(//input[@type='text'])[5]").fill(randomstring);
    await page.locator("(//input[@type='password'])[1]").click();
    await page.fill("(//input[@type='password'])[1]", "Test123");
    await page.click("(//input[@tabindex='NaN'])[1]");
    await page.locator("(//input[@tabindex='NaN'])[1]").fill("Test123");
    await page
      .locator("div")
      .filter({ hasText: /^Gratis proefversie$/ })
      .locator("div")
      .nth(1)
      .click();
    await page
      .locator("(//div[@class='v-input--selection-controls__ripple'])[2]")
      .click();
    await page.getByRole("button", { name: "Start 30 dagen gratis" }).click();
    await page.waitForNavigation({ timeout: 5000 });
    //expecting the right page
    await expect(page.url()).toBe(
      "https://backoffice-dev.buildbase.be/calendar"
    );
  });
});
