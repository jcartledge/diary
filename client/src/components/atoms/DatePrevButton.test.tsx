import { ApolloProvider } from "@apollo/client";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateContextProvider, {
  buildDateContextValue,
  DateContext,
} from "context/DateContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry } from "util/types";
import DatePrevButton from "./DatePrevButton";

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

describe("DatePrevButton", () => {
  it("decrements the date in the context", async () => {
    const mockDateContextValue = buildDateContextValue({
      decrementDate: jest.fn(),
    });

    const datePrevButton = render(
      <ApolloProvider client={buildMockClient()}>
        <DateContext.Provider value={mockDateContextValue}>
          <DatePrevButton />
        </DateContext.Provider>
      </ApolloProvider>
    );
    await act(async () => {
      userEvent.click(datePrevButton.getByRole("button", { name: "prev" }));
    });

    expect(mockDateContextValue.decrementDate).toHaveBeenCalledTimes(1);
  });

  it("decrements once for each click", async () => {
    const mockDateContextValue = buildDateContextValue({
      decrementDate: jest.fn(),
    });

    const datePrevButton = render(
      <ApolloProvider client={buildMockClient()}>
        <DateContext.Provider value={mockDateContextValue}>
          <DatePrevButton />
        </DateContext.Provider>
      </ApolloProvider>
    );
    await act(async () => {
      const prevButton = datePrevButton.getByRole("button", { name: "prev" });
      userEvent.click(prevButton);
      userEvent.click(prevButton);
      userEvent.click(prevButton);
    });

    expect(mockDateContextValue.decrementDate).toHaveBeenCalledTimes(3);
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(
      <ApolloProvider client={mockClient}>
        <DateContextProvider>
          <DatePrevButton />
        </DateContextProvider>
      </ApolloProvider>
    );
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockClient();

    render(
      <ApolloProvider client={mockClient}>
        <DateContextProvider>
          <DatePrevButton />
        </DateContextProvider>
      </ApolloProvider>
    );
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).not.toHaveClass("font-bold"));
  });
});
