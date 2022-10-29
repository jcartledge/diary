import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { createHelper } from "souvlaki";

export const withPageRouteForDate = createHelper(
  (isoDateString: string) =>
    ({ children }) =>
      (
        <HistoryRouter initialPath={buildDiaryPageRoute(isoDateString)}>
          <Route path={buildDiaryPageRoute()}>{children}</Route>
        </HistoryRouter>
      )
);
