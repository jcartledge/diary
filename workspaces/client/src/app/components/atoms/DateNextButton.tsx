import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";

const DateNextButton: React.FC = () => {
  const date = useDate();
  return date.isToday() ? (
    <span aria-disabled>next</span>
  ) : (
    <Link to={`/page/${date.getNext().getKey()}`}>next</Link>
  );
};

export default DateNextButton;
