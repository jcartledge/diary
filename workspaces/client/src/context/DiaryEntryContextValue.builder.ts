import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry } from "../util/buildDiaryEntry";
import { Builder } from "../util/builder.types";
import { DiaryEntryContextValue } from "./DiaryEntryContext";

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
