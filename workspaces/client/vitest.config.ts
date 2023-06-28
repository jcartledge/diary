import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      all: true,
      include: ["**/*.ts", "**/*.tsx"],
      exclude: [
        "src/App.tsx",
        "src/config.ts",
        "src/index.tsx",
        "**/*.types.ts",
      ],
      excludeNodeModules: true,
      reporter: ["text", "json", "html"],
      src: ["./src"],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
