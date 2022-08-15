import { type Builder } from "@diary/shared/types/builder.types";
import { DiaryEntry } from "@diary/shared/types/DiaryEntry.types";

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
