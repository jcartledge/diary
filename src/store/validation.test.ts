import { buildDiaryEntry, DiaryEntry, DiaryEntryField } from "./state";
import {
  InvalidDiaryEntryError,
  validateDiaryEntries,
  validateDiaryEntry,
} from "./validation";

describe("validateDiaryEntry", () => {
  it("returns success if entry is valid", () => {
    const validDiaryEntry = buildDiaryEntry();

    expect(validateDiaryEntry(validDiaryEntry)).toEqual({ result: true });
  });

  const fieldNames: DiaryEntryField[] = [
    "whatHappened",
    "wentWell",
    "couldBeImproved",
    "notWell",
    "risk",
  ];

  fieldNames.forEach((fieldName) => {
    it(`returns an error if ${fieldName} is missing`, () => {
      const invalidDiaryEntry = buildDiaryEntry();
      delete invalidDiaryEntry[fieldName];

      expect(validateDiaryEntry(invalidDiaryEntry)).toEqual({
        error: expect.any(InvalidDiaryEntryError),
      });
    });

    it(`returns an error if ${fieldName} is not a string`, () => {
      const invalidDiaryEntry = buildDiaryEntry();
      invalidDiaryEntry[fieldName] = (123 as any) as string;

      expect(validateDiaryEntry(invalidDiaryEntry)).toEqual({
        error: expect.any(InvalidDiaryEntryError),
      });
    });
  });

  it("returns an error if date is not in the correct format", () => {
    const invalidDiaryEntry = buildDiaryEntry();
    invalidDiaryEntry.date = "asdfg";

    expect(validateDiaryEntry(invalidDiaryEntry)).toEqual({
      error: expect.any(InvalidDiaryEntryError),
    });
  });

  it("returns an error if input is not an object", () => {
    const invalidDiaryEntry = "nothing";

    expect(
      validateDiaryEntry((invalidDiaryEntry as any) as DiaryEntry)
    ).toEqual({
      error: expect.any(InvalidDiaryEntryError),
    });
  });
});

describe("validateDiaryEntries", () => {
  it("returns true if all entries are valid", () => {
    const entries = [buildDiaryEntry(), buildDiaryEntry()];

    expect(validateDiaryEntries(entries)).toEqual({ result: true });
  });

  it("returns an error if any of the entries are not valid", () => {
    const invalidDiaryEntry = buildDiaryEntry();
    delete invalidDiaryEntry.date;
    const entries = [buildDiaryEntry(), invalidDiaryEntry];

    expect(validateDiaryEntries(entries)).toEqual({
      error: expect.any(InvalidDiaryEntryError),
    });
  });
});
