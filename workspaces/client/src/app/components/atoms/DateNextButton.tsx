import { useDate } from "app/context/date/DateContext";
import { useDoesEntryExistForNextDate } from "app/graphql/queries";
import { Link } from "lib/router";
import { DiaryDate } from "lib/util/date";
import React from "react";

const nextButtonClassNames = (
  doesEntryExistForNextDate: boolean | undefined
): string => (doesEntryExistForNextDate ? "font-bold" : "");

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
  const doesEntryExistForNextDate = useDoesEntryExistForNextDate(date);
  const dateNextPath = `/page/${date.getNext().getKey()}`;
  return (
    <Link
      to={dateNextPath}
      className={nextButtonClassNames(doesEntryExistForNextDate)}
    >
      next
    </Link>
  );
};

export default DateNextButton;
