import { Home, Search, History, User } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const NAVIGATION: Record<string, NavItem[]> = {
  coach: [
    { label: "Главная", path: "/", icon: Home },
    { label: "Поиск", path: "search", icon: Search },
    { label: "История", path: "history", icon: History },
    { label: "Профиль", path: "profile", icon: User },
  ],

  client: [
    { label: "Главная", path: "/", icon: Home },
    { label: "Поиск", path: "search", icon: Search },
    { label: "История", path: "history", icon: History },
    { label: "Профиль", path: "profile", icon: User },
  ],

  admin: [
    // { label: "Панель", path: "dashboard", icon: <DashboardIcon /> },
    // { label: "Пользователи", path: "users", icon: <UsersIcon /> },
    // { label: "Настройки", path: "settings", icon: <SettingsIcon /> },
  ],
};
