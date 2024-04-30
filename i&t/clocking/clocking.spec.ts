import { test, expect } from "@playwright/test";
const { login } = require("../Utils/login");

test("Clocking process", async ({ browserName, page }) => {
  if (browserName === "chromium") {
    // login with an account used on chromium
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("dkyan007@gmail.com");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }
  if (browserName === "webkit") {
    // login with an account used on webkit
    test.slow(); // gives the test more time to run
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("kyan.decerf@hotmail.be");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }
  if (browserName === "firefox") {
    // login with an account used on firefox
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("kyan.decerf@student.ucll.be");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }
  // clocks in waits 60 seconds (minimum clocking time) and clocks out
  await page.waitForNavigation();
  await page.locator("(//div[contains(text(),'Prikking')])[1]").click();
  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@role='option'])[1]");
  await page.getByLabel("Projectnaam").click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Start" }).click();
  await page.waitForTimeout(60000);
  await page
    .locator(
      "(//button[@class='secondary v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default'])[1]"
    )
    .click();
  await page
    .locator(
      "(//button[@class='text-none pl-0 v-btn v-btn--text theme--light v-size--default grey--text'])[1]"
    )
    .isVisible();
});

test("clocking tomorrow", async ({ browserName, page }) => {
  // check if you can register hours for tomorrow
  await login(page);
  const huidigeDatum = new Date(); // gets the current date to always select the day after the current day
  const tomorrow = (huidigeDatum.getDate() + 1).toString();
  await page.click(`(//span[normalize-space()='${tomorrow}'])[1]`);

  await expect(
    page.locator("(//span[normalize-space()='Registreer uren'])[1]")
  ).toBeHidden();
});

test("double clocking", async ({ browserName, page }) => {
  //tries to register hours when there are already hours registered for this day
  await login(page);
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);
  await page.click("(//span[normalize-space()='Registreer uren'])[1]");
  await page.getByLabel("Van").click();
  await page.getByLabel("Van").fill("07:00");
  await page.keyboard.press("A");
  await page.getByLabel("Tot").click();
  await page.getByLabel("Tot").fill("20:00");
  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@class='v-list-item__content'])[1]");
  await page.click(
    "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light error--text'])[1]"
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "opslaan" }).click();

  await expect(page.getByText("Er bestaat al een")).toBeVisible();
});

test("double abscence", async ({ browserName, page }) => {
  await login(page);
  //register absence
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);

  //second absence same moment
  await page.getByRole("link", { name: "Registreer afwezigheid" }).click();
  await page.getByLabel("Afwezigheids type").click();
  await page
    .getByRole("option", { name: "Verlof" })
    .locator("div")
    .first()
    .click();
  await page.getByRole("button", { name: "Opslaan" }).click();
  await expect(page.getByText("Er bestaat al een")).toBeVisible();
});

test("abscence with  registered  hours", async ({ browserName, page }) => {
  await login(page);
  //absence with already hours registered
  const huidigeDatum = new Date();
  const today = huidigeDatum.getDate().toString();
  await page.click(`(//span[normalize-space()='${today}'])[1]`);
  await page.getByRole("link", { name: "Registreer afwezigheid" }).click();
  await page.getByLabel("Afwezigheids type").click();
  await page.getByText("Ziekte").click();
  await page.getByRole("button", { name: "Opslaan" }).click();
  await expect(page.getByText("Er bestaat al een")).toBeVisible();
});

test("edit clocking", async ({ browserName, page }) => {
  if (browserName === "webkit") {
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("dkyan007@gmail.com");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }
  if (browserName === "chromium") {
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("kyan.decerf@student.ucll.be");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }
  if (browserName === "firefox") {
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("kyan.decerf@hotmail.be");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
  }

  await page.waitForNavigation();
  //edit absence
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
  const minuut3 = minuut2 + 5;
  const minuut4 = minuut3 + 5;

  // Fill in the first timestamp
  await page.getByLabel("Van").click();
  await page
    .getByLabel("Van")
    .fill(
      `${uur1 < 10 ? "0" + uur1 : uur1}:${
        minuut1 < 10 ? "0" + minuut1 : minuut1
      }`
    );

  // Fill in the second timestamp
  await page.getByLabel("Tot").click();
  await page
    .getByLabel("Tot")
    .fill(
      `${uur2 < 10 ? "0" + uur2 : uur2}:${
        minuut2 < 10 ? "0" + minuut2 : minuut2
      }`
    );

  await page.click("(//input[@type='text'])[1]");
  await page.click("(//div[@class='v-list-item__content'])[1]");
  await page.click(
    "(//i[@class='v-icon notranslate mdi mdi-menu-down theme--light error--text'])[1]"
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "opslaan" }).click();
  await page.locator("//tbody/tr[1]/td[5]/button[1]").click();
  await page.getByLabel("Van").click();
  await page
    .getByLabel("Van")
    .fill(
      `${uur1 < 10 ? "0" + uur1 : uur1}:${
        minuut3 < 10 ? "0" + minuut3 : minuut3
      }`
    );
  await page.getByLabel("Tot").click();
  await page
    .getByLabel("Tot")
    .fill(
      `${uur2 < 10 ? "0" + uur2 : uur2}:${
        minuut4 < 10 ? "0" + minuut4 : minuut4
      }`
    );
  await page.getByRole("button", { name: "Opslaan" }).click();
  await expect(page.getByText("Prikking werd gewijzigd")).toBeVisible();
});

test("delete clocking  - webkit", async ({ browserName, page }) => {
  if (browserName === "webkit") {
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("dkyan007@gmail.com");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();

    const huidigeDatum = new Date();
    const today = huidigeDatum.getDate().toString();
    await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector of the text-element
    const tekstSelector = "tbody tr:nth-child(1) td:nth-child(4)";

    //Read the text on page and save it as a const
    const opgeslagenTekst: string = await page.innerText(tekstSelector);

    //Delete absence

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Check if the saved text is visible on the page
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();
  }
});

test("delete clocking  - firefox", async ({ browserName, page }) => {
  if (browserName === "firefox") {
    await page.goto("https://backoffice-dev.buildbase.be/login");
    await page.getByLabel("Email").click();
    await page.getByLabel("Email").fill("kyan.decerf@hotmail.be");
    await page.getByLabel("Wachtwoord", { exact: true }).click();
    await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
    await page.getByRole("button", { name: "Inloggen" }).click();
    const huidigeDatum = new Date();
    const today = huidigeDatum.getDate().toString();
    await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector of the text-element
    const tekstSelector = "tbody tr:nth-child(1) td:nth-child(4)";

    //Read the text on page and save it as a const
    const opgeslagenTekst: string = await page.innerText(tekstSelector);

    //Delete absence

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Check if the saved text is visible on the page
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();
  }
});

test("delete clocking  - chromium", async ({ browserName, page }) => {
  if (browserName === "chromium") {
    await login(page);

    const huidigeDatum = new Date();
    const today = huidigeDatum.getDate().toString();
    await page.click(`(//span[normalize-space()='${today}'])[1]`);

    // CSS-selector of the text-element
    const tekstSelector = "tbody tr:nth-child(1) td:nth-child(4)";

    //Read the text on page and save it as a const
    const opgeslagenTekst: string = await page.innerText(tekstSelector);

    //Delete absence

    await page.locator("(//button[@type='button'])[8]").click();

    await page.waitForTimeout(10000);
    // Check if the saved text is visible on the page
    await expect(page.getByText(opgeslagenTekst)).toBeHidden();
  }
});
