import { ActionType, DateAction } from "store/actions";
import { decrementDate, incrementDate } from "util/date";
import { Maybe } from "util/types";

export const dateReducer = (maybeDate: Maybe<Date>, action: DateAction) => {
  const definitelyDate = maybeDate ?? new Date();
  switch (action.type) {
    case ActionType.DECREMENT_DATE_ACTION:
      return decrementDate(definitelyDate);
    case ActionType.INCREMENT_DATE_ACTION:
      return incrementDate(definitelyDate);
    default:
      return definitelyDate;
  }
};
