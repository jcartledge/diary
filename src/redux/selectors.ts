import { createSelector } from "reselect";
import { AppState } from ".";

export const selectDate = ({ date }: AppState) => date;

const selectEntries = ({ entries }: AppState) => entries;

export const selectEntry = createSelector(
  [selectDate, selectEntries],
  (date, entries) =>
    entries.find(
      ({ date: entryDate }) => date.getTime() === entryDate.getTime()
    )
);
