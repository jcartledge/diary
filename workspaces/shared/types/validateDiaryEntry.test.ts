import { withError, withResult } from "@diary/shared/ResultOrError";
import { describe, expect, it } from "vitest";
import { buildDiaryEntry } from "./diaryEntry";
import { validateDiaryEntry } from "./validateDiaryEntry";

describe("validateDiaryEntry", () => {
  it("returns a valid diary entry", () => {
    const initialDiaryEntry = buildDiaryEntry({
      date: "2010-11-11",
      whatHappened: "test",
    });
    const result = validateDiaryEntry(initialDiaryEntry);

    withError(result, ({ message }) => expect.fail(message));
    withResult(result, (diaryEntry) =>
      expect(diaryEntry).toEqual(initialDiaryEntry)
    );
  });

  it("fails if the date is not a valid ISO datestring", () => {
    const initialDiaryEntry = buildDiaryEntry();
    const result = validateDiaryEntry(initialDiaryEntry);

    withError(result, ({ message }) =>
      expect(JSON.parse(message)[0].message).toBe(
        "Not a valid ISO string date."
      )
    );
    withResult(result, () =>
      expect.fail("Expected invalid date error, instead received success.")
    );
  });
});
