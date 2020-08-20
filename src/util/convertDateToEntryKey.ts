export const convertDateToEntryKey = (date: Date): string =>
  date.toISOString().substring(0, 10);
