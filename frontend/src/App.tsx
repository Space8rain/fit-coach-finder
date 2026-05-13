import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth";
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function AppRoutes() {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
}