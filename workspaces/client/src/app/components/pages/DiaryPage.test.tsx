import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withDiaryEntry } from "app/context/diaryEntry/DiaryEntryContext.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withPageRoute } from "test/wrappers/withPageRoute";
import { describe, expect, it, vi } from "vitest";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrap(withPageRoute("ASDF")),
    });

    expect(screen.queryByText("Error")).not.toBe(null);
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
    const queryMock = vi.fn(({ date }) =>
      Promise.resolve({
        data: { diaryEntry: diaryEntries[date] ?? buildDiaryEntry() },
      })
    );

    render(
      <>
        <DiaryPage />
      </>,
      {
        wrapper: wrap(
          withPageRoute(today.getKey()),
          withLocale("en-AU"),
          withDate(today),
          withApollo(buildMockApolloClient({}, { queryMock })),
          withDiaryEntry()
        ),
      }
    );

    await waitFor(() => {
      expect(screen.queryByText("Today's entry")).toBeInTheDocument();
      expect(screen.queryByText("Yesterday's entry")).not.toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole("link", { name: "prev" }));

    await waitFor(() => {
      expect(screen.queryByText("Yesterday's entry")).toBeInTheDocument();
      expect(screen.queryByText("Today's entry")).not.toBeInTheDocument();
    });
  });
});
