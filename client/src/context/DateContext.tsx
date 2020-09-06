import React, { createContext, useState } from "react";
import { convertDateToEntryKey, decrementDate, incrementDate } from "util/date";

interface DateContextValue {
  date: string;
  decrementDate: () => void;
  incrementDate: () => void;
}

export const DateContext = createContext<DateContextValue>({
  date: convertDateToEntryKey(new Date()),
  decrementDate: () => null,
  incrementDate: () => null,
});

const DateContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [date, setDate] = useState(new Date());
  const contextValue = {
    date: convertDateToEntryKey(date),
    decrementDate: () => setDate(decrementDate(date)),
    incrementDate: () => setDate(incrementDate(date)),
  };
  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

export default DateContextProvider;
