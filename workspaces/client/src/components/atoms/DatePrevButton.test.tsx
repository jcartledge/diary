import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers/withDate";
import { withMockedApolloProvider } from "../../testWrappers/withMockedApolloProvider";
import { withRoute } from "../../testWrappers/withRoute";
import { buildMockDiaryEntryQuery } from "../../util/buildApolloClientMocks";
import { DiaryDate } from "../../util/date";
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByRole("button", { name: "prev" });

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const onPathChange = jest.fn();
    const date = new DiaryDate();
    render(<DatePrevButton />, {
      wrapper: wrap(
        withMockedApolloProvider(),
        withDate(date),
        withRoute("", {}, onPathChange)
      ),
    });

    act(() => userEvent.click(getPrevButton()));

    expect(onPathChange).toHaveBeenCalledWith(
      buildPageRoute(date.getPrevious().getKey())
    );
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const date = new DiaryDate().getPrevious();
    const mocks = [buildMockDiaryEntryQuery(date, { whatHappened: "Lots" })];
    render(<DatePrevButton />, {
      wrapper: wrap(withMockedApolloProvider({ mocks }), withRoute()),
    });

    await waitFor(() => expect(getPrevButton()).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    render(<DatePrevButton />, {
      wrapper: wrap(withMockedApolloProvider(), withRoute()),
    });

    await waitFor(() => expect(getPrevButton()).not.toHaveClass("font-bold"));
  });
});
