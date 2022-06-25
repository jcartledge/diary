import {
  DiaryEntryContext,
  DiaryEntryContextProvider,
} from "app/context/DiaryEntryContext";
import {
  buildDiaryEntryContextValue,
  type DiaryEntryContextProps,
  type DiaryEntryContextValue,
} from "app/context/DiaryEntryContext.types";
import { createHelper } from "souvlaki";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);

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
