import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";

const DateNextButton: React.FC = () => {
  const date = useDate();
  return (
    <Link disabled={date.isToday()} to={`/page/${date.getNext().getKey()}`}>
      next
    </Link>
  );
};

export default DateNextButton;
