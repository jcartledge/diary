import {
  useDiaryEntryQuery,
  useUpdateDiaryEntryMutation,
} from "app/graphql/queries";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { useCallback, useEffect, useState } from "react";
import { type DiaryEntry } from "server/src/resolvers-types";
import { useDate } from "../date/DateContext";
import { DiaryEntryContext } from "./DiaryEntryContext";

export const DiaryEntryContextProvider: React.FC<
  React.PropsWithChildren<{
    saveTimeoutInterval?: number;
  }>
> = ({ children, saveTimeoutInterval = 1000 }) => {
  const date = useDate();
  const { data } = useDiaryEntryQuery(date);
  const [diaryEntry, setDiaryEntry] = useState(buildDiaryEntry());
  const [isDirty, setIsDirty] = useState(false);
  const [doUpdateDiaryEntryMutation] = useUpdateDiaryEntryMutation();

  useEffect(() => {
    if (data) {
      const { __typename, ...updatedDiaryEntry } = data.diaryEntry;
      setDiaryEntry(updatedDiaryEntry);
      setIsDirty(false);
    }
  }, [data]);

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
