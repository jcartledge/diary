import { DateContext } from "app/context/DateContext";
import React from "react";
import { createHelper } from "souvlaki";
import { DiaryDate } from "lib/util/date";

export const withDate = createHelper(
  (value?: DiaryDate): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DateContext.Provider value={value ?? new DiaryDate()}>
          {children}
        </DateContext.Provider>
      )
);
