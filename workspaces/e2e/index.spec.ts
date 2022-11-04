import { expect, Page, test } from "@playwright/test";
import { getDocument, queries, waitFor } from "playwright-testing-library";
import { ElementHandle } from "playwright-testing-library/dist/typedefs";
import { CLIENT_URI, E2E_PASS, E2E_USER } from "./config";

const { findByLabelText, findByText, findByRole, queryByRole } = queries;
type PageElements = { [key: string]: ElementHandle };
const getPageElements = async (page: Page): Promise<PageElements> => {
  const document = await getDocument(page);
  return {
    whatHappened: await findByLabelText(document, "What happened?"),
    wentWell: await findByLabelText(document, "Went well"),
    couldBeImproved: await findByLabelText(document, "Could be improved"),
    didntGoWell: await findByLabelText(document, "Didn't go well"),
    risk: await findByLabelText(document, "Might be a risk"),
    prev: await findByText(document, "prev"),
    next: await findByText(document, "next"),
  };
};

const failOnConsoleErrorOrWarning = (page: Page): void => {
  page.on("console", (message) => {
    const messageType = message.type();
    if (messageType === "error" || messageType === "warning") {
      throw new Error(message.text());
    }
  });
};

const login = async (page: Page): Promise<void> => {
  await page.goto(CLIENT_URI);
  const loginButton = page.getByRole("button", { name: "Log in" });
  if (loginButton) {
    await loginButton.click();

    await page.getByRole("textbox", { name: "Email address" }).type(E2E_USER);
    await page.getByRole("textbox", { name: "Password" }).type(E2E_PASS);
    const continueButton = page.getByRole("button", {
      name: "Continue",
    });
    await Promise.all([page.waitForNavigation(), continueButton.click()]);
  }
};

test.describe("Diary", () => {
  test("retains input when navigating between days", async ({ page }) => {
    failOnConsoleErrorOrWarning(page);
    await login(page);

    const { whatHappened, wentWell, couldBeImproved, didntGoWell, risk, prev } =
      await getPageElements(page);

    await whatHappened.type("Nothing happened today");
    await wentWell.type("Boss remembered my name");
    await couldBeImproved.type("Drink more water");
    await didntGoWell.type("Forgot name of boss");
    await risk.type("Glass too close to edge of table");

    await prev.click();

    await waitFor(async () => {
      expect(await whatHappened.textContent()).toEqual("");
      expect(await wentWell.textContent()).toEqual("");
      expect(await couldBeImproved.textContent()).toEqual("");
      expect(await didntGoWell.textContent()).toEqual("");
      expect(await risk.textContent()).toEqual("");
    });

    const { next } = await getPageElements(page);
    await next.click();

    await waitFor(async () => {
      expect(await whatHappened.textContent()).toEqual(
        "Nothing happened today"
      );
      expect(await wentWell.textContent()).toEqual("Boss remembered my name");
      expect(await couldBeImproved.textContent()).toEqual("Drink more water");
      expect(await didntGoWell.textContent()).toEqual("Forgot name of boss");
      expect(await risk.textContent()).toEqual(
        "Glass too close to edge of table"
      );
    });
  });
});
