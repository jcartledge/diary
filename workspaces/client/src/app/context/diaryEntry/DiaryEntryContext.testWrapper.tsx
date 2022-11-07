import React from "react";
import { createHelper } from "souvlaki";
import {
  buildDiaryEntryContextValue,
  DiaryEntryContext,
  type DiaryEntryContextValue,
} from "./DiaryEntryContext";

export const withDiaryEntryContext = createHelper(
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
);
