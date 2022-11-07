import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";

interface DateNextButtonProps {
  disabled?: boolean;
}

const DateNextButton: React.FC<DateNextButtonProps> = ({
  disabled = false,
}) => {
  const date = useDate();
  return (
    <Link
      disabled={date.isToday() || disabled}
      to={`/page/${date.getNext().getKey()}`}
    >
      next
    </Link>
  );
};

export default DateNextButton;
