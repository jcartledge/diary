import { type Page } from "@playwright/test";
import { withSelectors } from "./selectors";

export const loginPageLocators = (page: Page) =>
  withSelectors(page, ({ getTextboxByName, getButtonByName }) => ({
    loginButton: getButtonByName("Log in"),
    emailField: getTextboxByName("Email address"),
    passwordField: getTextboxByName("Password"),
    continueButton: getButtonByName(/^Continue$/),
  }));
