import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import {
  buildDiaryEntryContextValue,
  DiaryEntryContext,
} from "context/DiaryEntryContext";
import { LocaleContext } from "context/LocaleContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import { buildDiaryEntry } from "util/buildDiaryEntry";
import DiaryHeader from "./DiaryHeader";

const buildMockClient = () => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(DIARY_ENTRY_QUERY, () =>
    Promise.resolve({ data: { diaryEntry: buildDiaryEntry() } })
  );
  return mockClient;
};

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const mockClient = buildMockClient();
    const diaryHeader = render(
      <ApolloProvider client={mockClient}>
        <LocaleContext.Provider value="en-AU">
          <DiaryEntryContext.Provider
            value={buildDiaryEntryContextValue({ isDirty: true })}
          >
            <DiaryHeader />
          </DiaryEntryContext.Provider>
        </LocaleContext.Provider>
      </ApolloProvider>
    );

    await waitFor(() =>
      expect(diaryHeader.container.querySelector(".italic")).toBeInTheDocument()
    );
  });

  it(`doesn't show the date italicised if the entry has no unsaved changes`, async () => {
    const mockClient = buildMockClient();
    const diaryHeader = render(
      <ApolloProvider client={mockClient}>
        <LocaleContext.Provider value="en-AU">
          <DiaryEntryContext.Provider
            value={buildDiaryEntryContextValue({ isDirty: false })}
          >
            <DiaryHeader />
          </DiaryEntryContext.Provider>
        </LocaleContext.Provider>
      </ApolloProvider>
    );

    await waitFor(() =>
      expect(
        diaryHeader.container.querySelector(".italic")
      ).not.toBeInTheDocument()
    );
  });
});
