const { webkit } = require("playwright");

const CLIENT_URL = "http://diary-client:3000";

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto(CLIENT_URL);
  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
