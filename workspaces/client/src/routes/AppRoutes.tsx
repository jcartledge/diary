import { Navigate, Route, Routes } from "react-router-dom";
import { Authenticated } from "../components/atoms/auth/Authenticated";
import DiaryPage from "../components/pages/DiaryPage";
import { DiaryDate } from "../util/date";
import { buildPageRoute } from "./buildPageRoute";

export const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={<Navigate to={buildPageRoute(new DiaryDate().getKey())} />}
    />
    <Route
      path={buildPageRoute()}
      element={
        <Authenticated>
          <DiaryPage />
        </Authenticated>
      }
    />
  </Routes>
);
