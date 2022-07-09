import { useDate } from "app/context/date/DateContext";
import { useDoesEntryExistForPreviousDate } from "app/graphql/queries";
import { Link } from "lib/router";

const DatePrevButton = () => {
  const date = useDate();
  const doesEntryExistForPreviousDate = useDoesEntryExistForPreviousDate(date);
  return (
    <Link
      to={`/page/${date.getPrevious().getKey()}`}
      className={`p-2 border rounded ${
        doesEntryExistForPreviousDate ? "font-bold" : ""
      }`}
    >
      prev
    </Link>
  );
};

export default DatePrevButton;
