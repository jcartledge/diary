import DiaryPage from "app/components/pages/DiaryPage";
import { LandingPage } from "app/components/pages/LandingPage";
import { AnonymousRoute } from "lib/auth/AnonymousRoute";
import { Authenticated } from "lib/auth/Authenticated";
import { Redirect, Route } from "lib/router";
import { Toggle } from "lib/toggles/Toggle";
import { DiaryDate } from "lib/util/date";
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";

export const AppRoutes = () => (
  <>
    <Toggle isOff name="auth">
      <Redirect path="/" to={buildDiaryPageRoute(new DiaryDate().getKey())} />
      <Route path={buildDiaryPageRoute()}>
        <DiaryPage />
      </Route>
    </Toggle>

    <Toggle name="auth">
      <Authenticated>
        <Redirect path="/" to={buildDiaryPageRoute(new DiaryDate().getKey())} />
        <Route path={buildDiaryPageRoute()}>
          <DiaryPage />
        </Route>
      </Authenticated>

      <AnonymousRoute path="/">
        <LandingPage />
      </AnonymousRoute>
    </Toggle>
  </>
);
