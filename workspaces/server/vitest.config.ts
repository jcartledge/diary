// vite.config.ts
import { defineConfig, type UserConfigExport } from "vitest/config";

const config: UserConfigExport = {
  test: {
    coverage: {
      all: true,
      include: ["**/*.ts"],
      exclude: ["**/build", "**/test", "src/index.ts"],
      reportsDirectory: "./output/coverage/report",
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    deps: { interopDefault: true },
    environment: "node",
  },
};

export default defineConfig(config);
