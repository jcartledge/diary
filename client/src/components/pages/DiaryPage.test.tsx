import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateContextProvider from "context/DateContext";
import { LocaleContext } from "context/LocaleContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import React from "react";
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
          <DateContextProvider>
            <DiaryPage />
          </DateContextProvider>
        </LocaleContext.Provider>
      </ApolloProvider>
    );
    await waitFor(() => {});

    expect(requestHandler).toHaveBeenCalledWith({ date: today.getKey() });
    requestHandler.mockReset();

    userEvent.click(diaryPage.getByRole("button", { name: "prev" }));
    await waitFor(() => {});
    expect(requestHandler).toHaveBeenCalledWith({ date: yesterday.getKey() });
    requestHandler.mockReset();

    // From cache:
    userEvent.click(diaryPage.getByRole("button", { name: "next" }));
    await waitFor(() => {});
    expect(requestHandler).toHaveBeenCalledWith({ date: today.getKey() });
  });
});
