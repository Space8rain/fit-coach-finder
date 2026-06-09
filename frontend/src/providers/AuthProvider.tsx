import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTelegram } from "../hooks/useTelegram";
import { getWhoAmI, postAuthTg } from "../api/auth";
import type { User } from "../types/user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const tgWebApp = useTelegram();

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const raw = sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
    else sessionStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) sessionStorage.setItem("user", JSON.stringify(user));
    else sessionStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    async function init() {
      // DEV режим
      if (import.meta.env.DEV) {
        if (!token) {
          const mockToken = "mock_dev_token";
          setToken(mockToken);
        }

        setIsLoading(false);
        return;
      }

      if (token) {
        try {
          const res = await getWhoAmI();
          setUser(res.data);
        } catch {
          setToken(null);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (tgWebApp?.initData) {
        try {
          const res = await postAuthTg(JSON.stringify(tgWebApp.initData));
          setToken(res.data.token);

          const who = await getWhoAmI();
          setUser(who.data);
        } catch {
          setError("Ошибка авторизации");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(false);
    }

    init();
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, isLoading, error, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
