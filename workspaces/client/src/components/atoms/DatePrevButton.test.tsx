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
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByRole("button", { name: "prev" });

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const onPathChange = jest.fn();
    const date = new DiaryDate();
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DatePrevButton />
      </MockedProvider>,
      {
        wrapper: wrap(withDate(date), withRoute("", {}, onPathChange)),
      }
    );

    act(() => userEvent.click(getPrevButton()));

    expect(onPathChange).toHaveBeenCalledWith(
      buildPageRoute(date.getPrevious().getKey())
    );
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const date = new DiaryDate().getPrevious();
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
        <DatePrevButton />
      </MockedProvider>,
      { wrapper: wrap(withRoute()) }
    );

    await waitFor(() => expect(getPrevButton()).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DatePrevButton />
      </MockedProvider>,
      { wrapper: wrap(withRoute()) }
    );

    await waitFor(() => expect(getPrevButton()).not.toHaveClass("font-bold"));
  });
});
