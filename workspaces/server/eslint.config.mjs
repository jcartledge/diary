import typescript from "typescript-eslint";
import js from "@eslint/js"

export default typescript.config(
  js.configs.recommended,
  ...typescript.configs.recommended,
);
