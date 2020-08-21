import { produce } from "immer";
import { Action, combineReducers } from "redux";
import { convertDateToEntryKey } from "../util/convertDateToEntryKey";
import { ActionType, EntriesAction } from "./actions";
import { AppState, buildDiaryEntry, DiaryEntry } from "./state";

export const dateReducer = (date: Date | undefined, action: Action) =>
  date ?? new Date();

export const entriesReducer = (
  entries: DiaryEntry[] | undefined,
  action: EntriesAction
) =>
  produce(entries ?? [], (draftEntries) => {
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
