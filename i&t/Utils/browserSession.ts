import {
  firefox,
  chromium,
  webkit,
  Browser,
  BrowserContext,
  Page,
} from "playwright";

let browsers: { [key: string]: Browser } = {};

export async function initializeBrowsers() {
  // Launch Firefox
  browsers["firefox"] = await firefox.launch();

  // Launch Chromium
  browsers["chromium"] = await chromium.launch();

  // Launch WebKit
  browsers["webkit"] = await webkit.launch();
}

export async function closeBrowsers() {
  await Promise.all(Object.values(browsers).map((browser) => browser.close()));
}

export async function CustomLogin(page) {
  await page.goto("https://backoffice-dev.buildbase.be/login");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("Kyan.decerf@student.ucll.be");
  await page.getByLabel("Wachtwoord", { exact: true }).click();
  await page.getByLabel("Wachtwoord", { exact: true }).fill("Test123");
  await page.getByRole("button", { name: "Inloggen" }).click();
  await page.waitForNavigation();
}

export async function runTestsWithEachBrowser(
  testFunction: (page: Page, browserName: string) => Promise<void>
) {
  for (const [browserName, browser] of Object.entries(browsers)) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await testFunction(page, browserName);
  }
}
