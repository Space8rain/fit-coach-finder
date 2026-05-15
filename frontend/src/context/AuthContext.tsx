import { createContext } from "react";
import type { User } from "../types/user";

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);