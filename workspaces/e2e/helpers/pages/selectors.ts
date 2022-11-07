import { type Page } from "@playwright/test";

const selectors = (page: Page) => ({
  getTextboxByName: (name: string) => page.getByRole("textbox", { name }),
  getButtonByName: (name: string) => page.getByRole("button", { name }),
  getLinkByName: (name: string) => page.getByRole("link", { name }),
});

export function withSelectors<T>(
  page: Page,
  callback: (_selectors: ReturnType<typeof selectors>) => T
) {
  return callback(selectors(page));
}
