import {
  useDiaryEntryQuery,
  useUpdateDiaryEntryMutation,
} from "graphql/queries";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry } from "util/buildDiaryEntry";
import { useDate } from "./DateContext";
import {
  buildDiaryEntryContextValue,
  DiaryEntryContextProps,
  DiaryEntryContextValue,
} from "./DiaryEntryContext.types";

export const DiaryEntryContext = React.createContext<DiaryEntryContextValue>(
  buildDiaryEntryContextValue()
);

export const DiaryEntryContextProvider: React.FC<
  PropsWithChildren<DiaryEntryContextProps>
> = ({ children, saveTimeoutInterval = 1000 }) => {
  const date = useDate();
  const { data } = useDiaryEntryQuery(date);
  const [currentDiaryEntry, setDiaryEntry] = useState<DiaryEntry>(
    buildDiaryEntry()
  );
  const [isDirty, setIsDirty] = useState(false);
  const [doUpdateDiaryEntryMutation] = useUpdateDiaryEntryMutation();

  useEffect(() => {
    if (data) {
      const { __typename, ...diaryEntry } = data.diaryEntry;
      setDiaryEntry(diaryEntry);
      setIsDirty(false);
    }
  }, [data]);

  const [saveTimeout, setSaveTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  const updateDiaryEntry = useCallback(
    (field: keyof DiaryEntry) => (value: string) => {
      if (value !== currentDiaryEntry[field]) {
        const newDiaryEntry = { ...currentDiaryEntry, [field]: value };
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
    [
      currentDiaryEntry,
      doUpdateDiaryEntryMutation,
      saveTimeoutInterval,
      saveTimeout,
    ]
  );

  return (
    <DiaryEntryContext.Provider
      value={{
        diaryEntry: currentDiaryEntry,
        updateDiaryEntry,
        isDirty,
      }}
    >
      {children}
    </DiaryEntryContext.Provider>
  );
};
