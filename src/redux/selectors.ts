import { createSelector } from "reselect";
import { AppState } from ".";
import { convertDateToEntryKey } from "../util/convertDateToEntryKey";

export const selectDate = ({ date }: AppState) => date;

const selectEntries = ({ entries }: AppState) => entries;

export const selectEntry = createSelector(
  [selectDate, selectEntries],
  (date, entries) => {
    const dateKey = convertDateToEntryKey(date);
    return entries.find(({ date }) => dateKey === date);
  }
);
