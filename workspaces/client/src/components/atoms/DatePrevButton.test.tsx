import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { withRoute } from "souvlaki-react-router";
import { buildPageRoute } from "../../routes";
import { withDate } from "../../testWrappers";
import { buildMockClient } from "../../util/buildMockClient";
import { DiaryDate } from "../../util/date";
import DatePrevButton from "./DatePrevButton";

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const onPathChange = jest.fn();
    const date = new DiaryDate();
    const datePrevButton = render(<DatePrevButton />, {
      wrapper: wrap(
        withApollo(buildMockClient()),
        withDate(date),
        withRoute("", {}, onPathChange)
      ),
    });

    await act(async () => {
      userEvent.click(datePrevButton.getByRole("button", { name: "prev" }));
    });

    expect(onPathChange).toHaveBeenCalledWith(
      buildPageRoute(date.getPrevious().getKey())
    );
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockClient({ whatHappened: "Lots" });

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).toHaveClass("font-bold"));
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockClient();

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient), withRoute()),
    });
    const prevButton = screen.getByRole("button", { name: "prev" });

    await waitFor(() => expect(prevButton).not.toHaveClass("font-bold"));
  });
});
