import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageCoach from "../pages/coach/HomePageCoach";
import { Layout } from "../pages/shared/layout/Layout";

export function CoachRoutes() {

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePageCoach />} />
        </Route>
      </Routes>
    </Suspense>
  );
}