import DateNextButton from "app/components/atoms/DateNextButton";
import DatePrevButton from "app/components/atoms/DatePrevButton";
import { FormattedDate } from "app/components/atoms/FormattedDate";
import React from "react";

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
