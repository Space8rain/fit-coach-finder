import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTelegram } from "../hooks/useTelegram";
import { getWhoAmI, postAuthTg } from "../api/auth";
import type { User } from "../types/user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const tgWebApp = useTelegram();
  console.log('tg user:', tgWebApp?.initDataUnsafe?.user);
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const mockToken = token ?? "mock_dev_token";
      if (!token) {
        sessionStorage.setItem("token", mockToken);
        setToken(mockToken);
      }

      const mockUser = (tgWebApp?.initDataUnsafe?.user ?? null) as User | null;
      setUser(mockUser);

      setIsLoading(false);
      return;
    }

    if (token) {
      getWhoAmI()
        .then(res => setUser(res.data))
        .catch(() => {
          sessionStorage.removeItem("token");
          setToken(null);
        })
        .finally(() => setIsLoading(false));
      return;
    }

    // Нет токена — логинимся через TG
    if (!tgWebApp?.initData) {
      setIsLoading(false);
      return;
    }

    postAuthTg(JSON.stringify(tgWebApp.initData))
      .then(res => {
        const newToken: string = res.data.token;
        sessionStorage.setItem("token", newToken);
        setToken(newToken);
        return getWhoAmI();
      })
      .then(res => setUser(res.data))
      .catch(() => setError("Ошибка авторизации"))
      .finally(() => setIsLoading(false));
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, isLoading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}