import DiaryPage from "app/components/pages/DiaryPage";
import { Authenticated } from "lib/auth/Authenticated";
import { Redirect, Route } from "lib/router";
import { DiaryDate } from "lib/util/date";
import { buildPageRoute } from "./buildPageRoute";

export const AppRoutes = () => (
  <>
    <Redirect path="/" to={buildPageRoute(new DiaryDate().getKey())} />
    <Route path={buildPageRoute()}>
      <Authenticated>
        <DiaryPage />
      </Authenticated>
    </Route>
  </>
);
