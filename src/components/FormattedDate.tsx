import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { LocaleContext } from "../contexts/LocaleContext";
import { selectDate } from "../redux/selectors";

export const FormattedDate: React.FC = () => {
  const locale = useContext(LocaleContext);
  return (
    <small>
      {new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(useSelector(selectDate))}
    </small>
  );
};
