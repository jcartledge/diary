import type { Config } from "@jest/types";

const jestConfig = (): Config.InitialOptions => ({
  clearMocks: true,
  coveragePathIgnorePatterns: [
    "/src/App.tsx",
    "/src/routes/index.tsx",
    "/src/graphql/client.ts",
    "/src/index.tsx",
    "/src/serviceWorker.ts",
  ],
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
});

export default jestConfig;
