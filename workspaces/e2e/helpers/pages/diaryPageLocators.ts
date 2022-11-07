import { type Page } from "@playwright/test";
import { withSelectors } from "./selectors";

export const diaryPageLocators = (page: Page) =>
  withSelectors(page, ({ getTextboxByName, getLinkByName }) => ({
    whatHappenedField: getTextboxByName("what-happened"),
    wentWellField: getTextboxByName("went-well"),
    couldBeImprovedField: getTextboxByName("could-be-improved"),
    didntGoWellField: getTextboxByName("didn't-go-well"),
    riskField: getTextboxByName("might-be-a-risk"),
    prevLink: getLinkByName("prev"),
    nextLink: getLinkByName("next"),
  }));
