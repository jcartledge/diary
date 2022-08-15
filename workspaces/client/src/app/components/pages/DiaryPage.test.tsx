import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withDiaryEntry } from "app/context/diaryEntry/DiaryEntryContextProvider.testWrapper";
import { withLocale } from "app/context/locale/LocaleContext.testWrapper";
import { Toggles } from "config";
import { withToggle } from "lib/toggles/TogglesProvider.testWrapper";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { mockGetDiaryEntry } from "test/mocks/mockDiaryEntry";
import { withPageRouteForDate } from "test/wrappers/withPageRouteForDate";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it, vi } from "vitest";
import DiaryPage from "./DiaryPage";

describe("DiaryPage - old backend", () => {
  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrap(withPageRouteForDate("ASDF")),
    });

    expect(screen.queryByText("Error")).toBeInTheDocument();
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
        data: { diaryEntry: diaryEntries[date] },
      })
    );

    render(<DiaryPage />, {
      wrapper: wrap(
        withPageRouteForDate(today.getKey()),
        withLocale("en-AU"),
        withDate(today),
        withApollo(buildMockApolloClient({}, { queryMock })),
        withDiaryEntry()
      ),
    });

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

describe("DiaryPage - new backend", () => {
  const wrappersForNewBackend = (date: string) =>
    wrap(
      withLocale("en-AU"),
      withToggle(Toggles.NEW_BACKEND),
      withQueryClient(),
      withPageRouteForDate(date)
    );

  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrappersForNewBackend("not a date!!!@"),
    });

    expect(screen.queryByText("Error")).toBeInTheDocument();
  });

  it("doesn't show an error if a valid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrappersForNewBackend("2022-08-12"),
    });

    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  it("Navigates between dates and shows the correct entries", async () => {
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    mockGetDiaryEntry({ whatHappened: "Today's entry" }, today.getKey());
    mockGetDiaryEntry(
      { whatHappened: "Yesterday's entry" },
      yesterday.getKey()
    );
    render(<DiaryPage />, {
      wrapper: wrappersForNewBackend(today.getKey()),
    });

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
