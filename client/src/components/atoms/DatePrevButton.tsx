import { DateContext } from "context/DateContext";
import { useDoesEntryExistForPreviousDate } from "graphql/queries";
import React, { useContext } from "react";

const DatePrevButton: React.FC = () => {
  const { date, decrementDate } = useContext(DateContext);
  const doesEntryExistForPreviousDate = useDoesEntryExistForPreviousDate(date);
  return (
    <button
      className={`p-2 border rounded ${
        doesEntryExistForPreviousDate ? "font-bold" : ""
      }`}
      onClick={() => decrementDate()}
    >
      prev
    </button>
  );
};

export default DatePrevButton;
