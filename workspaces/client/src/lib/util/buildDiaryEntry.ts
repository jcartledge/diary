import { type DiaryEntry } from "server/src/resolvers-types";
import { type Builder } from "./types/builder.types";

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
