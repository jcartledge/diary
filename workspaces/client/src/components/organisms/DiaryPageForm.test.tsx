import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
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
    const date = new DiaryDate();
    const mocks = [
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date: date.getKey() },
        },
        result: { data: { diaryEntry } },
      },
    ];

    const diary = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DiaryPageForm />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(), withRoute(), withDiaryEntry()),
      }
    );

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
    const date = new DiaryDate().getPrevious();
    const diaryEntryQueryHandler = jest
      .fn()
      .mockReturnValue({ data: { diaryEntry: buildDiaryEntry() } });
    const mocks = [
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date: date.getKey() },
        },
        result: diaryEntryQueryHandler,
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DiaryPageForm />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(date), withRoute(), withDiaryEntry()),
      }
    );

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    expect(diaryEntryQueryHandler).toHaveBeenCalledWith({
      date: date.getKey(),
    });
  });

  it("calls the apollo mutation with the updated content to update the entry", async () => {
    const date = new DiaryDate();
    const diaryEntry = buildDiaryEntry();
    const diaryEntryQueryHandler = jest
      .fn()
      .mockResolvedValue({ data: { diaryEntry } });
    const updateDiaryEntryMutationHandler = jest
      .fn()
      .mockResolvedValueOnce({ data: { updateDiaryEntry: { diaryEntry } } });
    const mocks = [
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date },
        },
        result: diaryEntryQueryHandler,
      },
      {
        request: {
          query: UPDATE_DIARY_ENTRY_MUTATION,
          variables: { date },
        },
        result: updateDiaryEntryMutationHandler,
      },
    ];

    const diaryPageForm = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DiaryPageForm />
      </MockedProvider>,
      {
        wrapper: wrap(
          withDate(date),
          withRoute(),
          withDiaryEntry({ saveTimeoutInterval: 10 })
        ),
      }
    );

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    userEvent.type(
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
