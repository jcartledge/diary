import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers/withDate";
import { withMockedApolloProvider } from "../../testWrappers/withMockedApolloProvider";
import { withRoute } from "../../testWrappers/withRoute";
import { buildMockDiaryEntryQuery } from "../../util/buildApolloClientMocks";
import { DiaryDate } from "../../util/date";
import DateNextButton from "./DateNextButton";

const getNextButton = () => screen.getByRole("button", { name: "next" });

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();
    const yesterday = today.getPrevious();
    render(<DateNextButton />, {
      wrapper: wrap(
        withMockedApolloProvider(),
        withDate(yesterday),
        withRoute("", {}, onPathChange)
      ),
    });

    act(() => userEvent.click(getNextButton()));

    expect(onPathChange).toHaveBeenCalledWith(buildPageRoute(today.getKey()));
  });

  it("does not increment past the current date", async () => {
    const onPathChange = jest.fn();
    const today = new DiaryDate();

    render(<DateNextButton />, {
      wrapper: wrap(
        withMockedApolloProvider(),
        withDate(today),
        withRoute("", {}, onPathChange)
      ),
    });

    expect(getNextButton()).toBeDisabled();

    await act(async () => {
      userEvent.click(getNextButton());
    });

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate();
    const mocks = [buildMockDiaryEntryQuery(date, { whatHappened: "Lots" })];

    render(<DateNextButton />, {
      wrapper: wrap(
        withMockedApolloProvider({ mocks }),
        withDate(date.getPrevious()),
        withRoute()
      ),
    });

    await waitFor(() => expect(getNextButton()).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();

    render(<DateNextButton />, {
      wrapper: wrap(withMockedApolloProvider(), withDate(date), withRoute()),
    });

    await waitFor(() => expect(getNextButton()).not.toHaveClass("font-bold"));
  });
});
