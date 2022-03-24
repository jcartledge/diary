import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { wrap } from "souvlaki";
import { DIARY_ENTRY_QUERY } from "../../graphql/queries";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers/withDate";
import { withDiaryEntry } from "../../testWrappers/withDiaryEntry";
import { withLocale } from "../../testWrappers/withLocale";
import { withRoute } from "../../testWrappers/withRoute";
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
    const mocks = [
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date: today.getKey() },
        },
        result: {
          data: {
            diaryEntry: buildDiaryEntry({
              whatHappened: "Today's entry",
            }),
          },
        },
      },
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date: yesterday.getKey() },
        },
        result: {
          data: {
            diaryEntry: buildDiaryEntry({
              whatHappened: "Yesterday's entry",
            }),
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DiaryPage />
      </MockedProvider>,
      {
        wrapper: wrap(
          withRoute(buildPageRoute(), { isoDateString: today.getKey() }),
          withLocale("en-AU"),
          withDate(today),
          withDiaryEntry()
        ),
      }
    );

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
