import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withDiaryEntry } from "app/context/diaryEntry/DiaryEntryContextProvider.testWrapper";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { mockGetDiaryEntry } from "test/mocks/mockDiaryEntry";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import DiaryPageForm from "./DiaryPageForm";

describe("DiaryPageForm", () => {
  const wrappers = (date: DiaryDate = new DiaryDate()) =>
    wrap(
      withQueryClient(),
      withAuth0Wrapper({ isAuthenticated: true }),
      withDate(date),
      withDiaryEntry()
    );

  it("renders the diary content from backend", async () => {
    mockGetDiaryEntry({
      whatHappened: "Lots",
      wentWell: "Nothing went well",
      couldBeImproved: "Everything",
      notWell: "Too many arguments",
      risk: "More arguments",
    });

    render(<DiaryPageForm />, {
      wrapper: wrappers(),
    });

    await waitFor(() => {
      expect(screen.getByLabelText("What happened?")).toHaveTextContent("Lots");
      expect(screen.getByLabelText("Went well")).toHaveTextContent(
        "Nothing went well"
      );
      expect(screen.getByLabelText("Could be improved")).toHaveTextContent(
        "Everything"
      );
      expect(screen.getByLabelText("Didn't go well")).toHaveTextContent(
        "Too many arguments"
      );
      expect(screen.getByLabelText("Might be a risk")).toHaveTextContent(
        "More arguments"
      );
    });
  });

  it("calls the query with the date from the context", async () => {
    const date = new DiaryDate().getPrevious();
    const spy = mockGetDiaryEntry();

    render(<DiaryPageForm />, { wrapper: wrappers(date) });

    await waitFor(() => {
      const req = spy.mock.calls[0][0];
      expect(req.params.date).toEqual(date.getKey());
    });
  });

  it("saves the updated content to update the entry", async () => {
    const user = userEvent.setup();
    render(<DiaryPageForm />, { wrapper: wrappers() });

    await act(async () => {
      await user.type(
        screen.getByLabelText(/What happened/),
        "Nothing happened"
      );
    });

    expect(screen.queryByText("Saving...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Saving...")).not.toBeInTheDocument()
    );
  });
});
