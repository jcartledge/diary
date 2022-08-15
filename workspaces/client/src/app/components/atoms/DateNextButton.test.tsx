import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
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
        wrapper: wrap(withDate(yesterday)),
      }
    );

    await user.click(getNextButton());

    expect(screen.queryByText("OK")).toBeInTheDocument();
  });

  it("does not increment past the current date", async () => {
    const today = new DiaryDate();
    const todayPath = buildDiaryPageRoute(today.getKey());
    const tomorrowPath = buildDiaryPageRoute(today.getNext().getKey());
    const user = userEvent.setup();

    render(
      <HistoryRouter initialPath={todayPath}>
        <Route path={todayPath}>
          <DateNextButton />
        </Route>
        <Route path={tomorrowPath}>OK</Route>
      </HistoryRouter>,
      {
        wrapper: wrap(withDate(today)),
      }
    );

    await user.click(getNextButton());

    expect(screen.queryByText("OK")).not.toBeInTheDocument();
  });
});
