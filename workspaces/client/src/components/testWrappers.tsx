import {
  buildDiaryEntryContextValue,
  DiaryEntryContext,
  DiaryEntryContextProps,
  DiaryEntryContextProvider,
  DiaryEntryContextValue,
} from "context/DiaryEntryContext";
import { LocaleContext } from "context/LocaleContext";
import { createHelper } from "souvlaki";

export const withLocale = createHelper((locale) => ({ children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
));

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps) =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);

export const withDiaryEntryContext = createHelper(
  (value: Partial<DiaryEntryContextValue>) =>
    ({ children }) =>
      (
        <DiaryEntryContext.Provider value={buildDiaryEntryContextValue(value)}>
          {children}
        </DiaryEntryContext.Provider>
      )
);
