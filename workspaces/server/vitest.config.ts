// vite.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["**/*.ts"],
      exclude: ["**/build", "**/test", "src/index.ts"],
      src: ["./src"],
      reportsDirectory: "./output/coverage/report",
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
    deps: { interopDefault: true },
    environment: "node",
  },
});
