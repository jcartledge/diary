import { DateContext } from "app/context/date/DateContext";
import { DiaryDate } from "lib/util/DiaryDate";
import { createHelper } from "souvlaki";

export const withDate = createHelper(
  (value: DiaryDate): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
      <DateContext.Provider value={value}>{children}</DateContext.Provider>
);
