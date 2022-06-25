import { DiaryEntryContext } from "context/DiaryEntryContext";
import {
  buildDiaryEntryContextValue,
  type DiaryEntryContextValue,
} from "context/DiaryEntryContext.types";
import { createHelper } from "souvlaki";

export const withDiaryEntryContext = createHelper(
  (
      value: Partial<DiaryEntryContextValue>
    ): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DiaryEntryContext.Provider value={buildDiaryEntryContextValue(value)}>
          {children}
        </DiaryEntryContext.Provider>
      )
);
