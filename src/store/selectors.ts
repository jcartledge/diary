import { createSelector } from "reselect";
import { convertDateToEntryKey } from "util/date";
import { AppState, buildDiaryEntry } from "./state";

export const selectDate = ({ date }: AppState) => date;

const selectEntries = ({ entries }: AppState) => entries;

export const selectEntry = createSelector(
  [selectDate, selectEntries],
  (date, entries) => {
    const dateKey = convertDateToEntryKey(date);
    return (
      entries.find(({ date }) => dateKey === date) ??
      buildDiaryEntry({ date: dateKey })
    );
  }
);

export const selectWhatHappened = createSelector(
  selectEntry,
  ({ whatHappened }) => whatHappened
);

export const selectWentWell = createSelector(
  selectEntry,
  ({ wentWell }) => wentWell
);

export const selectCouldBeImproved = createSelector(
  selectEntry,
  ({ couldBeImproved }) => couldBeImproved
);

export const selectNotWell = createSelector(
  selectEntry,
  ({ notWell }) => notWell
);

export const selectRisk = createSelector(selectEntry, ({ risk }) => risk);
