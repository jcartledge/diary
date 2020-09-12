import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import {
  buildDiaryEntryContextValue,
  DiaryEntryContext,
} from "context/DiaryEntryContext";
import { LocaleContext } from "context/LocaleContext";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import DiaryHeader from "./DiaryHeader";

describe("DiaryHeader", () => {
  it("shows the date italicised if the entry has unsaved changes", async () => {
    const mockClient = createMockClient();
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
      expect(diaryHeader.container.querySelector("em")).toBeInTheDocument()
    );
  });

  it(`doesn't show the date italicised if the entry has no unsaved changes`, async () => {
    const mockClient = createMockClient();
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
      expect(diaryHeader.container.querySelector("em")).not.toBeInTheDocument()
    );
  });
});
