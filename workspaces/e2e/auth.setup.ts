import { test as setup, expect } from "@playwright/test";
import { authFile } from "./playwright.config";
import { CLIENT_URI, E2E_PASS, E2E_USER } from "./helpers/config";
import { loginPageLocators } from "./helpers/pages/loginPageLocators";
import { diaryPageLocators } from "./helpers/pages/diaryPageLocators";

setup("authenticate", async ({ page }) => {
  page.on("requestfailed", (request) => {
    console.log(
      `url: ${request.url()}, failure: ${request.failure()?.errorText}`,
    );
  });

  await page.goto(CLIENT_URI);
  const { loginButton, emailField, passwordField, continueButton } =
    loginPageLocators(page);
  const {whatHappenedField} = diaryPageLocators(page);

  if (loginButton) {
    await loginButton.click();
    await emailField.fill(E2E_USER);
    await passwordField.fill(E2E_PASS);
    await Promise.all([
      page.waitForURL(`${CLIENT_URI}/**`),
      continueButton.click(),
    ]);
  }

  await expect(whatHappenedField).toBeVisible();
  await page.context().storageState({ path: authFile });
});
