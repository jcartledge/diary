import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { DIARY_ENTRY_QUERY } from "../../graphql/queries";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers/withDate";
import { withRoute } from "../../testWrappers/withRoute";
import { buildDiaryEntry } from "../../util/buildDiaryEntry";
import { DiaryDate } from "../../util/date";
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

const getNextButton = () => screen.getByRole("button", { name: "next" });

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    render(<DateNextButton />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withDate(yesterday),
        withRoute("", {}, onPathChange)
      ),
    });

    act(() => userEvent.click(getNextButton()));

    expect(onPathChange).toHaveBeenCalledWith(buildPageRoute(today.getKey()));
  });

  it("does not increment past the current date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();

    render(<DateNextButton />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withDate(today),
        withRoute("", {}, onPathChange)
      ),
    });

    expect(getNextButton()).toBeDisabled();

    await act(async () => {
      userEvent.click(getNextButton());
    });

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date), withRoute()),
    });

    await waitFor(() => expect(getNextButton()).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockClient();

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date), withRoute()),
    });

    await waitFor(() => expect(getNextButton()).not.toHaveClass("font-bold"));
  });
});
