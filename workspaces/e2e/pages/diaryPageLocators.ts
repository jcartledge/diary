import { type Page } from "@playwright/test";
import { withSelectors } from "./selectors";

export const diaryPageLocators = (page: Page) =>
  withSelectors(page, ({ getTextboxByName, getLinkByName }) => ({
    whatHappened: getTextboxByName("what-happened"),
    wentWell: getTextboxByName("went-well"),
    couldBeImproved: getTextboxByName("could-be-improved"),
    didntGoWell: getTextboxByName("didn't-go-well"),
    risk: getTextboxByName("might-be-a-risk"),
    prev: getLinkByName("prev"),
    next: getLinkByName("next"),
  }));
