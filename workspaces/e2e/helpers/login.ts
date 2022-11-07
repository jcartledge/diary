import { loginPageLocators } from "../pages/loginPageLocators";
import { CLIENT_URI, E2E_PASS, E2E_USER } from "./config";
import { type E2eHelper } from "./e2eHelper";

export const login: E2eHelper = async ({ page }) => {
  await page.goto(CLIENT_URI);
  const $ = loginPageLocators(page);

  if ($.loginButton) {
    await $.loginButton.click();
    await $.emailField.type(E2E_USER);
    await $.passwordField.type(E2E_PASS);
    await Promise.all([page.waitForNavigation(), $.continueButton.click()]);
  }
};
