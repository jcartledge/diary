import { useDate } from "app/context/date/DateContext";
import { useDoesEntryExistForNextDate } from "app/graphql/queries";
import { Link } from "lib/router";
import { DiaryDate } from "lib/util/date";
import React from "react";

const nextButtonClassNames = (
  doesEntryExistForNextDate: boolean | undefined
): string =>
  `p-2 border rounded ${doesEntryExistForNextDate ? "font-bold" : ""}`;

const DateNextButton: React.FC = () => {
  const date = useDate();
  return date.isToday() ? (
    <DateNextButtonDisabled />
  ) : (
    <DateNextLink date={date} />
  );
};

const DateNextButtonDisabled: React.FC = () => (
  <button className="p-2 border rounded cursor-not-allowed opacity-50" disabled>
    next
  </button>
);

type DateNextLinkProps = { date: DiaryDate };

const DateNextLink: React.FC<DateNextLinkProps> = ({ date }) => {
  const doesEntryExistForNextDate = useDoesEntryExistForNextDate(date);
  return (
    <Link to={`/page/${date.getNext().getKey()}`}>
      <button className={nextButtonClassNames(doesEntryExistForNextDate)}>
        next
      </button>
    </Link>
  );
};

export default DateNextButton;
