import { useAuth } from "../hooks/useAuth";
import { CoachRoutes } from "./CoachRoutes";
import { SelectRolePage } from "../pages/shared/SelectRolePage";
import { ClientRoutes } from "./ClientRoutes";
import type { User } from "../types/user";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/shared/LoginPage";
import NotFoundPage from "../pages/shared/NotFoundPage";

function resolveElement(token: string | null, user: User | null) {
  if (!token) return <LoginPage />;
  if (!user?.role) return <SelectRolePage />;
  if (user.role === "client") return <ClientRoutes />;
  if (user.role === "coach") return <CoachRoutes />;
  return <LoginPage />;
};

export function AppRouter() {
  const { token, user, isLoading } = useAuth();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route path="/" element={resolveElement(token, user)} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};