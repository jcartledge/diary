import { type DiaryEntry } from "@diary/shared/types/DiaryEntry.types";
import { createContext } from "react";

export const DiaryEntryContext = createContext<
  | {
      diaryEntry: DiaryEntry;
      updateDiaryEntry: (field: keyof DiaryEntry) => (value: string) => void;
      isDirty: boolean;
    }
  | undefined
>(undefined);
