import { useDate } from "app/context/date/DateContext";
import { useDoesEntryExistForPreviousDate } from "app/graphql/queries";
import { Link } from "react-router-dom";

const DatePrevButton = () => {
  const date = useDate();
  const doesEntryExistForPreviousDate = useDoesEntryExistForPreviousDate(date);
  return (
    <Link to={`/page/${date.getPrevious().getKey()}`}>
      <button
        className={`p-2 border rounded ${
          doesEntryExistForPreviousDate ? "font-bold" : ""
        }`}
      >
        prev
      </button>
    </Link>
  );
};

export default DatePrevButton;
