import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrapWithLocale } from "app/context/locale/LocaleContext.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { mockGetDiaryEntry } from "test/mocks/mockDiaryEntry";
import { wrapWithAuth0 } from "test/wrappers/wrapWithAuth0";
import { withPageRouteForDate } from "test/wrappers/withPageRouteForDate";
import { wrapWithQueryClient } from "test/wrappers/wrapWithQueryClient";
import { describe, expect, it } from "vitest";
import DiaryPage from "./DiaryPage";
import { composeWrappers } from "lib/util/composeWrappers";

describe("DiaryPage", () => {
  const wrappers = (date: string) =>
    composeWrappers(
      wrapWithLocale("en-AU"),
      wrapWithQueryClient(),
      wrapWithAuth0({ isAuthenticated: true }),
      withPageRouteForDate(date),
    );

  it("shows an error page if an invalid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrappers("not a date!!!@"),
    });

    expect(screen.queryByText("Error")).toBeInTheDocument();
  });

  it("doesn't show an error if a valid date is supplied", () => {
    render(<DiaryPage />, {
      wrapper: wrappers("2022-08-12"),
    });

    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  it("Navigates between dates and shows the correct entries", async () => {
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    mockGetDiaryEntry({ whatHappened: "Today's entry" }, today.getKey());
    mockGetDiaryEntry(
      { whatHappened: "Yesterday's entry" },
      yesterday.getKey(),
    );
    render(<DiaryPage />, {
      wrapper: wrappers(today.getKey()),
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
