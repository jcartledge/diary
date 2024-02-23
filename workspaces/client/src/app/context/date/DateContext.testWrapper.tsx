import { DateContext } from "app/context/date/DateContext";
import { DiaryDate } from "lib/util/DiaryDate";

export const wrapWithDate =
  (value: DiaryDate): React.FC<React.PropsWithChildren> =>
  ({ children }) => (
    <DateContext.Provider value={value}>{children}</DateContext.Provider>
  );
