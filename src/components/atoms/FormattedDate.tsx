import { LocaleContext } from "contexts/LocaleContext";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { selectDate } from "store/selectors";

export const FormattedDate: React.FC = () => {
  const locale = useContext(LocaleContext);
  return (
    <small className="p-2">
      {new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(useSelector(selectDate))}
    </small>
  );
};
