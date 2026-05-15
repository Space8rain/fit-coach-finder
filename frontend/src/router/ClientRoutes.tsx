import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageClient from "../pages/client/HomePageClient";

export function ClientRoutes() {

    return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route path="/" element={<HomePageClient />} />
      </Routes>
    </Suspense>
  );
}