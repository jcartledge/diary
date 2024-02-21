import React from "react";
import {
  buildDiaryEntryContextValue,
  DiaryEntryContext,
  type DiaryEntryContextValue,
} from "./DiaryEntryContext";

export const wrapWithDiaryEntryContext =
  (
    contextValue: Partial<DiaryEntryContextValue> = {}
  ): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
    (
      <DiaryEntryContext.Provider
        value={buildDiaryEntryContextValue(contextValue)}
      >
        {children}
      </DiaryEntryContext.Provider>
    )
