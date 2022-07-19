import { isValidDate } from "iso-datestring-validator";

export class DiaryDate {
  private date: Date;

  constructor(date?: Date) {
    this.date = date ?? new Date();
  }

  public getKey() {
    return DiaryDate.convertDateToEntryKey(this.date);
  }

  public getPrevious() {
    return new DiaryDate(DiaryDate.decrementDate(this.date));
  }

  public getNext() {
    return new DiaryDate(DiaryDate.incrementDate(this.date));
  }

  public getFormatted(locale: string) {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(this.date);
  }

  public isToday() {
    return DiaryDate.dateIsToday(this.date);
  }

  public static from(isoDateString: string) {
    return isValidDate(isoDateString)
      ? { result: new DiaryDate(new Date(isoDateString)) }
      : { error: true };
  }

  private static convertDateToEntryKey(date: Date) {
    return date.toISOString().substring(0, 10);
  }

  private static decrementDate(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }

  private static incrementDate(date: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }

  private static dateIsToday(date: Date) {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }
}
