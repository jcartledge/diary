import DiaryPage from "app/components/pages/DiaryPage";
import { LandingPage } from "app/components/pages/LandingPage";
import { Authenticated } from "lib/auth/Authenticated";
import { UnauthenticatedRoute } from "lib/auth/UnauthenticatedRoute";
import { Redirect, Route } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";
import { buildDiaryPageRoute } from "./buildDiaryPageRoute";

const todayDiaryPageRoute = buildDiaryPageRoute(new DiaryDate().getKey());
const diaryPageRouteTemplate = buildDiaryPageRoute();

export const Routes = () => (
  <>
    <Authenticated>
      <Redirect path="/" to={todayDiaryPageRoute} />
      <Route path={diaryPageRouteTemplate}>
        <DiaryPage />
      </Route>
    </Authenticated>

    <UnauthenticatedRoute path="/">
      <LandingPage />
    </UnauthenticatedRoute>
  </>
);
