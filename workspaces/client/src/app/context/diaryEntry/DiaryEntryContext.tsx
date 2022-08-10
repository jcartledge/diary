import { createContext } from "react";
import { type DiaryEntry } from "@diary/server/src/resolvers-types";

export const DiaryEntryContext = createContext<
  | {
      diaryEntry: DiaryEntry;
      updateDiaryEntry: (field: keyof DiaryEntry) => (value: string) => void;
      isDirty: boolean;
    }
  | undefined
>(undefined);
