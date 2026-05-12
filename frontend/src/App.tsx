import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function AppRoutes() {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
  );
}