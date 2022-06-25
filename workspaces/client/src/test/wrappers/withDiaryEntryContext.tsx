import { DiaryEntryContext } from "app/context/DiaryEntryContext";
import {
  buildDiaryEntryContextValue,
  type DiaryEntryContextValue,
} from "app/context/DiaryEntryContext.types";
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
