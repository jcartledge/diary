import { act, renderHook, waitFor } from "@testing-library/react";
import { wrap } from "souvlaki";
import { mockConsoleError, unmockConsoleError } from "test/mockConsoleError";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { withDiaryEntry } from "./DiaryEntryContextProvider.testWrapper";
import { useDiaryEntry } from "./useDiaryEntry";

const wrappers = () => ({
  wrapper: wrap(withQueryClient(), withDiaryEntry({ saveTimeoutInterval: 1 })),
});

describe("useDiaryEntry", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    expect(result.current.isDirty).toBe(false);
  });

  it("sets isDirty to true when an update changes a field value", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    act(() => result.current.updateDiaryEntry("whatHappened")("asd"));

    expect(result.current.isDirty).toBe(true);
  });

  it("does not set isDirty to true when an update does not change the entry", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    act(() => result.current.updateDiaryEntry("whatHappened")(""));

    expect(result.current.isDirty).toBe(false);
  });

  it("does not set isDirty to false when an update does not change the entry", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    act(() => {
      result.current.updateDiaryEntry("whatHappened")("foo");
      result.current.updateDiaryEntry("whatHappened")("foo");
    });

    expect(result.current.isDirty).toBe(true);
  });

  it("sets isDirty to false when the entry has been saved", async () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    act(() => result.current.updateDiaryEntry("whatHappened")("foo"));

    await waitFor(() => expect(result.current.isDirty).toBe(false));
  });

  it("throws an error if there is no diary entry context", () => {
    mockConsoleError();
    expect(() => renderHook(useDiaryEntry)).toThrowError();
    unmockConsoleError();
  });
});
