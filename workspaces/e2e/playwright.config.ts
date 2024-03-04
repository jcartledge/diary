import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
});
