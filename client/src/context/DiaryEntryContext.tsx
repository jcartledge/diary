import {
  useDiaryEntryQuery,
  useUpdateDiaryEntryMutation,
} from "graphql/queries";
import React, {
  PropsWithChildren,
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
}

export const buildDiaryEntryContextValue: Builder<DiaryEntryContextValue> = (
  overrides = {}
) => ({
  diaryEntry: buildDiaryEntry(),
  updateDiaryEntry: (_field: keyof DiaryEntry) => (_value: string) => {
    return;
  },
  ...overrides,
});

export const DiaryEntryContext = React.createContext<DiaryEntryContextValue>(
  buildDiaryEntryContextValue()
);

interface DiaryEnmtryContextProps {
  saveTimeoutInterval?: number;
}

export const DiaryEntryContextProvider: React.FC<PropsWithChildren<
  DiaryEnmtryContextProps
>> = ({ children, saveTimeoutInterval = 1000 }) => {
  const { date } = useContext(DateContext);
  const { data } = useDiaryEntryQuery(date);
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry>(buildDiaryEntry());
  const [doUpdateDiaryEntryMutation] = useUpdateDiaryEntryMutation();

  useEffect(() => {
    if (data) {
      const { __typename, ...diaryEntry } = data.diaryEntry;
      setDiaryEntry(diaryEntry);
    }
  }, [data]);

  const [saveTimeout, setSaveTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();

  const updateDiaryEntry = (field: keyof DiaryEntry) => (value: string) => {
    const newDiaryEntry = { ...diaryEntry, [field]: value };
    setDiaryEntry(newDiaryEntry);
    clearTimeout(saveTimeout);
    setSaveTimeout(
      setTimeout(() => {
        doUpdateDiaryEntryMutation({
          variables: { diaryEntry: newDiaryEntry },
        });
      }, saveTimeoutInterval)
    );
  };

  return (
    <DiaryEntryContext.Provider value={{ diaryEntry, updateDiaryEntry }}>
      {children}
    </DiaryEntryContext.Provider>
  );
};
