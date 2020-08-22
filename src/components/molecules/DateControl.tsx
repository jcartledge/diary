import DateNextButton from "components/atoms/DateNextButton";
import DatePrevButton from "components/atoms/DatePrevButton";
import { FormattedDate } from "components/atoms/FormattedDate";
import React from "react";

const DateControl: React.FC = () => (
  <>
    <DatePrevButton />
    <FormattedDate />
    <DateNextButton />
  </>
);

export default DateControl;
