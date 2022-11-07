import { Builder } from "@diary/shared/types/builder.types";
import {
  buildDiaryEntry,
  type DiaryEntry,
} from "@diary/shared/types/diaryEntry";
import { createContext } from "react";

export interface DiaryEntryContextValue {
  diaryEntry: DiaryEntry;
  updateDiaryEntry: (field: keyof DiaryEntry) => (value: string) => void;
  isDirty: boolean;
  isLoading: boolean;
}

export const DiaryEntryContext = createContext<
  DiaryEntryContextValue | undefined
>(undefined);

export const buildDiaryEntryContextValue: Builder<DiaryEntryContextValue> = (
  overrides = {}
) => ({
  diaryEntry: buildDiaryEntry(),
  updateDiaryEntry: (_) => (_) => {},
  isDirty: false,
  isLoading: false,
  ...overrides,
});
