import React, { useContext } from "react";
import { LocaleContext } from "../contexts/LocaleContext";

interface FormattedDateProps {
  date: Date;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  const locale = useContext(LocaleContext);
  return (
    <small>
      {new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date)}
    </small>
  );
};
