import { ApolloProvider } from "@apollo/client";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { buildDateContextValue, DateContext } from "context/DateContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { DiaryDate } from "util/date";
import { buildDiaryEntry } from "util/types";
import DateNextButton from "./DateNextButton";

const buildMockClient = (
  diaryEntry: Partial<DiaryEntry> = {}
): MockApolloClient => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(
    DIARY_ENTRY_QUERY,
    jest.fn().mockResolvedValue({
      data: { diaryEntry: buildDiaryEntry(diaryEntry) },
    })
  );
  return mockClient;
};

describe("DateNextButton", () => {
  it("increments the date in the context", async () => {
    const mockDateContextValue = buildDateContextValue({
      date: new DiaryDate().getPrevious(),
      incrementDate: jest.fn(),
    });

    const dateNextButton = render(
      <ApolloProvider client={buildMockClient()}>
        <DateContext.Provider value={mockDateContextValue}>
          <DateNextButton />
        </DateContext.Provider>
      </ApolloProvider>
    );

    await act(async () =>
      userEvent.click(dateNextButton.getByRole("button", { name: "next" }))
    );

    expect(mockDateContextValue.incrementDate).toHaveBeenCalledTimes(1);
  });

  it("increments once for each click", async () => {
    const mockDateContextValue = buildDateContextValue({
      date: new DiaryDate().getPrevious().getPrevious().getPrevious(),
      incrementDate: jest.fn(),
    });

    const dateNextButton = render(
      <ApolloProvider client={buildMockClient()}>
        <DateContext.Provider value={mockDateContextValue}>
          <DateNextButton />
        </DateContext.Provider>
      </ApolloProvider>
    );
    await act(async () => {
      const nextButton = dateNextButton.getByRole("button", { name: "next" });
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
    });

    expect(mockDateContextValue.incrementDate).toHaveBeenCalledTimes(3);
  });

  it("does not increment past the current date", async () => {
    const mockDateContextValue = buildDateContextValue({
      date: new DiaryDate(),
      incrementDate: jest.fn(),
    });

    const dateNextButton = render(
      <ApolloProvider client={buildMockClient()}>
        <DateContext.Provider value={mockDateContextValue}>
          <DateNextButton />
        </DateContext.Provider>
      </ApolloProvider>
    );

    const nextButton = dateNextButton.getByRole("button", { name: "next" });
    expect(nextButton).toBeDisabled();

    await act(async () => {
      userEvent.click(nextButton);
    });

    expect(mockDateContextValue.incrementDate).not.toHaveBeenCalled();
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const mockDateContextValue = buildDateContextValue({
      date: new DiaryDate().getPrevious(),
    });
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(
      <ApolloProvider client={mockClient}>
        <DateContext.Provider value={mockDateContextValue}>
          <DateNextButton />
        </DateContext.Provider>
      </ApolloProvider>
    );
    const nextButton = screen.getByRole("button", { name: "next" });

    await waitFor(() => expect(nextButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const mockDateContextValue = buildDateContextValue({
      date: new DiaryDate().getPrevious(),
    });
    const mockClient = buildMockClient();

    render(
      <ApolloProvider client={mockClient}>
        <DateContext.Provider value={mockDateContextValue}>
          <DateNextButton />
        </DateContext.Provider>
      </ApolloProvider>
    );
    const nextButton = screen.getByRole("button", { name: "next" });

    await waitFor(() => expect(nextButton).not.toHaveClass("font-bold"));
  });
});
