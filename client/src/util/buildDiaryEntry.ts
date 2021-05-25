import { DiaryEntry } from "server/src/resolvers-types";
import { Builder } from "./builder";

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
