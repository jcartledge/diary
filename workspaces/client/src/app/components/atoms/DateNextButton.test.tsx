import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildPageRoute } from "app/routes/buildPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withPageRoute } from "test/wrappers/withPageRoute";
import { describe, expect, it, vi } from "vitest";
import DateNextButton from "./DateNextButton";

const getNextButton = () => screen.getByRole("button", { name: "next" });

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const today = new DiaryDate();
    const todayPath = buildPageRoute(today.getKey());
    const yesterday = today.getPrevious();
    const yesterdayPath = buildPageRoute(yesterday.getKey());

    const user = userEvent.setup();

    render(
      <HistoryRouter initialPath={yesterdayPath}>
        <Route path={yesterdayPath}>
          <DateNextButton />
        </Route>
        <Route path={todayPath}>OK</Route>
      </HistoryRouter>,
      {
        wrapper: wrap(withApollo(buildMockApolloClient()), withDate(yesterday)),
      }
    );

    await user.click(getNextButton());

    expect(screen.queryByText("OK")).toBeInTheDocument();
  });

  it("does not increment past the current date", async () => {
    const onPathChange = vi.fn();
    const today = new DiaryDate();

    render(<DateNextButton />, {
      wrapper: wrap(
        withApollo(buildMockApolloClient()),
        withDate(today),
        withPageRoute(today.getKey())
      ),
    });

    expect(getNextButton()).toHaveAttribute("disabled");

    await userEvent.click(getNextButton());

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });

  it("bolds the button text if there is an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockApolloClient({ whatHappened: "Lots" });

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date)),
    });

    await waitFor(() => {
      expect(getNextButton()).toHaveClass("font-bold");
    });
  });

  it("does not bold the button text if there is not an entry on the next date", async () => {
    const date = new DiaryDate().getPrevious();
    const mockClient = buildMockApolloClient();

    render(<DateNextButton />, {
      wrapper: wrap(withApollo(mockClient), withDate(date)),
    });

    expect(getNextButton()).not.toHaveClass("font-bold");
  });
});
