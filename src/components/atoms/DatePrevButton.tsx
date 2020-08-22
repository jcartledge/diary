import React from "react";
import { useSelector } from "react-redux";
import { useDecrementDateAction } from "store/actions/date";
import { selectIsEntryForPreviousDate } from "store/selectors";

const DatePrevButton: React.FC = () => (
  <button
    className={`p-2 border rounded ${
      useSelector(selectIsEntryForPreviousDate) ? "font-bold" : ""
    }`}
    onClick={useDecrementDateAction()}
  >
    prev
  </button>
);

export default DatePrevButton;
