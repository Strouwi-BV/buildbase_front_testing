import { test, expect } from "@playwright/test";

const { login } = require("../Utils/login.ts");

test.beforeEach("Login", async ({ page }) => {
  await login(page);
});

test("addEmployeeActiveTest", async ({ page }) => {
  await page.getByRole("link", { name: "Werknemers" }).click();

  // Definieer de XPath voor het actieve en inactieve element
  const activeXPath =
    "(//span[@class='v-chip__content'][normalize-space()='actief'])";
  const inactiveXPath =
    "(//span[@class='v-chip__content'][normalize-space()='inactief'])";

  let i = 1;
  let activeElement, inactiveElement;

  // Blijf zoeken naar actieve en inactieve elementen totdat ze niet meer worden gevonden
  while (true) {
    activeElement = await page.$(`${activeXPath}[${i}]`);
    inactiveElement = await page.$(`${inactiveXPath}[${i}]`);

    // Als zowel het actieve als het inactieve element niet worden gevonden, stop dan de lus
    if (!activeElement && !inactiveElement) {
      break;
    }

    // Controleer of het actieve element aanwezig is en zichtbaar is
    if (activeElement) {
      console.log(`Element ${i} is actief`);
      // Voer hier acties uit voor het actieve element, bijvoorbeeld klikken op het mannetje
      await activeElement.click();
    }

    // Controleer of het inactieve element aanwezig is en zichtbaar is
    if (inactiveElement) {
      console.log(`Element ${i} is inactief`);
      // Hier actie voor het inactieve element
    }

    i++;
  }

  const addedMessage = await page
    .locator(
      "(//div[contains(text(),'Werknemer werdt succesvol aangemaakt')])[1]"
    )
    .innerText();
  expect(addedMessage).toContain("Werknemer werdt succesvol aangemaakt");
});
