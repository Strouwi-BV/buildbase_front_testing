async function login(page) {

  await page.goto('https://backoffice-dev.buildbase.be/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('Kyan.decerf@student.ucll.be');
  await page.getByLabel('Wachtwoord', { exact: true }).click();
  await page.getByLabel('Wachtwoord', { exact: true }).fill('Test123');
  await page.getByRole('button', { name: 'Inloggen' }).click();
  await page.waitForNavigation();



}

module.exports = {
  login,
};