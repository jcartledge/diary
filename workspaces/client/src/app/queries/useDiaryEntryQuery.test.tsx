import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { renderHook, waitFor } from "@testing-library/react";
import { http } from "msw";
import { diaryEntryUriTemplate } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import { useDiaryEntryQuery } from "./useDiaryEntryQuery";
import { composeWrappers } from "lib/util/composeWrappers";
import { http403, http404 } from "test/httpError";

const wrapper = composeWrappers(
  wrapWithQueryClient(),
  wrapWithAuth0({ isAuthenticated: true }),
);

describe("useDiaryEntryQuery", () => {
  it("returns response.json", async () => {
    const date = "2022-08-14";
    const { result } = renderHook(() => useDiaryEntryQuery(date), { wrapper });

    await waitFor(() => {
      return expect(result.current.data?.diaryEntry).toEqual(
        buildDiaryEntry({ date }),
      );
    });
  });

  it("returns an error if fetch responds with 404", async () => {
    server.use(http.get(diaryEntryUriTemplate, http404));

    const { result } = renderHook(() => useDiaryEntryQuery("TEST"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.error?.message).toEqual("Not Found");
    });
  });

  it("returns an error if fetch responds with 403", async () => {
    server.use(http.get(diaryEntryUriTemplate, http403));

    const { result } = renderHook(() => useDiaryEntryQuery("TEST"), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.error?.message).toEqual("Forbidden");
    });
  });

  it("returns an error if the response is not a valid diaryEntry", async () => {
    server.use(
      http.get(
        diaryEntryUriTemplate,
        () => new Response(JSON.stringify({ diaryEntry: "not a diary entry" })),
      ),
    );

    const { result } = renderHook(() => useDiaryEntryQuery("TEST"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
