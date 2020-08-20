import { convertDateToEntryKey } from "./convertDateToEntryKey";

describe("convertDateToEntryKey", () => {
  it("converts a date object to a string representing the date part only", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));

    expect(convertDateToEntryKey(date)).toEqual("2010-01-01");
  });
});
