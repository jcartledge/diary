import { describe, it } from "@playwright/test";
import "playwright-testing-library/extend";

const CLIENT_URL = "http://diary-client:3000";

describe("Diray app", () => {
  it("retains input when navigating between days", async ({ page }) => {
    await page.goto(CLIENT_URL);
    const document = await page.getDocument();

    const whatHappened = await document.getByLabelText("What happened?");
    await whatHappened.type("Nothing happened today");

    const wentWell = await document.getByLabelText("Went well");
    await wentWell.type("Boss remembered my name");

    const couldBeImproved = await document.getByLabelText("Could be improved");
    await couldBeImproved.type("Drink more water");

    const didntGoWell = await document.getByLabelText("Didn't go well");
    await didntGoWell.type("Forgot name of boss");

    const risk = await document.getByLabelText("Might be a risk");
    await risk.type("Glass to close to edge of table");

    const prev = await document.getByLabelText("prev");
    await prev.click();

    expect(whatHappened).toHaveTextContent("");
    expect(wentWell).toHaveTextContent("");
    expect(couldBeImproved).toHaveTextContent("");
    expect(didntGoWell).toHaveTextContent("");
    expect(risk).toHaveTextContent("");

    const next = await document.getByLabelText("next");
    await next.click();

    expect(whatHappened).toHaveTextContent("Nothing happened today");
    expect(wentWell).toHaveTextContent("Boss remembered my name");
    expect(couldBeImproved).toHaveTextContent("Drink more water");
    expect(didntGoWell).toHaveTextContent("Forgot name of boss");
    expect(risk).toHaveTextContent("Glass close to edge of table");
  });
});
