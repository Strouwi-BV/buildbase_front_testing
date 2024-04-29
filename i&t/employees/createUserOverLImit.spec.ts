import { test, expect } from '@playwright/test';

test('Create user over limit', async ({ page }) => {
  await page.goto('https://backoffice-dev.buildbase.be/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('BIB@BIB.com');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await page.getByRole('link', { name: 'Werknemers' }).click();
  await page.getByRole('button', { name: 'Nieuwe werknemer' }).click();
  await page.getByLabel('Voornaam').click();
  await page.getByLabel('Voornaam').fill('BIB');
  await page.getByLabel('Achternaam').click();
  await page.getByLabel('Achternaam').fill('BIB');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('BIB@BIB.be');
  await page.getByLabel('Werkrooster').click();
  await page.getByRole('option', { name: '-uren week' }).locator('div').first().click();
  await page.getByLabel('Statuut').click();
  await page.getByLabel('Statuut').fill('BIB');
  await page.getByLabel('Rol').click();
  await page.getByRole('option', { name: 'Gebruiker' }).locator('i').click();
  await page.getByRole('button', { name: 'Opslaan' }).click();
  await expect(page.getByRole('status')).toContainText('U zit momenteel aan het maximum aantal gebruikers voor uw abonnement');
});