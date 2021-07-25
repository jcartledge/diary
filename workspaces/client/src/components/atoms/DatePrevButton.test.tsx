import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DIARY_ENTRY_QUERY } from "graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { buildPageRoute } from "routes";
import { DiaryEntry } from "server/src/resolvers-types";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { withDate } from "testWrappers";
import { buildDiaryEntry } from "util/buildDiaryEntry";
import { DiaryDate } from "util/date";
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
    const date = new DiaryDate();
    const datePrevButton = render(<DatePrevButton />, {
      wrapper: wrap(
        withApollo(),
        withDate(date),
        withRoute("", {}, onPathChange)
      ),
    });

    await act(async () => {
      userEvent.click(datePrevButton.getByRole("button", { name: "prev" }));
    });

    expect(onPathChange).toHaveBeenCalledWith(
      buildPageRoute(date.getPrevious().getKey())
    );
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockClient();

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).not.toHaveClass("font-bold"));
  });
});
