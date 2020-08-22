import React from "react";
import { useDecrementDateAction } from "store/actions/date";

const DatePrevButton: React.FC = () => (
  <button className="border rounded" onClick={useDecrementDateAction()}>
    prev
  </button>
);

export default DatePrevButton;
