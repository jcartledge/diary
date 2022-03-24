import { MockedProvider } from "@apollo/client/testing";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { DIARY_ENTRY_QUERY } from "../../graphql/queries";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers/withDate";
import { withRoute } from "../../testWrappers/withRoute";
import { buildDiaryEntry } from "../../util/buildDiaryEntry";
import { DiaryDate } from "../../util/date";
import DateNextButton from "./DateNextButton";

const getNextButton = () => screen.getByRole("button", { name: "next" });

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DateNextButton />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(yesterday), withRoute("", {}, onPathChange)),
      }
    );

    act(() => userEvent.click(getNextButton()));

    expect(onPathChange).toHaveBeenCalledWith(buildPageRoute(today.getKey()));
  });

  it("does not increment past the current date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DateNextButton />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(today), withRoute("", {}, onPathChange)),
      }
    );

    expect(getNextButton()).toBeDisabled();

    await act(async () => {
      userEvent.click(getNextButton());
    });

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate();
    const mocks = [
      {
        request: {
          query: DIARY_ENTRY_QUERY,
          variables: { date: date.getKey() },
        },
        result: {
          data: { diaryEntry: buildDiaryEntry({ whatHappened: "Lots" }) },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DateNextButton />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(date.getPrevious()), withRoute()),
      }
    );

    await waitFor(() => expect(getNextButton()).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DateNextButton />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(date), withRoute()),
      }
    );

    await waitFor(() => expect(getNextButton()).not.toHaveClass("font-bold"));
  });
});
