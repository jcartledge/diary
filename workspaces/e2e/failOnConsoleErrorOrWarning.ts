import { type Page } from "@playwright/test";

export const failOnConsoleErrorOrWarning = ({ page }: { page: Page }) => {
  page.on("console", (message) => {
    const messageType = message.type();
    if (messageType === "error" || messageType === "warning") {
      throw new Error(message.text());
    }
  });
};
