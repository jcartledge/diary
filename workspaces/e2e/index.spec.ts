import { expect, test } from "@playwright/test";
import { failOnConsoleErrorOrWarning } from "./helpers/failOnConsoleErrorOrWarning";
import { login } from "./helpers/login";
import { diaryPageLocators } from "./helpers/pages/diaryPageLocators";

test.describe("Diary", () => {
  test.beforeEach(failOnConsoleErrorOrWarning);
  test.beforeEach(login);

  test("retains input when navigating between days", async ({ page }) => {
    const $ = diaryPageLocators(page);

    await expect($.whatHappenedField).toBeEnabled();

    await $.whatHappenedField.fill("Nothing happened today");
    await $.wentWellField.fill("Boss remembered my name");
    await $.couldBeImprovedField.fill("Drink more water");
    await $.didntGoWellField.fill("Forgot name of boss");
    await $.riskField.fill("Glass too close to edge of table");

    await $.prevLink.click();

    await expect($.whatHappenedField).toHaveText("");
    await expect($.wentWellField).toHaveText("");
    await expect($.couldBeImprovedField).toHaveText("");
    await expect($.didntGoWellField).toHaveText("");
    await expect($.riskField).toHaveText("");

    await $.nextLink.click();

    await expect($.whatHappenedField).toHaveText("Nothing happened today");
    await expect($.wentWellField).toHaveText("Boss remembered my name");
    await expect($.couldBeImprovedField).toHaveText("Drink more water");
    await expect($.didntGoWellField).toHaveText("Forgot name of boss");
    await expect($.riskField).toHaveText("Glass too close to edge of table");
  });
});
