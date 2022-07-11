import { useDate } from "app/context/date/DateContext";
import { useLocale } from "app/context/locale/LocaleContext";

export const FormattedDate: React.FC = () => (
  <small>{useDate().getFormatted(useLocale())}</small>
);
