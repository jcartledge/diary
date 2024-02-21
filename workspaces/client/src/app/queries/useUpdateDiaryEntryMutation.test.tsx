import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { diaryEntryUriTemplate } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import { useUpdateDiaryEntryMutation } from "./useUpdateDiaryEntryMutation";
import { composeWrappers } from "lib/util/composeWrappers";

const wrapper = composeWrappers(
  wrapWithQueryClient(),
  wrapWithAuth0({ isAuthenticated: true })
);

describe("useUpdateDiaryEntryMutation", () => {
  it("returns the updated entry", async () => {
    const date = "2022-08-14";
    const diaryEntry = buildDiaryEntry({ date });

    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate(diaryEntry);

    await waitFor(() =>
      expect(result.current.data?.diaryEntry).toEqual(diaryEntry)
    );
  });

  it("returns an error if fetch fails", async () => {
    server.use(
      rest.post(diaryEntryUriTemplate, (_, res, ctx) => res(ctx.status(404)))
    );

    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate(buildDiaryEntry({ date: "2022-08-17" }));

    await waitFor(() =>
      expect(result.current.error).toEqual(
        expect.objectContaining({ message: "Not Found" })
      )
    );
  });

  it("returns an error if fetch fails", async () => {
    server.use(
      rest.post(diaryEntryUriTemplate, (_, res, ctx) => res(ctx.status(403)))
    );

    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate(buildDiaryEntry({ date: "2022-08-17" }));

    await waitFor(() =>
      expect(result.current.error).toEqual(
        expect.objectContaining({ message: "Forbidden" })
      )
    );
  });

  it("returns an error if the diaryEntry is not valid", async () => {
    const { result } = renderHook(useUpdateDiaryEntryMutation, { wrapper });
    result.current.mutate({ date: "2022-08-17" } as DiaryEntry);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
