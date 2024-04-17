import { test, expect } from '@playwright/test';

test.describe('azure dev', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
  
  test('visits buildbase dev login', async ({ page }) => {
    await page.goto('/login', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('h1')).toHaveText('Welkom bij');
  })
})
  
test.describe('Trial subscription', () => {
  test.use({baseURL: 'https://backoffice-dev.buildbase.be'});
 

  test('Trial subscription account', async ({ page }) => {
    await page.goto('https://backoffice-dev.buildbase.be/');
    await page.getByRole('link', { name: 'Registreer.' }).click();
    await page.locator("(//input[@type='text'])[1]").click();
    await page.locator("(//input[@type='text'])[1]").fill('buildByMe');
    await page.locator("(//input[@type='text'])[2]").click();
    await page.locator("(//input[@type='text'])[2]").fill('Kyan');
    await page.locator("(//input[@type='text'])[3]").click();
    await page.locator("(//input[@type='text'])[3]").fill('Decerf');
    await page.locator("(//input[@type='email'])[1]").click();
    await page.locator("(//input[@type='email'])[1]").fill('dkyan007@gmail.com');
    await page.locator("(//input[@type='password'])[1]").click();
    await page.locator("(//input[@type='password'])[1]").fill('Test123');
    await page.locator("(//input[@tabindex='NaN'])[1]").click();
    await page.locator("(//input[@tabindex='NaN'])[1]").fill('Test123');
    await page.getByText('Gratis proefversie').click();
    await page.locator("(//div[@class='v-input--selection-controls__ripple'])[2]").first().click();
    await page.getByRole('button', { name: 'Start 30 dagen gratis' }).click();
    await page.waitForNavigation({ timeout: 5000 });
    await expect(page.url()).toBe("https://backoffice-dev.buildbase.be/calendar")
  });
})