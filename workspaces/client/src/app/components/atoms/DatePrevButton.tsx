import { useDate } from "app/context/date/DateContext";
import { Link } from "lib/router";

interface DatePrevButtonProps {
  disabled?: boolean;
}

const DatePrevButton: React.FC<DatePrevButtonProps> = ({
  disabled = false,
}) => {
  const date = useDate();
  return (
    <Link disabled={disabled} to={`/page/${date.getPrevious().getKey()}`}>
      prev
    </Link>
  );
};

export default DatePrevButton;
