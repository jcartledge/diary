import { defineConfig, devices } from "@playwright/test";

export const authFile = "playwright/.auth/user.json";

const project = (name: string, device: keyof typeof devices, options = {}) => ({
  name,
  use: { ...devices[device], storageState: authFile, ...options },
  dependencies: ["setup"],
});

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: { ...devices["Desktop Firefox"] },
    },
    project("firefox", "Desktop Firefox"),
    project("webkit", "Desktop Safari"),
    // project("chromium", "Desktop Chrome", {
    //   launchOptions: { args: ["--user-data-dir"] },
    // }),
  ],
});
