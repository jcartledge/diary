import { convertDateToEntryKey, decrementDate, incrementDate } from "./date";

describe("convertDateToEntryKey", () => {
  it("converts a date object to a string representing the date part only", () => {
    const date = new Date(Date.UTC(2010, 0, 1, 12, 0, 0));

    expect(convertDateToEntryKey(date)).toEqual("2010-01-01");
  });
});

describe("decrementDate", () => {
  it("return a date 1 day before the input", () => {
    const date = new Date(Date.UTC(2020, 3, 22, 12, 0, 0));
    const decrementedDate = decrementDate(date);

    expect(decrementedDate.getFullYear()).toEqual(2020);
    expect(decrementedDate.getMonth()).toEqual(3);
    expect(decrementedDate.getDate()).toEqual(21);
  });
});

describe("incrementDate", () => {
  it("return a date 1 day after the input", () => {
    const date = new Date(Date.UTC(2020, 3, 22, 12, 0, 0));
    const incrementedDate = incrementDate(date);

    expect(incrementedDate.getFullYear()).toEqual(2020);
    expect(incrementedDate.getMonth()).toEqual(3);
    expect(incrementedDate.getDate()).toEqual(23);
  });
});
