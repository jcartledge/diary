import DiaryPage from "components/pages/DiaryPage";
import { Redirect, Route } from "react-router-dom";
import { DiaryDate } from "util/date";

export const Routes = () => (
  <>
    <Route exact path="/">
      <Redirect to={`/page/${new DiaryDate().getKey()}`} />
    </Route>
    <Route path="/page/:isoDateString">
      <DiaryPage />
    </Route>
  </>
);
