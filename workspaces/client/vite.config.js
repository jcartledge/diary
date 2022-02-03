import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [env({ prefix: "REACT_APP_" }), react()],
});
