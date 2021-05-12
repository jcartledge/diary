import { ApolloProvider } from "@apollo/client";
import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleContext } from "context/LocaleContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import { DiaryDate } from "util/date";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("retrieves the diary entry for the correct date when changing dates", async () => {
    const today = new DiaryDate();
    const yesterday = today.getPrevious();

    const requestHandler = jest.fn();
    const mockClient = createMockClient();
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, requestHandler);

    const diaryPage = render(
      <ApolloProvider client={mockClient}>
        <LocaleContext.Provider value="en-AU">
          <DiaryPage />
        </LocaleContext.Provider>
      </ApolloProvider>
    );
    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
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
