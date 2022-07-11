import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";
import { DiaryDate } from "lib/util/date";

const DateNextButton: React.FC = () => {
  const date = useDate();
  return date.isToday() ? (
    <DateNextButtonDisabled />
  ) : (
    <DateNextLink date={date} />
  );
};

const DateNextButtonDisabled: React.FC = () => (
  <span className="secondary outline" aria-disabled>
    next
  </span>
);

type DateNextLinkProps = { date: DiaryDate };

const DateNextLink: React.FC<DateNextLinkProps> = ({ date }) => {
  const dateNextPath = `/page/${date.getNext().getKey()}`;
  return <Link to={dateNextPath}>next</Link>;
};

export default DateNextButton;
