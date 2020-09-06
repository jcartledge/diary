import { DiaryEntry } from "server/src/resolvers-types";
import { convertDateToEntryKey } from "util/date";
import { Builder } from "util/types";

export type DiaryEntryField = keyof Omit<DiaryEntry, "date">;

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  date: convertDateToEntryKey(new Date()),
  whatHappened: "",
  wentWell: "",
  couldBeImproved: "",
  notWell: "",
  risk: "",
  ...overrides,
});

export interface AppState {
  date: Date;
  entries: DiaryEntry[];
}

export const buildState: Builder<AppState> = (overrides) => ({
  date: new Date(),
  entries: [],
  ...overrides,
});
