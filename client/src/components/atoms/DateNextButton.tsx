import React from "react";
import { useSelector } from "react-redux";
import { useIncrementDateAction } from "store/actions/date";
import { selectDate, selectIsEntryForNextDate } from "store/selectors";
import { dateIsToday } from "util/date";

const DateNextButton: React.FC = () => {
  const onClickHandler = useIncrementDateAction();
  const isEntryForNextDate = useSelector(selectIsEntryForNextDate);
  return dateIsToday(useSelector(selectDate)) ? (
    <DateNextButtonDisabled />
  ) : (
    <button
      className={`p-2 border rounded ${isEntryForNextDate ? "font-bold" : ""}`}
      onClick={onClickHandler}
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
