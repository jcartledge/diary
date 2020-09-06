import { DateContext } from "context/DateContext";
import React, { useContext } from "react";
import { useIsEntryForPreviousDate } from "graphql/queries";

const DatePrevButton: React.FC = () => {
  const { date, decrementDate } = useContext(DateContext);
  const isEntryForPreviousDate = useIsEntryForPreviousDate(date);
  return (
    <button
      className={`p-2 border rounded ${
        isEntryForPreviousDate ? "font-bold" : ""
      }`}
      onClick={() => decrementDate()}
    >
      prev
    </button>
  );
};

export default DatePrevButton;
