import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import { act } from "react-dom/test-utils";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { DIARY_ENTRY_QUERY } from "../../graphql/queries";
import { buildPageRoute } from "../../routes";
import { withDate, withDiaryEntry, withLocale } from "../../testWrappers";
import { buildDiaryEntry } from "../../util/buildDiaryEntry";
import { DiaryDate } from "../../util/date";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrap(withRoute(buildPageRoute(), { isoDateString: "ASDF" })),
    });

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("shows the entry for the date from the route", async () => {
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    const diaryEntries = {
      [today.getKey()]: buildDiaryEntry({
        whatHappened: "Today's entry",
      }),
      [yesterday.getKey()]: buildDiaryEntry({
        whatHappened: "Yesterday's entry",
      }),
    };
    const mockClient = createMockClient();
    mockClient.setRequestHandler(
      DIARY_ENTRY_QUERY,
      jest.fn(({ date }) =>
        Promise.resolve({
          data: { diaryEntry: diaryEntries[date] },
        })
      )
    );

    render(<DiaryPage />, {
      wrapper: wrap(
        withRoute(buildPageRoute(), { isoDateString: today.getKey() }),
        withLocale("en-AU"),
        withDate(today),
        withApollo(mockClient),
        withDiaryEntry()
      ),
    });

    await waitFor(() => {
      // required to prevent act warnings
    });

    expect(screen.getByText("Today's entry")).toBeInTheDocument();
    expect(screen.queryByText("Yesterday's entry")).not.toBeInTheDocument();

    act(() => {
      const prevButton = screen.getByRole("button", { name: "prev" });
      userEvent.click(prevButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Yesterday's entry")).toBeInTheDocument();
      expect(screen.queryByText("Today's entry")).not.toBeInTheDocument();
    });
  });
});
