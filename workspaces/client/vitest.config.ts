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
      exclude: [
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.types.ts",
        "App.tsx",
        "app/graphql/client.ts",
        "index.tsx",
        "src/test",
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
