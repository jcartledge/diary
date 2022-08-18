// vite.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      exclude: ["index.ts", "**/*.test.ts"],
      src: ["./src"],
      reportsDirectory: "./output/coverage/report",
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
