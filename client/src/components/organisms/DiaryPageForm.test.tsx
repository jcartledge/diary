import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import DateContextProvider from "context/DateContext";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import { DiaryDate } from "util/date";
import { buildDiaryEntry } from "util/types";
import DiaryPageForm from "./DiaryPageForm";

describe("DiaryPageForm", () => {
  it("renders the diary content from apollo", async () => {
    const diaryEntry = buildDiaryEntry({
      whatHappened: "Lots",
      wentWell: "Nothing went well",
      couldBeImproved: "Everything",
      notWell: "Too many arguments",
      risk: "More arguments",
    });
    const mockClient = createMockClient();
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, () =>
      Promise.resolve({ data: { diaryEntry } })
    );

    const diary = render(
      <ApolloProvider client={mockClient}>
        <DateContextProvider>
          <DiaryPageForm />
        </DateContextProvider>
      </ApolloProvider>
    );

    expect(await diary.findByLabelText("What happened?")).toHaveTextContent(
      "Lots"
    );
    expect(await diary.findByLabelText("Went well")).toHaveTextContent(
      "Nothing went well"
    );
    expect(await diary.findByLabelText("Could be improved")).toHaveTextContent(
      "Everything"
    );
    expect(await diary.findByLabelText("Didn't go well")).toHaveTextContent(
      "Too many arguments"
    );
    expect(await diary.findByLabelText("Might be a risk")).toHaveTextContent(
      "More arguments"
    );
  });

  it("calls the apollo query with the date from the context", async () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));
    const mockClient = createMockClient();

    const diaryEntryQueryHandler = jest
      .fn()
      .mockResolvedValue({ data: { diaryEntry: buildDiaryEntry() } });
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, diaryEntryQueryHandler);

    render(
      <ApolloProvider client={mockClient}>
        <DateContextProvider date={date}>
          <DiaryPageForm />
        </DateContextProvider>
      </ApolloProvider>
    );
    // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    await waitFor(() => {});

    expect(diaryEntryQueryHandler).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });
});
