import { useDoesEntryExistForPreviousDate } from "graphql/queries";
import { useDate } from "context/useDate";
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
