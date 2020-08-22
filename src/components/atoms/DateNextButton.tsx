import React from "react";
import { useIncrementDateAction } from "store/actions";

const DateNextButton: React.FC = () => (
  <button className="border rounded" onClick={useIncrementDateAction()}>
    next
  </button>
);

export default DateNextButton;
