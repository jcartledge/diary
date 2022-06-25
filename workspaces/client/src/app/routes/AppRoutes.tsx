import DiaryPage from "app/components/pages/DiaryPage";
import { Authenticated } from "lib/auth/Authenticated";
import { DiaryDate } from "lib/util/date";
import { Navigate, Route, Routes } from "react-router-dom";
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
