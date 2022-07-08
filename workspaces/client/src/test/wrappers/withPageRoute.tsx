import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { createHelper } from "souvlaki";

export const withPageRoute = createHelper(
  (isoDateString): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <HistoryRouter initialPath={buildDiaryPageRoute(isoDateString)}>
          <Route path={buildDiaryPageRoute()}>{children}</Route>
        </HistoryRouter>
      )
);
