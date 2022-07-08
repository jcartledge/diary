import { buildPageRoute } from "app/routes/buildPageRoute";
import { HistoryRouter, Route } from "lib/router";
import { createHelper } from "souvlaki";

export const withPageRoute = createHelper(
  (isoDateString): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <HistoryRouter initialPath={buildPageRoute(isoDateString)}>
          <Route path={buildPageRoute()}>{children}</Route>
        </HistoryRouter>
      )
);
