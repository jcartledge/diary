import { renderHook } from "@testing-library/react";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { useMount } from "test/useMount";
import { describe, expect, it } from "vitest";
import { useDiaryEntry } from "./DiaryEntryContext";
import { withDiaryEntry } from "./DiaryEntryContext.testWrapper";

const wrappers = () => ({
  wrapper: wrap(
    withApollo(buildMockApolloClient()),
    withDiaryEntry({ saveTimeoutInterval: 1 })
  ),
});

describe("useDiaryEntry", () => {
  it("sets isDirty to false when an entry is loaded and no updates have taken place", () => {
    const { result } = renderHook(useDiaryEntry, wrappers());

    expect(result.current.isDirty).toBe(false);
  });

  it("sets isDirty to true when an update changes a field value", () => {
    const { result } = renderHook(() => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")("asd"));
      return { isDirty };
    }, wrappers());

    expect(result.current.isDirty).toBe(true);
  });

  it("does not set isDirty to true when an update does not change the entry", () => {
    const { result } = renderHook(() => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")(""));
      return { isDirty };
    }, wrappers());

    expect(result.current.isDirty).toBe(false);
  });

  it("does not set isDirty to false when an update does not change the entry", () => {
    const { result } = renderHook(() => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => {
        updateDiaryEntry("whatHappened")("foo");
        updateDiaryEntry("whatHappened")("foo");
      });
      return { isDirty };
    }, wrappers());

    expect(result.current.isDirty).toBe(true);
  });

  it("sets isDirty to false when the entry has been saved", () => {
    const { result } = renderHook(() => {
      const { isDirty, updateDiaryEntry } = useDiaryEntry();
      useMount(() => updateDiaryEntry("whatHappened")("foo"));
      return { isDirty };
    }, wrappers());

    expect(result.current.isDirty).toBe(false);
  });

  it("throws an error if there is no diary entry context", () => {
    expect(() => renderHook(useDiaryEntry)).toThrowError();
  });
});
