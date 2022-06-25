import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import env from "vite-plugin-env-compatible";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [env({ prefix: "REACT_APP_" }), react(), tsconfigPaths()],
});
