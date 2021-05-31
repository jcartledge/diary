import { describe, expect, it } from "@playwright/test";
import { ElementHandle, Page } from "playwright";
import "playwright-testing-library/extend";

const CLIENT_URL = "http://diary-client:3000";

type PageElements = { [key: string]: ElementHandle };
const getPageElements = async (page: Page): Promise<PageElements> => {
  const document = await page.getDocument();
  return {
    whatHappened: await document.getByLabelText("What happened?"),
    wentWell: await document.getByLabelText("Went well"),
    couldBeImproved: await document.getByLabelText("Could be improved"),
    didntGoWell: await document.getByLabelText("Didn't go well"),
    risk: await document.getByLabelText("Might be a risk"),
    prev: await document.getByText("prev"),
    next: await document.getByText("next"),
  };
};

const failOnConsole = (page: Page): void => {
  page.on("console", (message) => {
    const messageType = message.type();
    if (messageType === "error" || messageType === "warning") {
      throw new Error(message.text());
    }
  });
};
describe("Diary app", () => {
  it("retains input when navigating between days", async ({ page }) => {
    failOnConsole(page);

    await page.goto(CLIENT_URL);

    {
      const { whatHappened, wentWell, couldBeImproved, didntGoWell, risk } =
        await getPageElements(page);

      await whatHappened.type("Nothing happened today");
      await wentWell.type("Boss remembered my name");
      await couldBeImproved.type("Drink more water");
      await didntGoWell.type("Forgot name of boss");
      await risk.type("Glass too close to edge of table");
    }

    {
      const { prev } = await getPageElements(page);
      await prev.click();
    }

    // await waitFor(async () => {
    {
      const { whatHappened, wentWell, couldBeImproved, didntGoWell, risk } =
        await getPageElements(page);

      expect(await whatHappened.textContent()).toEqual("");
      expect(await wentWell.textContent()).toEqual("");
      expect(await couldBeImproved.textContent()).toEqual("");
      expect(await didntGoWell.textContent()).toEqual("");
      expect(await risk.textContent()).toEqual("");
    }
    // });

    {
      const { next } = await getPageElements(page);
      await next.click();
    }

    // await waitFor(async () => {
    {
      const { whatHappened, wentWell, couldBeImproved, didntGoWell, risk } =
        await getPageElements(page);

      expect(await whatHappened.textContent()).toEqual(
        "Nothing happened today"
      );
      expect(await wentWell.textContent()).toEqual("Boss remembered my name");
      expect(await couldBeImproved.textContent()).toEqual("Drink more water");
      expect(await didntGoWell.textContent()).toEqual("Forgot name of boss");
      expect(await risk.textContent()).toEqual(
        "Glass too close to edge of table"
      );
    }
    // });
  });
});
