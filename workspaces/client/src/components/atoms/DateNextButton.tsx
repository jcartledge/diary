import { DateContext } from "context/DateContext";
import { useDoesEntryExistForNextDate } from "graphql/queries";
import React, { useContext } from "react";

const nextButtonClassNames = (
  doesEntryExistForNextDate: boolean | undefined
): string =>
  `p-2 border rounded ${doesEntryExistForNextDate ? "font-bold" : ""}`;

const DateNextButton: React.FC = () => {
  const { date, incrementDate } = useContext(DateContext);
  const doesEntryExistForNextDate = useDoesEntryExistForNextDate(date);
  return date.isToday() ? (
    <DateNextButtonDisabled />
  ) : (
    <button
      className={nextButtonClassNames(doesEntryExistForNextDate)}
      onClick={() => incrementDate()}
    >
      next
    </button>
  );
};

const DateNextButtonDisabled: React.FC = () => (
  <button className="p-2 border rounded cursor-not-allowed opacity-50" disabled>
    next
  </button>
);

export default DateNextButton;
