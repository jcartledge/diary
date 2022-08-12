import { renderHook, waitFor } from "@testing-library/react";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { wrap } from "souvlaki";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { useUpdateDiaryEntryMutation } from "./useUpdateDiaryEntryMutation";

describe("useUpdateDiaryEntryMutation", () => {
  it("returns the updated entry", async () => {
    const diaryEntry = buildDiaryEntry({ date: "good-mock" });

    const { result } = renderHook(
      () => useUpdateDiaryEntryMutation(diaryEntry),
      {
        wrapper: wrap(withQueryClient()),
      }
    );
    result.current.mutate();

    await waitFor(() =>
      expect(result.current.data?.diaryEntry).toEqual(diaryEntry)
    );
  });

  it("returns an error if fetch fails", async () => {
    const { result } = renderHook(
      () =>
        useUpdateDiaryEntryMutation(buildDiaryEntry({ date: "missing-mock" })),
      {
        wrapper: wrap(withQueryClient()),
      }
    );
    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
