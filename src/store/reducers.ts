import { produce } from "immer";
import { combineReducers } from "redux";
import { convertDateToEntryKey, decrementDate, incrementDate } from "util/date";
import { Maybe } from "util/types";
import { ActionType, DateAction, EntriesAction } from "./actions";
import { AppState, buildDiaryEntry, DiaryEntry } from "./state";

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

export const entriesReducer = (
  maybeEntries: Maybe<DiaryEntry[]>,
  action: EntriesAction
) =>
  produce(maybeEntries ?? [], (draftEntries) => {
    switch (action.type) {
      case ActionType.FIELD_CHANGED_ACTION:
        const { date, field, value } = action;
        const dateKey = convertDateToEntryKey(date);

        const entryIndex = draftEntries.findIndex(
          ({ date }) => date === dateKey
        );
        if (entryIndex > -1) {
          draftEntries[entryIndex][field] = value;
        } else {
          draftEntries.push(buildDiaryEntry({ date: dateKey, [field]: value }));
        }
    }
  });

export const rootReducer = combineReducers<AppState>({
  date: dateReducer,
  entries: entriesReducer,
});
