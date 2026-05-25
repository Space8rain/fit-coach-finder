import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageCoach from "../pages/coach/HomePageCoach";
import { Layout } from "../pages/shared/layout/Layout";
import { LoginPage } from "../pages/shared/LoginPage";
import { HistoryPageCoach } from "../pages/coach/HistoryPageCoach";
import { ProfilePageCoach } from "../pages/coach/ProfilePageCoach";

export function CoachRoutes() {

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index  element={<HomePageCoach />} />
          <Route path="search" element={<LoginPage />} />
          <Route path="history" element={<HistoryPageCoach />} />
          <Route path="profile" element={<ProfilePageCoach />} />
        </Route>
      </Routes>
    </Suspense>
  );
}