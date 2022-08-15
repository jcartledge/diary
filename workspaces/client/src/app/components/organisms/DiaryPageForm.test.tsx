import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { withDiaryEntry } from "app/context/diaryEntry/DiaryEntryContextProvider.testWrapper";
import { Toggles } from "config";
import { withToggle } from "lib/toggles/TogglesProvider.testWrapper";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import {
  buildDiaryEntryMutationMock,
  buildDiaryEntryQueryMock,
  buildMockApolloClient,
} from "test/buildMockApolloClient";
import {
  mockGetDiaryEntry,
  mockPostDiaryEntry,
} from "test/mocks/mockDiaryEntry";
import { withQueryClient } from "test/wrappers/withQueryClient";
import { describe, expect, it } from "vitest";
import DiaryPageForm from "./DiaryPageForm";

describe("DiaryPageForm - old backend", () => {
  it("renders the diary content from apollo", async () => {
    render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(
          buildMockApolloClient({
            whatHappened: "Lots",
            wentWell: "Nothing went well",
            couldBeImproved: "Everything",
            notWell: "Too many arguments",
            risk: "More arguments",
          })
        ),
        withDate(),
        withDiaryEntry()
      ),
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

  it("calls the apollo query with the date from the context", async () => {
    const date = new DiaryDate().getPrevious();
    const queryMock = buildDiaryEntryQueryMock();

    render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient({}, { queryMock })),
        withDate(date),
        withDiaryEntry()
      ),
    });

    expect(queryMock).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });

  it("calls the apollo mutation with the updated content to update the entry", async () => {
    const date = new DiaryDate();
    const mutationMock = buildDiaryEntryMutationMock();
    const diaryEntry = buildDiaryEntry();

    const user = userEvent.setup();
    render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient(diaryEntry, { mutationMock })),
        withDate(date),
        withDiaryEntry({ saveTimeoutInterval: 20 })
      ),
    });

    await act(async () => {
      await user.type(
        screen.getByLabelText(/What happened/),
        "Nothing happened"
      );
    });

    await waitFor(() =>
      expect(mutationMock).toHaveBeenCalledWith({
        diaryEntry: {
          ...diaryEntry,
          whatHappened: "Nothing happened",
        },
      })
    );
  });
});

describe("DiaryPageForm - new backend", () => {
  const wrappersForNewBackend = (date: DiaryDate = new DiaryDate()) =>
    wrap(
      withToggle(Toggles.NEW_BACKEND),
      withQueryClient(),
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
      wrapper: wrappersForNewBackend(),
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

    render(<DiaryPageForm />, { wrapper: wrappersForNewBackend(date) });

    await waitFor(() => {
      const req = spy.mock.calls[0][0];
      expect(req.params.date).toEqual(date.getKey());
    });
  });

  it("saves the updated content to update the entry", async () => {
    mockPostDiaryEntry();

    const user = userEvent.setup();
    render(<DiaryPageForm />, { wrapper: wrappersForNewBackend() });

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
