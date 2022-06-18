import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry } from "../util/buildDiaryEntry";
import { Builder } from "../util/builder.types";

export interface DiaryEntryContextProps {
  saveTimeoutInterval?: number;
}

export interface DiaryEntryContextValue {
  diaryEntry: DiaryEntry;
  updateDiaryEntry: (field: keyof DiaryEntry) => (value: string) => void;
  isDirty: boolean;
}

export const buildDiaryEntryContextValue: Builder<DiaryEntryContextValue> = (
  overrides = {}
) => ({
  diaryEntry: buildDiaryEntry(),
  updateDiaryEntry: (_: keyof DiaryEntry) => (_: string) => {
    return;
  },
  isDirty: false,
  ...overrides,
});
