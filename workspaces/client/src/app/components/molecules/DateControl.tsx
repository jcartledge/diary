import DateNextButton from "app/components/atoms/DateNextButton";
import DatePrevButton from "app/components/atoms/DatePrevButton";
import { FormattedDate } from "app/components/atoms/FormattedDate";
import React from "react";

const DateControl: React.FC = () => (
  <>
    <DatePrevButton />
    <FormattedDate />
    <DateNextButton />
  </>
);

export default DateControl;
