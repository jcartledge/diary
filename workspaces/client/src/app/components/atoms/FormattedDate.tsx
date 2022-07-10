import { useDate } from "app/context/date/DateContext";
import { LocaleContext } from "app/context/locale/LocaleContext";
import { useContext } from "react";

export const FormattedDate: React.FC = () => {
  const locale = useContext(LocaleContext);
  const date = useDate();
  return <small>{date.getFormatted(locale)}</small>;
};
