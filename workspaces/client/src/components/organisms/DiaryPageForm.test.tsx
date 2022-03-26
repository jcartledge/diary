import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { withDate } from "../../testWrappers/withDate";
import { withDiaryEntry } from "../../testWrappers/withDiaryEntry";
import { withMockedApolloProvider } from "../../testWrappers/withMockedApolloProvider";
import { withRoute } from "../../testWrappers/withRoute";
import {
  buildMockDiaryEntryMutation,
  buildMockDiaryEntryQuery,
} from "../../util/buildApolloClientMocks";
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

    const diary = render(<DiaryPageForm />, {
      wrapper: wrap(
        withMockedApolloProvider({
          mocks: [buildMockDiaryEntryQuery(date, diaryEntry)],
        }),
        withDate(),
        withRoute(),
        withDiaryEntry()
      ),
    });

    await waitFor(() => {
      // Allow apollo mock time to resolve
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
    const date = new DiaryDate().getPrevious();
    const querySpy = jest.fn();
    const mocks = [buildMockDiaryEntryQuery(date, {}, querySpy)];

    render(<DiaryPageForm />, {
      wrapper: wrap(
        withMockedApolloProvider({ mocks }),
        withDate(date),
        withRoute(),
        withDiaryEntry()
      ),
    });

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    expect(querySpy).toHaveBeenCalled();
  });

  it("calls the apollo mutation to update the entry", async () => {
    const date = new DiaryDate();
    const expectedDiaryEntry = buildDiaryEntry({
      whatHappened: "Nothing happened",
    });
    const mutationSpy = jest.fn();
    const mocks = [
      buildMockDiaryEntryMutation(expectedDiaryEntry, mutationSpy),
    ];

    const diaryPageForm = render(<DiaryPageForm />, {
      wrapper: wrap(
        withMockedApolloProvider({ mocks }),
        withDate(date),
        withRoute(),
        withDiaryEntry({ saveTimeoutInterval: 10 })
      ),
    });

    await waitFor(() => {
      // Need this waitFor nonsense to prevent the apollo hook from causing an act warning.
    });

    userEvent.type(
      diaryPageForm.getByLabelText(/What happened/),
      "Nothing happened"
    );

    await waitFor(() => expect(mutationSpy).toHaveBeenCalled());
  });
});
