import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { withDate } from 'testWrappers';
import { buildDiaryEntry } from "util/buildDiaryEntry";
import { DiaryDate } from "util/date";
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
  it("links to the next date", async () => {
    const onPathChange = jest.fn();

    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    const dateNextButton = render(
      <DateNextButton />, {
        wrapper: wrap(
          withApollo(),
          withDate(yesterday),
          withRoute('', {}, onPathChange)
        )
      }, 
    );

    await act(async () =>
      userEvent.click(dateNextButton.getByRole("button", { name: "next" }))
    );

    expect(onPathChange).toHaveBeenCalledWith(`/page/${today.getKey()}`);
  });

  it("does not increment past the current date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();

    const dateNextButton = render(
      <DateNextButton />, {
        wrapper: wrap(
          withApollo(),
          withDate(today),
          withRoute('', {}, onPathChange)
        )
      }, 
    );

    const nextButton = dateNextButton.getByRole("button", { name: "next" });
    expect(nextButton).toBeDisabled();

    await act(async () => {
      userEvent.click(nextButton);
    });

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(
      <DateNextButton />, {
        wrapper: wrap(
          withApollo(mockClient),
          withDate(date),
          withRoute()
        )
      }, 
    );
    const nextButton = screen.getByRole("button", { name: "next" });

    await waitFor(() => expect(nextButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockClient();

    render(
      <DateNextButton />, {
        wrapper: wrap(
          withApollo(mockClient),
          withDate(date),
          withRoute()
        )
      }, 
    );
    const nextButton = screen.getByRole("button", { name: "next" });

    await waitFor(() => expect(nextButton).not.toHaveClass("font-bold"));
  });
});
