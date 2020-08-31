import { convertDateToEntryKey } from "util/date";
import { Builder } from "util/types";

export interface DiaryEntry {
  date: string;
  whatHappened: string;
  wentWell: string;
  couldBeImproved: string;
  notWell: string;
  risk: string;
}

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
