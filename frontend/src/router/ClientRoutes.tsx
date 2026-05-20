import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePageClient from "../pages/client/HomePageClient";
import { Layout } from "../pages/shared/layout/Layout";

export function ClientRoutes() {
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePageClient />} />
          {/* <Route path="search" element={<SearchPageClient />} />
          <Route path="history" element={<HistoryPageClient />} />
          <Route path="profile" element={<ProfilePageClient />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
}