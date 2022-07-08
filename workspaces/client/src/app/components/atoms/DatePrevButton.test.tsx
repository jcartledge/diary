import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildPageRoute } from "app/routes/buildPageRoute";
import { HistoryRouter } from "lib/router/HistoryRouter";
import { Route } from "lib/router/Route";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { describe, expect, it } from "vitest";
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByRole("button", { name: "prev" });

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const today = new DiaryDate();
    const todayPath = buildPageRoute(today.getKey());
    const yesterday = today.getPrevious();
    const yesterdayPath = buildPageRoute(yesterday.getKey());

    render(
      <HistoryRouter initialPath={todayPath}>
        <Route path={todayPath}>
          <DatePrevButton />
        </Route>
        <Route path={yesterdayPath}>OK</Route>
      </HistoryRouter>,
      {
        wrapper: wrap(withApollo(buildMockApolloClient()), withDate(today)),
      }
    );

    await userEvent.click(getPrevButton());

    expect(screen.queryByText("OK")).toBeInTheDocument();
  });

  it("bolds the button text if there is an entry on the previous date", async () => {
    const mockClient = buildMockApolloClient({ whatHappened: "Lots" });

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient)),
    });

    await waitFor(() => {
      expect(getPrevButton()).toHaveClass("font-bold");
    });
  });

  it("does not bold the button text if there is not an entry on the previous date", async () => {
    const mockClient = buildMockApolloClient();

    render(<DatePrevButton />, {
      wrapper: wrap(withApollo(mockClient)),
    });

    expect(getPrevButton()).not.toHaveClass("font-bold");
  });
});
