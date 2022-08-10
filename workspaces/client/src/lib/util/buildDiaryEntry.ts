import { type DiaryEntry } from "@diary/server/src/resolvers-types";
import { type Builder } from "@diary/shared/types/builder.types";

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
