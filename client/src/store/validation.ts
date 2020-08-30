import { ResultOrError } from "util/types";
import { DiaryEntry, DiaryEntryField } from "./state";

export class InvalidDiaryEntryError extends Error {}

const isDiaryEntryFieldString = (value: any): boolean =>
  typeof value === "string";

const validateDateKey = (
  dateKey: any
): ResultOrError<true, InvalidDiaryEntryError> =>
  /^[\d]{4}-[\d]{2}-[\d]{2}$/.test(String(dateKey))
    ? { result: true }
    : { error: new InvalidDiaryEntryError("date is not in correct format") };

export const validateDiaryEntry = (
  entry: DiaryEntry
): ResultOrError<true, InvalidDiaryEntryError> => {
  const fieldNames: DiaryEntryField[] = [
    "whatHappened",
    "wentWell",
    "couldBeImproved",
    "notWell",
    "risk",
  ];

  const invalidFieldNames = fieldNames.filter(
    (fieldName) => !isDiaryEntryFieldString(entry[fieldName])
  );

  if (invalidFieldNames.length > 0) {
    return {
      error: new InvalidDiaryEntryError(
        `One or more fields were undefined or not string: ${invalidFieldNames.join(
          ", "
        )}`
      ),
    };
  }

  return validateDateKey(entry.date);
};

export const validateDiaryEntries = (
  entries: DiaryEntry[]
): ResultOrError<true, InvalidDiaryEntryError> =>
  typeof entries === "object" &&
  "every" in entries &&
  entries.every((entry) => "result" in validateDiaryEntry(entry))
    ? { result: true }
    : { error: new InvalidDiaryEntryError("Entries are not in valid format") };
