import { DateAction, DateActionType } from "store/actions/date";
import { decrementDate, incrementDate } from "util/date";
import { Maybe } from "util/types";

export const dateReducer = (maybeDate: Maybe<Date>, action: DateAction) => {
  const definitelyDate = maybeDate ?? new Date();
  switch (action.type) {
    case DateActionType.DECREMENT_DATE_ACTION:
      return decrementDate(definitelyDate);
    case DateActionType.INCREMENT_DATE_ACTION:
      return incrementDate(definitelyDate);
    default:
      return definitelyDate;
  }
};
