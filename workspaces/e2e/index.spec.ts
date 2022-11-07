import { expect, test } from "@playwright/test";
import { failOnConsoleErrorOrWarning } from "./failOnConsoleErrorOrWarning";
import { login } from "./login";
import { diaryPageLocators } from "./pages/diaryPageLocators";

test.describe("Diary", () => {
  test.beforeEach(failOnConsoleErrorOrWarning);
  test.beforeEach(login);

  test("retains input when navigating between days", async ({ page }) => {
    const $ = diaryPageLocators(page);

    await expect($.whatHappened).toBeEnabled();

    await $.whatHappened.type("Nothing happened today");
    await $.wentWell.type("Boss remembered my name");
    await $.couldBeImproved.type("Drink more water");
    await $.didntGoWell.type("Forgot name of boss");
    await $.risk.type("Glass too close to edge of table");

    await $.prev.click();

    await expect($.whatHappened).toHaveText("");
    await expect($.wentWell).toHaveText("");
    await expect($.couldBeImproved).toHaveText("");
    await expect($.didntGoWell).toHaveText("");
    await expect($.risk).toHaveText("");

    await $.next.click();

    await expect($.whatHappened).toHaveText("Nothing happened today");
    await expect($.wentWell).toHaveText("Boss remembered my name");
    await expect($.couldBeImproved).toHaveText("Drink more water");
    await expect($.didntGoWell).toHaveText("Forgot name of boss");
    await expect($.risk).toHaveText("Glass too close to edge of table");
  });
});
