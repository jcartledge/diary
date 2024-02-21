import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContextProvider";
import React from "react";

export const withDiaryEntryContextProvider =
  (
    props?: React.ComponentProps<typeof DiaryEntryContextProvider>
  ): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
    (
      <DiaryEntryContextProvider {...props}>
        {children}
      </DiaryEntryContextProvider>
    )
