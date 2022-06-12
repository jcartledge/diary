import React from "react";
import { createHelper } from "souvlaki";
import { DateContext } from "../../context/DateContext";
import { DiaryDate } from "../../util/date";

export const withDate = createHelper(
  (value?: DiaryDate): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DateContext.Provider value={value ?? new DiaryDate()}>
          {children}
        </DateContext.Provider>
      )
);
