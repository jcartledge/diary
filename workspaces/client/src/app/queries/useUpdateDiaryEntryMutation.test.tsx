import { renderHook, waitFor } from "@testing-library/react";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { rest } from "msw";
import { wrap } from "souvlaki";
import { diaryEntryUriTemplate } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import { useUpdateDiaryEntryMutation } from "./useUpdateDiaryEntryMutation";

describe("useUpdateDiaryEntryMutation", () => {
  it("returns the updated entry", async () => {
    const date = "2022-08-14";
    const diaryEntry = buildDiaryEntry({ date });

    const { result } = renderHook(useUpdateDiaryEntryMutation, {
      wrapper: wrap(withQueryClient()),
    });
    result.current.mutate(diaryEntry);

    await waitFor(() =>
      expect(result.current.data?.diaryEntry).toEqual(diaryEntry)
    );
  });

  it("returns an error if fetch fails", async () => {
    server.use(
      rest.post(diaryEntryUriTemplate, (_, res, ctx) => res(ctx.status(404)))
    );

    const { result } = renderHook(useUpdateDiaryEntryMutation, {
      wrapper: wrap(withQueryClient()),
    });
    result.current.mutate(buildDiaryEntry({ date: "TEST" }));

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
