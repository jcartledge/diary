import React from "react";
import DateNextButton from "../atoms/DateNextButton";
import DatePrevButton from "../atoms/DatePrevButton";
import { FormattedDate } from "../atoms/FormattedDate";

const DateControl: React.FC = () => (
  <div className="flex">
    <div className="flex-none">
      <DatePrevButton />
    </div>
    <div className="flex-grow">
      <FormattedDate />
    </div>
    <div className="flex-none">
      <DateNextButton />
    </div>
  </div>
);

export default DateControl;
