function generateRandomString() {
  const maxLength = 10;
  const randomString = 'Testen' + Math.random().toString(36).substring(2, maxLength + 2);
  return randomString;
}

module.exports = generateRandomString;