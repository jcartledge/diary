import {
  buildDiaryEntry,
  type DiaryEntry,
} from "@diary/shared/types/diaryEntry";
import { useDiaryEntryQuery } from "app/queries/useDiaryEntryQuery";
import { useUpdateDiaryEntryMutation } from "app/queries/useUpdateDiaryEntryMutation";
import { useCallback, useEffect, useState } from "react";
import { useDate } from "../date/DateContext";
import { DiaryEntryContext } from "./DiaryEntryContext";

export const DiaryEntryContextProvider: React.FC<
  React.PropsWithChildren<{
    saveTimeoutInterval?: number;
  }>
> = ({ children, saveTimeoutInterval = 1000 }) => {
  const { data: diaryEntryQueryData, isLoading } = useDiaryEntryQuery(
    useDate().getKey(),
  );
  const [diaryEntry, setDiaryEntry] = useState(buildDiaryEntry());
  const [isDirty, setIsDirty] = useState(false);
  const updateDiaryEntryMutation = useUpdateDiaryEntryMutation();

  useEffect(() => {
    if (diaryEntryQueryData) {
      setDiaryEntry(diaryEntryQueryData.diaryEntry);
      setIsDirty(false);
    }
  }, [diaryEntryQueryData]);

  const [saveTimeout, setSaveTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const updateDiaryEntry = useCallback(
    (fieldName: keyof DiaryEntry) => (fieldValue: string) => {
      if (fieldValue !== diaryEntry[fieldName]) {
        const newDiaryEntry = { ...diaryEntry, [fieldName]: fieldValue };
        setDiaryEntry(newDiaryEntry);
        setIsDirty(true);
        saveTimeout && clearTimeout(saveTimeout);
        setSaveTimeout(
          setTimeout(() => {
            updateDiaryEntryMutation.mutate(newDiaryEntry);
            setIsDirty(false);
          }, saveTimeoutInterval),
        );
      }
    },
    [diaryEntry, updateDiaryEntryMutation, saveTimeoutInterval, saveTimeout],
  );

  return (
    <DiaryEntryContext.Provider
      value={{
        diaryEntry,
        updateDiaryEntry,
        isDirty,
        isLoading,
      }}
    >
      {children}
    </DiaryEntryContext.Provider>
  );
};
