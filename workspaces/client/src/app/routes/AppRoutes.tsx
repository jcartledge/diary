import DiaryPage from "app/components/pages/DiaryPage";
import { Redirect, Route } from "lib/router";
import { Toggle } from "lib/toggles/Toggle";
import { DiaryDate } from "lib/util/date";
import { buildPageRoute } from "./buildPageRoute";

export const AppRoutes = () => (
  <>
    <Toggle isOff name="auth">
      <Redirect path="/" to={buildPageRoute(new DiaryDate().getKey())} />
      <Route path={buildPageRoute()}>
        <DiaryPage />
      </Route>
    </Toggle>

    <Toggle name="auth">
      <Redirect path="/" to={buildPageRoute(new DiaryDate().getKey())} />
      <Route path={buildPageRoute()}>
        <DiaryPage />
      </Route>
    </Toggle>
  </>
);
