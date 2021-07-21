import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { DiaryDate } from "util/date";
import { withLocale } from "../testWrappers";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("retrieves the diary entry for the correct date when changing dates", async () => {
    const today = new DiaryDate();
    const yesterday = today.getPrevious();

    const requestHandler = jest.fn();
    const mockClient = createMockClient();
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, requestHandler);

    const diaryPage = render(<DiaryPage />, {
      wrapper: wrap(withLocale("en-AU"), withApollo(mockClient)),
    });
    await waitFor(() => {
      // Need this waitFor to prevent the apollo hook from causing an act warning.
    });

    expect(requestHandler).toHaveBeenCalledWith({ date: today.getKey() });
    requestHandler.mockReset();

    await act(async () => {
      userEvent.click(diaryPage.getByRole("button", { name: "prev" }));
    });

    expect(requestHandler).toHaveBeenCalledWith({ date: yesterday.getKey() });
    requestHandler.mockReset();

    // From cache:
    await act(async () => {
      userEvent.click(diaryPage.getByRole("button", { name: "next" }));
    });
    expect(requestHandler).toHaveBeenCalledWith({ date: today.getKey() });
  });
});
