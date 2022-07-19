import { useContext } from "react";
import { DiaryEntryContext } from "./DiaryEntryContext";

export const useDiaryEntry = () => {
  const diaryEntryContext = useContext(DiaryEntryContext);
  if (diaryEntryContext === undefined) {
    throw new Error("useDiaryEntry requires a valid DiaryEntryContext");
  }
  return diaryEntryContext;
};
