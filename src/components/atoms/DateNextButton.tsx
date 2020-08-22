import React from "react";
import { useIncrementDateAction } from "store/actions/date";

const DateNextButton: React.FC = () => (
  <button className="p-2 border rounded" onClick={useIncrementDateAction()}>
    next
  </button>
);

export default DateNextButton;
