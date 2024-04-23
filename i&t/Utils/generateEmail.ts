function generateRandomEmail() {
  const username = "user" + Math.random().toString(36).substring(2, 10); // Willekeurige gebruikersnaam
  const domain = "example.com"; // Vervang dit door je eigen domein, of genereer willekeurig
  const email = `${username}@${domain}`;
  return email;
}

module.exports = generateRandomEmail;
