import { it } from "@playwright/test";

const CLIENT_URL = "http://diary-client:3000";

it("loads without error", async ({ browserName, page }) => {
  await page.goto(CLIENT_URL);
  await page.screenshot({ path: `screenshots/${browserName}-example.png` });
});
