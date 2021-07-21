import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate, withDiaryEntry } from "components/testWrappers";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "graphql/queries";
import { createMockClient } from "mock-apollo-client";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildDiaryEntry } from "util/buildDiaryEntry";
import { DiaryDate } from "util/date";
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
      wrapper: wrap(withApollo(mockClient), withDate(), withDiaryEntry()),
    });

    expect(await diary.findByLabelText("What happened?")).toHaveTextContent(
      "Lots"
    );
    expect(await diary.findByLabelText("Went well")).toHaveTextContent(
      "Nothing went well"
    );
    expect(await diary.findByLabelText("Could be improved")).toHaveTextContent(
      "Everything"
    );
    expect(await diary.findByLabelText("Didn't go well")).toHaveTextContent(
      "Too many arguments"
    );
    expect(await diary.findByLabelText("Might be a risk")).toHaveTextContent(
      "More arguments"
    );
  });

  it("calls the apollo query with the date from the context", async () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));
    const mockClient = createMockClient();

    const diaryEntryQueryHandler = jest
      .fn()
      .mockResolvedValue({ data: { diaryEntry: buildDiaryEntry() } });
    mockClient.setRequestHandler(DIARY_ENTRY_QUERY, diaryEntryQueryHandler);

    render(<DiaryPageForm />, {
      wrapper: wrap(withApollo(mockClient), withDate(date), withDiaryEntry()),
    });

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    expect(diaryEntryQueryHandler).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });

  it("calls the apollo mutation with the updated content to update the entry", async () => {
    const date = new DiaryDate(new Date(Date.UTC(2010, 0, 1, 12, 0, 0)));
    const mockClient = createMockClient();

    const diaryEntry = buildDiaryEntry();
    mockClient.setRequestHandler(
      DIARY_ENTRY_QUERY,
      jest.fn().mockResolvedValue({ data: { diaryEntry } })
    );
    const updateDiaryEntryMutationHandler = jest
      .fn()
      .mockResolvedValueOnce({ data: { diaryEntry } });
    mockClient.setRequestHandler(
      UPDATE_DIARY_ENTRY_MUTATION,
      updateDiaryEntryMutationHandler
    );

    const diaryPageForm = render(<DiaryPageForm />, {
      wrapper: wrap(
        withApollo(mockClient),
        withDate(date),
        withDiaryEntry({ saveTimeoutInterval: 10 })
      ),
    });

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    await userEvent.type(
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
