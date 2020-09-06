export const convertDateToEntryKey = (date: Date) =>
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

export const dateIsToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export class DiaryDate {
  private date: Date;

  constructor(date?: Date) {
    this.date = date ?? new Date();
  }

  getKey() {
    return convertDateToEntryKey(this.date);
  }

  // getDate() {
  //   return this.date;
  // }

  getPrevious() {
    return new DiaryDate(decrementDate(this.date));
  }

  getNext() {
    return new DiaryDate(incrementDate(this.date));
  }

  getFormatted(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(this.date);
  }

  isToday() {
    return dateIsToday(this.date);
  }
}
