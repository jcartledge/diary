import typescript from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import js from "@eslint/js"
import typescriptParser from "@typescript-eslint/parser";
import globals from 'globals';

const files = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'];

const reactRecommended = react.configs.recommended;
const reactJsxRuntime = react.configs["jsx-runtime"];
const typescriptRecommended = typescript.configs.recommended;

export default [
  js.configs.recommended,
  {
    files,
    plugins: {
      react,
      "@typescript-eslint": typescript,
    },
    rules: {
      ...reactRecommended.rules,
      ...reactJsxRuntime.rules,
      "react/display-name": 0,
      "react/prop-types": 0,
      ...typescriptRecommended.rules,
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        ...reactRecommended.parserOptions,
        ...reactJsxRuntime.parserOptions,
        ...typescriptRecommended.parserOptions,
      },
    },
  },
]
