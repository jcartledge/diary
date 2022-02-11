import { Redirect, Route, Switch } from "react-router-dom";
import DiaryPage from "../components/pages/DiaryPage";
import { DiaryDate } from "../util/date";

export const buildPageRoute = (isoDateString = ":isoDateString") =>
  `/page/${isoDateString}`;

export const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => <Redirect to={buildPageRoute(new DiaryDate().getKey())} />}
    ></Route>
    <Route path={buildPageRoute()}>
      <DiaryPage />
    </Route>
  </Switch>
);
