import React, { createContext, useState } from "react";
import { DiaryDate } from "util/date";
import { Builder } from "util/types";

interface DateContextValue {
  date: DiaryDate;
  decrementDate: () => void;
  incrementDate: () => void;
}

export const buildDateContextValue: Builder<DateContextValue> = (
  overrides = {}
) => ({
  date: new DiaryDate(),
  decrementDate: () => null,
  incrementDate: () => null,
  ...overrides,
});

export const DateContext = createContext<DateContextValue>(
  buildDateContextValue()
);

interface DateContextProps {
  date?: DiaryDate;
}

const DateContextProvider: React.FC<React.PropsWithChildren<
  DateContextProps
>> = ({ date: dateFromProps, children }) => {
  const [date, setDate] = useState(dateFromProps ?? new DiaryDate());
  const contextValue = buildDateContextValue({
    date,
    decrementDate: () => setDate(date.getPrevious()),
    incrementDate: () => setDate(date.getNext()),
  });
  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

export default DateContextProvider;
