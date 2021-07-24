import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { buildDiaryEntry } from "util/buildDiaryEntry";
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
  it("links to the previous date", async () => {
    const onPathChange = jest.fn();
    const datePrevButton = render(
      <DatePrevButton />, {
        wrapper: wrap(
          withApollo(buildMockClient()),
          withRoute('/page/:isoDateString', { isoDateString: '2021-07-24' }, onPathChange)
        )
      }, 
    );
    
    await act(async () => {
      userEvent.click(datePrevButton.getByRole("button", { name: "prev" }));
    });

    expect(onPathChange).toHaveBeenCalledWith('/page/2021-07-23');
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(
      <DatePrevButton />, {
        wrapper: wrap(
          withApollo(mockClient),
          withRoute('/page/:isoDateString', { isoDateString: '2021-07-24' })
        )
      }, 
    );
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockClient();

    render(
      <DatePrevButton />, {
        wrapper: wrap(
          withApollo(mockClient),
          withRoute('/page/:isoDateString', { isoDateString: '2021-07-24' })
        )
      }
    );
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).not.toHaveClass("font-bold"));
  });
});
