import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  user: TelegramUser | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);