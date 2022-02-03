import { Link } from "react-router-dom";
import { useDate } from "../../context/DateContext";
import { useDoesEntryExistForPreviousDate } from "../../graphql/queries";

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
