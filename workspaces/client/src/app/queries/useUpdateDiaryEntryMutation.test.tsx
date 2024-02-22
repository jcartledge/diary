import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { renderHook, waitFor } from "@testing-library/react";
import { http } from "msw";
import { diaryEntryUriTemplate } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import { useUpdateDiaryEntryMutation } from "./useUpdateDiaryEntryMutation";
import { composeWrappers } from "lib/util/composeWrappers";
import { httpError } from "lib/util/httpError";

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
      http.post(diaryEntryUriTemplate, () => httpError(404, 'Not Found'))
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
      http.post(diaryEntryUriTemplate, () => httpError(403, 'Forbidden'))
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
