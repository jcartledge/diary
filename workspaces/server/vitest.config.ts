// vite.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      exclude: [
        "app.ts",
        "config.ts",
        "index.ts",
        "resolvers-types.ts",
        "DiaryEntriesResolverError.ts",
      ],
      src: ["./src"],
      reportsDirectory: "./output/coverage/report",
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
