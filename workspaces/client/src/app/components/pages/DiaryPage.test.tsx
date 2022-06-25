import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/DateContext.testWrapper";
import { withDiaryEntry } from "app/context/DiaryEntryContext.testWrapper";
import { withLocale } from "app/context/LocaleContext.testWrapper";
import { DIARY_ENTRY_QUERY } from "app/graphql/queries";
import { buildPageRoute } from "app/routes/buildPageRoute";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { DiaryDate } from "lib/util/date";
import { createMockClient } from "mock-apollo-client";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "test/wrappers/withRoute";
import { describe, expect, it, vi } from "vitest";
import DiaryPage from "./DiaryPage";

describe("DiaryPage", () => {
  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrap(withRoute(buildPageRoute(), { isoDateString: "ASDF" })),
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
    const mockClient = createMockClient();
    mockClient.setRequestHandler(
      DIARY_ENTRY_QUERY,
      vi.fn(({ date }) =>
        Promise.resolve({
          data: { diaryEntry: diaryEntries[date] ?? buildDiaryEntry() },
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
      expect(screen.queryByText("Today's entry")).not.toBe(null);
      expect(screen.queryByText("Yesterday's entry")).toBe(null);
    });

    await userEvent.click(screen.getByRole("button", { name: "prev" }));

    await waitFor(() => {
      expect(screen.queryByText("Yesterday's entry")).not.toBeNull();
      expect(screen.queryByText("Today's entry")).toBeNull();
    });
  });
});
