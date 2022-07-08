import DiaryPage from "app/components/pages/DiaryPage";
import { LandingPage } from "app/components/pages/LandingPage";
import { AnonymousRoute } from "lib/auth/AnonymousRoute";
import { Authenticated } from "lib/auth/Authenticated";
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
      <Authenticated>
        <Redirect path="/" to={buildPageRoute(new DiaryDate().getKey())} />
        <Route path={buildPageRoute()}>
          <DiaryPage />
        </Route>
      </Authenticated>

      <AnonymousRoute path="/">
        <LandingPage />
      </AnonymousRoute>
    </Toggle>
  </>
);
