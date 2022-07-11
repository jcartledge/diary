import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { DiaryDate } from "lib/util/date";
import { wrap } from "souvlaki";
import { withApollo } from "souvlaki-apollo";
import { buildMockApolloClient } from "test/buildMockApolloClient";
import { withPageRoute } from "test/wrappers/withPageRoute";
import { describe, expect, it, vi } from "vitest";
import DateNextButton from "./DateNextButton";

const getNextButton = () => screen.getByText("next");

describe("DateNextButton", () => {
  it("links to the next date", async () => {
    const today = new DiaryDate();
    const todayPath = buildDiaryPageRoute(today.getKey());
    const yesterday = today.getPrevious();
    const yesterdayPath = buildDiaryPageRoute(yesterday.getKey());

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

    expect(getNextButton()).toHaveAttribute("aria-disabled");

    await userEvent.click(getNextButton());

    expect(onPathChange).not.toHaveBeenCalledWith(today.getNext().getKey());
  });
});
