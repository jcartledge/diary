import { type Page } from "@playwright/test";

type SelectorName = string | RegExp;

const selectors = (page: Page) => ({
  getTextboxByName: (name: SelectorName) => page.getByRole("textbox", { name }),
  getButtonByName: (name: SelectorName) => page.getByRole("button", { name }),
  getLinkByName: (name: SelectorName) => page.getByRole("link", { name }),
});

export function withSelectors<T>(
  page: Page,
  callback: (_selectors: ReturnType<typeof selectors>) => T
) {
  return callback(selectors(page));
}
