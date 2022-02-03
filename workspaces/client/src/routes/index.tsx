import { Redirect, Route } from "react-router-dom";
import DiaryPage from "../components/pages/DiaryPage";
import { DiaryDate } from "../util/date";

export const buildPageRoute = (isoDateString = ":isoDateString") =>
  `/page/${isoDateString}`;

export const Routes = () => (
  <>
    <Route exact path="/">
      <Redirect to={buildPageRoute(new DiaryDate().getKey())} />
    </Route>
    <Route path={buildPageRoute()}>
      <DiaryPage />
    </Route>
  </>
);
