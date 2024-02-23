import { act, renderHook, waitFor } from "@testing-library/react";
import { mockConsoleError, unmockConsoleError } from "test/mockConsoleError";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import { withDiaryEntryContextProvider } from "./DiaryEntryContextProvider.testWrapper";
import { useDiaryEntry } from "./useDiaryEntry";
import { composeWrappers } from "lib/util/composeWrappers";

const wrappers = () => ({
  wrapper: composeWrappers(
    wrapWithQueryClient(),
    withDiaryEntryContextProvider({ saveTimeoutInterval: 1 }),
  ),
});

describe("useDiaryEntry", () => {
  it("sets isLoading while loading", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    expect(result.current.isLoading).toBe(true);
  });

  it("sets isLoading false when diaryEntry has loaded", async () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

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
