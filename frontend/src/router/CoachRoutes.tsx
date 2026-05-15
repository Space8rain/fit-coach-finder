import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageCoach from "../pages/coach/HomePageCoach";

export function CoachRoutes() {

    return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route path="/" element={<HomePageCoach />} />
      </Routes>
    </Suspense>
  );
}