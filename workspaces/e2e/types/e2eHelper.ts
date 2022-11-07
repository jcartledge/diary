import { type Page } from "@playwright/test";

export type E2eHelper = (options: { page: Page }) => void | Promise<void>;
