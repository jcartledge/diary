import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withDate } from "app/context/date/DateContext.testWrapper";
import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";
import { wrap } from "souvlaki";
import { describe, expect, it } from "vitest";
import DatePrevButton from "./DatePrevButton";

const getPrevButton = () => screen.getByText("prev");

describe("DatePrevButton", () => {
  it("links to the previous date", async () => {
    const today = new DiaryDate();
    const todayPath = buildDiaryPageRoute(today.getKey());
    const yesterday = today.getPrevious();
    const yesterdayPath = buildDiaryPageRoute(yesterday.getKey());

    render(
      <HistoryRouter initialPath={todayPath}>
        <Route path={todayPath}>
          <DatePrevButton />
        </Route>
        <Route path={yesterdayPath}>OK</Route>
      </HistoryRouter>,
      {
        wrapper: wrap(withDate(today)),
      }
    );

    await userEvent.click(getPrevButton());

    expect(screen.queryByText("OK")).toBeInTheDocument();
  });
});
