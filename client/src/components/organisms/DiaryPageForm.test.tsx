import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateContextProvider from "context/DateContext";
import { DiaryEntryContextProvider } from "context/DiaryEntryContext";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "graphql/queries";
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
          <DiaryEntryContextProvider>
            <DiaryPageForm />
          </DiaryEntryContextProvider>
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
          <DiaryEntryContextProvider>
            <DiaryPageForm />
          </DiaryEntryContextProvider>
        </DateContextProvider>
      </ApolloProvider>
    );
    // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    await waitFor(() => {});

    expect(diaryEntryQueryHandler).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });

  it("calls the apollo mutation with the updated content to update the entry", async () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));
    const mockClient = createMockClient();

    const diaryEntry = buildDiaryEntry();
    mockClient.setRequestHandler(
      DIARY_ENTRY_QUERY,
      jest.fn().mockResolvedValue({ data: { diaryEntry } })
    );
    const updateDiaryEntryMutationHandler = jest
      .fn()
      .mockResolvedValueOnce({ data: { diaryEntry } });
    mockClient.setRequestHandler(
      UPDATE_DIARY_ENTRY_MUTATION,
      updateDiaryEntryMutationHandler
    );

    const diaryPageForm = render(
      <ApolloProvider client={mockClient}>
        <DateContextProvider date={date}>
          <DiaryEntryContextProvider saveTimeoutInterval={10}>
            <DiaryPageForm />
          </DiaryEntryContextProvider>
        </DateContextProvider>
      </ApolloProvider>
    );
    // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    await waitFor(() => {});

    await userEvent.type(
      diaryPageForm.getByLabelText(/What happened/),
      "Nothing happened"
    );

    await waitFor(() =>
      expect(updateDiaryEntryMutationHandler).toHaveBeenCalledWith({
        diaryEntry: {
          ...diaryEntry,
          whatHappened: "Nothing happened",
        },
      })
    );
  });
});
