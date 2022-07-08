import DiaryPage from "app/components/pages/DiaryPage";
import { LandingPage } from "app/components/pages/LandingPage";
import { AnonymousRoute } from "lib/auth/AnonymousRoute";
import { Authenticated } from "lib/auth/Authenticated";
import { Redirect, Route } from "lib/router";
import { Toggle } from "lib/toggles/Toggle";
import { DiaryDate } from "lib/util/date";
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";

const todayDiaryPageRoute = buildDiaryPageRoute(new DiaryDate().getKey());
const diaryPageRouteTemplate = buildDiaryPageRoute();

const AuthenticatedRoutes = () => (
  <>
    <Redirect path="/" to={todayDiaryPageRoute} />
    <Route path={diaryPageRouteTemplate}>
      <DiaryPage />
    </Route>
  </>
);

export const Routes = () => (
  <>
    <Toggle isOff name="auth">
      <AuthenticatedRoutes />
    </Toggle>

    <Toggle name="auth">
      <Authenticated>
        <AuthenticatedRoutes />
      </Authenticated>

      <AnonymousRoute path="/">
        <LandingPage />
      </AnonymousRoute>
    </Toggle>
  </>
);
