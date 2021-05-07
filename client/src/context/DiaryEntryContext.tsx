import {
  useDiaryEntryQuery,
  useUpdateDiaryEntryMutation,
} from "graphql/queries";
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry, Builder } from "util/types";
import { DateContext } from "./DateContext";

interface DiaryEntryContextValue {
  diaryEntry: DiaryEntry;
  updateDiaryEntry: (field: keyof DiaryEntry) => (value: string) => void;
  isDirty: boolean;
}

export const buildDiaryEntryContextValue: Builder<DiaryEntryContextValue> = (
  overrides = {}
) => ({
  diaryEntry: buildDiaryEntry(),
  updateDiaryEntry: (_field: keyof DiaryEntry) => (_value: string) => {
    return;
  },
  isDirty: false,
  ...overrides,
});

export const DiaryEntryContext = React.createContext<DiaryEntryContextValue>(
  buildDiaryEntryContextValue()
);

interface DiaryEntryContextProps {
  saveTimeoutInterval?: number;
}

export const DiaryEntryContextProvider: React.FC<
  PropsWithChildren<DiaryEntryContextProps>
> = ({ children, saveTimeoutInterval = 1000 }) => {
  const { date } = useContext(DateContext);
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

  const [saveTimeout, setSaveTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();

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
      value={buildDiaryEntryContextValue({
        diaryEntry: currentDiaryEntry,
        updateDiaryEntry,
        isDirty,
      })}
    >
      {children}
    </DiaryEntryContext.Provider>
  );
};
