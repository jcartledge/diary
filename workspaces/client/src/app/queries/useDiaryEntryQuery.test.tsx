import { renderHook, waitFor } from "@testing-library/react";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { wrap } from "souvlaki";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { useDiaryEntryQuery } from "./useDiaryEntryQuery";

describe("useDiaryEntryQuery", () => {
  it("returns response.json", async () => {
    const { result } = renderHook(() => useDiaryEntryQuery("good-mock"), {
      wrapper: wrap(withQueryClient()),
    });

    await waitFor(() =>
      expect(result.current.data.diaryEntry).toEqual(buildDiaryEntry())
    );
  });

  it("returns an error if fetch fails", async () => {
    const { result } = renderHook(() => useDiaryEntryQuery("missing-mock"), {
      wrapper: wrap(withQueryClient()),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
