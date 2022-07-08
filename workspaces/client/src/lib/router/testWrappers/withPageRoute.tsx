import { buildPageRoute } from "app/routes/buildPageRoute";
import { HistoryRouter } from "lib/router/HistoryRouter";
import { Route } from "lib/router/Route";
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
