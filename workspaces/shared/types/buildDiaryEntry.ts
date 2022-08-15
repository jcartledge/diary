import { type DiaryEntry } from "@diary/shared/types/DiaryEntry.types";

export const buildDiaryEntry = (
  overrides: Partial<DiaryEntry> = {}
): DiaryEntry => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
