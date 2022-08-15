import { type DiaryEntry } from "@diary/server/src/resolvers-types";
import {
  useDiaryEntryQuery,
  useUpdateDiaryEntryMutation,
} from "app/graphql/queries";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { useCallback, useEffect, useState } from "react";
import { useDate } from "../date/DateContext";
import { DiaryEntryContext } from "./DiaryEntryContext";
import { DiaryEntryContextProviderProps } from "./DiaryEntryContextProvider";

export const OldDiaryEntryContextProvider: React.FC<
  DiaryEntryContextProviderProps
> = ({ children, saveTimeoutInterval = 1000 }) => {
  const date = useDate();
  const { data: diaryEntryQueryData } = useDiaryEntryQuery(date);
  const [diaryEntry, setDiaryEntry] = useState(buildDiaryEntry());
  const [isDirty, setIsDirty] = useState(false);
  const [doUpdateDiaryEntryMutation] = useUpdateDiaryEntryMutation();

  useEffect(() => {
    if (diaryEntryQueryData) {
      const { __typename, ...updatedDiaryEntry } =
        diaryEntryQueryData.diaryEntry;
      setDiaryEntry(updatedDiaryEntry);
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
          setTimeout(async () => {
            await doUpdateDiaryEntryMutation({
              variables: { diaryEntry: newDiaryEntry },
            });
            setIsDirty(false);
          }, saveTimeoutInterval)
        );
      }
    },
    [diaryEntry, doUpdateDiaryEntryMutation, saveTimeoutInterval, saveTimeout]
  );

  return (
    <DiaryEntryContext.Provider
      value={{
        diaryEntry,
        updateDiaryEntry,
        isDirty,
      }}
    >
      {children}
    </DiaryEntryContext.Provider>
  );
};
