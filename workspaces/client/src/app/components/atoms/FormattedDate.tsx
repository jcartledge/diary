import { useDate } from "app/context/date/DateContext";
import { LocaleContext } from "app/context/locale/LocaleContext";
import React, { useContext } from "react";

export const FormattedDate: React.FC = () => {
  const locale = useContext(LocaleContext);
  const date = useDate();
  return <small className="p-2">{date.getFormatted(locale)}</small>;
};
