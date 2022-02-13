import { Navigate, Route, Routes } from "react-router-dom";
import DiaryPage from "../components/pages/DiaryPage";
import { DiaryDate } from "../util/date";

export const buildPageRoute = (isoDateString = ":isoDateString") =>
  `/page/${isoDateString}`;

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<Navigate to={buildPageRoute(new DiaryDate().getKey())} />}
    />
    <Route path={buildPageRoute()} element={<DiaryPage />} />
  </Routes>
);
