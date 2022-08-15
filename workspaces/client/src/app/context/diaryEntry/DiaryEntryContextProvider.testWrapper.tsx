import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContextProvider";
import React from "react";
import { createHelper } from "souvlaki";

export const withDiaryEntry = createHelper(
  (
      props?: React.ComponentProps<typeof DiaryEntryContextProvider>
    ): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
