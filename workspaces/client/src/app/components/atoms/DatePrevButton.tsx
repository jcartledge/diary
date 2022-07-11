import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";

const DatePrevButton = () => {
  const date = useDate();
  return <Link to={`/page/${date.getPrevious().getKey()}`}>prev</Link>;
};

export default DatePrevButton;
