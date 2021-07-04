import { expect, test } from "@playwright/test";
import { getDocument, queries, waitFor } from "playwright-testing-library";
import { ElementHandle } from "playwright-testing-library/dist/typedefs";

const { getByLabelText, getByText } = queries;

const CLIENT_URI = process.env.CLIENT_URI;

type PageElements = { [key: string]: ElementHandle };
const getPageElements = async (page): Promise<PageElements> => {
  const document = await getDocument(page);
  return {
    whatHappened: await getByLabelText(document, "What happened?"),
    wentWell: await getByLabelText(document, "Went well"),
    couldBeImproved: await getByLabelText(document, "Could be improved"),
    didntGoWell: await getByLabelText(document, "Didn't go well"),
    risk: await getByLabelText(document, "Might be a risk"),
    prev: await getByText(document, "prev"),
    next: await getByText(document, "next"),
  };
};

const failOnConsoleErrorOrWarning = (page): void => {
  page.on("console", (message) => {
    const messageType = message.type();
    if (messageType === "error" || messageType === "warning") {
      throw new Error(message.text());
    }
  });
};

test("App retains input when navigating between days", async ({ page }) => {
  failOnConsoleErrorOrWarning(page);

  await page.goto(CLIENT_URI);

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
    expect(await whatHappened.textContent()).toEqual("Nothing happened today");
    expect(await wentWell.textContent()).toEqual("Boss remembered my name");
    expect(await couldBeImproved.textContent()).toEqual("Drink more water");
    expect(await didntGoWell.textContent()).toEqual("Forgot name of boss");
    expect(await risk.textContent()).toEqual(
      "Glass too close to edge of table"
    );
  });
});
