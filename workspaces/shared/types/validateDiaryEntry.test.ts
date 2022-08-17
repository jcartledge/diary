import { withError, withResult } from "@diary/shared/ResultOrError";
import { describe, expect, it } from "vitest";
import { buildDiaryEntry } from "./diaryEntry";
import { validateDiaryEntry } from "./validateDiaryEntry";

describe("validateDiaryEntry", () => {
  it("returns a valid diary entry", () => {
    const initialDiaryEntry = buildDiaryEntry({ whatHappened: "test" });
    const result = validateDiaryEntry(initialDiaryEntry);

    withError(result, ({ message }) => expect.fail(message));
    withResult(result, (diaryEntry) =>
      expect(diaryEntry).toEqual(initialDiaryEntry)
    );
  });
});
