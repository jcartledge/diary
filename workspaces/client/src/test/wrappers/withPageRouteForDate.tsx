import { buildDiaryPageRoute } from "app/routes/buildDiaryPageRoute";
import { HistoryRouter, Route } from "lib/router";
import React from "react";

export const withPageRouteForDate =
  (isoDateString: string): React.FC<React.PropsWithChildren> =>
  ({ children }) => (
    <HistoryRouter initialPath={buildDiaryPageRoute(isoDateString)}>
      <Route path={buildDiaryPageRoute()}>{children}</Route>
    </HistoryRouter>
  );
