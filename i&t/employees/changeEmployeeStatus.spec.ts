import { test, expect } from "@playwright/test";

const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("addEmployeeActiveTest", async ({ browserName, page }) => {
  await page.getByRole("link", { name: "Werknemers" }).click();

  let chromiumTestDone = false;
  let firefoxTestDone = false;

  //testing for chromium
  if (browserName === "chromium") {
    await page.waitForURL("https://backoffice-dev.buildbase.be/users");
    await page.waitForSelector('body:has-text("actief")');
    await expect(page.locator("tbody")).toContainText("actief");

    // Clicking to deactivate the user
    await page
      .locator(
        "(//span[@class='v-chip__content'][normalize-space()='actief'])[1]"
      )
      .click();
    await expect(page.getByRole("main")).toContainText("Actieve gebruiker");
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op inactief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
    await expect(page.getByRole("main")).toContainText("Inactieve gebruiker");

    // Clicking to activate the user back
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op actief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
    chromiumTestDone = true;
  }

  //testing for firefox
  if (browserName === "firefox" && chromiumTestDone == true) {
    // Repeat the same steps as Chromium test
    await page.waitForURL("https://backoffice-dev.buildbase.be/users");
    await page.waitForSelector('body:has-text("actief")');
    await expect(page.locator("tbody")).toContainText("actief");
    await page
      .locator(
        "(//span[@class='v-chip__content'][normalize-space()='actief'])[1]"
      )
      .click();
    await expect(page.getByRole("main")).toContainText("Actieve gebruiker");
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op inactief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
    await expect(page.getByRole("main")).toContainText("Inactieve gebruiker");
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op actief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
    firefoxTestDone = true;
  }

  //testing for webkit
  if (browserName === "webkit" && firefoxTestDone == true) {
    // Repeat the same steps as Chromium & firefox test
    await page.waitForURL("https://backoffice-dev.buildbase.be/users");
    await page.waitForSelector('body:has-text("actief")');
    await expect(page.locator("tbody")).toContainText("actief");
    await page
      .locator(
        "(//span[@class='v-chip__content'][normalize-space()='actief'])[1]"
      )
      .click();
    await expect(page.getByRole("main")).toContainText("Actieve gebruiker");
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op inactief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
    await expect(page.getByRole("main")).toContainText("Inactieve gebruiker");
    await page.getByRole("button", { name: "Acties" }).click();
    await page.getByText("Zet op actief").click();
    await page.getByRole("button", { name: "Bevestig" }).click();
  }
});
