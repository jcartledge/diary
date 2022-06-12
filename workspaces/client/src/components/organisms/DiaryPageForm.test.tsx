import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { describe, expect, it, vi } from "vitest";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "../../graphql/queries";
import { withDate } from "../../testWrappers/withDate";
import { withDiaryEntry } from "../../testWrappers/withDiaryEntry";
import { withRoute } from "../../testWrappers/withRoute";
import { buildDiaryEntry } from "../../util/buildDiaryEntry";
import { DiaryDate } from "../../util/date";
import DiaryPageForm from "./DiaryPageForm";

describe("DiaryPageForm", () => {
  it("renders the diary content from apollo", async () => {
    const diaryEntry = buildDiaryEntry({
      whatHappened: "Lots",
      wentWell: "Nothing went well",
      couldBeImproved: "Everything",
      notWell: "Too many arguments",
      risk: "More arguments",
    });
    const mockClient = createMockClient();
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, () =>
      Promise.resolve({ data: { diaryEntry } })
    );

    const diary = render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(mockClient),
        withDate(),
        withRoute(),
        withDiaryEntry()
      ),
    });

    await waitFor(() => {
      expect(diary.getByLabelText("What happened?").textContent).toEqual(
        "Lots"
      );
      expect(diary.getByLabelText("Went well").textContent).toEqual(
        "Nothing went well"
      );
      expect(diary.getByLabelText("Could be improved").textContent).toEqual(
        "Everything"
      );
      expect(diary.getByLabelText("Didn't go well").textContent).toEqual(
        "Too many arguments"
      );
      expect(diary.getByLabelText("Might be a risk").textContent).toEqual(
        "More arguments"
      );
    });
  });

  it("calls the apollo query with the date from the context", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = createMockClient();

    const diaryEntryQueryHandler = vi
      .fn()
      .mockResolvedValue({ data: { diaryEntry: buildDiaryEntry() } });
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, diaryEntryQueryHandler);

    render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(mockClient),
        withDate(date),
        withRoute(),
        withDiaryEntry()
      ),
    });

    expect(diaryEntryQueryHandler).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });

  it("calls the apollo mutation with the updated content to update the entry", async () => {
    const date = new DiaryDate();
    const mockClient = createMockClient();

    const diaryEntry = buildDiaryEntry();
    mockClient.setRequestHandler(
      DIARY_ENTRY_QUERY,
      vi.fn().mockResolvedValue({ data: { diaryEntry } })
    );
    const updateDiaryEntryMutationHandler = vi
      .fn()
      .mockResolvedValueOnce({ data: { updateDiaryEntry: { diaryEntry } } });
    mockClient.setRequestHandler(
      UPDATE_DIARY_ENTRY_MUTATION,
      updateDiaryEntryMutationHandler
    );

    const user = userEvent.setup();
    const diaryPageForm = render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(mockClient),
        withDate(date),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 10 })
      ),
    });

    await waitFor(() => {});
    await user.type(
      diaryPageForm.getByLabelText(/What happened/),
      "Nothing happened"
    );

    await waitFor(() =>
      expect(updateDiaryEntryMutationHandler).toHaveBeenCalledWith({
        diaryEntry: {
          ...diaryEntry,
          whatHappened: "Nothing happened",
        },
      })
    );
  });
});
