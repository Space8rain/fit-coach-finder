import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageClient from "../pages/client/HomePageClient";
import { Layout } from "../pages/shared/layout/Layout";
import { LoginPage } from "../pages/shared/LoginPage";

export function ClientRoutes() {
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePageClient />} />
          <Route path="search" element={<LoginPage />} />
          <Route path="history" element={<HomePageClient />} />
          <Route path="profile" element={<HomePageClient />} />
        </Route>
      </Routes>
    </Suspense>
  );
}