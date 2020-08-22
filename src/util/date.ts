export const convertDateToEntryKey = (date: Date): string =>
  date.toISOString().substring(0, 10);

export const decrementDate = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );

export const incrementDate = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
