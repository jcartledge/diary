import { createSelector } from "reselect";
import { convertDateToEntryKey, decrementDate, incrementDate } from "util/date";
import { AppState, buildDiaryEntry, DiaryEntry } from "./state";

const isEntryForDateKey = (dateKey: string, entries: DiaryEntry[]) =>
  entries.findIndex(({ date }) => dateKey === date) > -1;

export const selectDate = ({ date }: AppState) => date;

const selectPreviousDateKey = createSelector(selectDate, (date) =>
  convertDateToEntryKey(decrementDate(date))
);

const selectNextDateKey = createSelector(selectDate, (date) =>
  convertDateToEntryKey(incrementDate(date))
);

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

export const selectIsEntryForPreviousDate = createSelector(
  [selectPreviousDateKey, selectEntries],
  isEntryForDateKey
);

export const selectIsEntryForNextDate = createSelector(
  [selectNextDateKey, selectEntries],
  isEntryForDateKey
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
