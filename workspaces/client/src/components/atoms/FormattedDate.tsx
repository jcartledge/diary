import { LocaleContext } from "context/LocaleContext";
import { useDate } from "context/DateContext";
import React, { useContext } from "react";

export const FormattedDate: React.FC = () => {
  const locale = useContext(LocaleContext);
  const date = useDate();
  return <small className="p-2">{date.getFormatted(locale ?? "")}</small>;
};
