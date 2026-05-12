import { useEffect, useState } from "react";
import { useTelegram } from "./useTelegram";
import { getWhoAmI, postAuthTg } from "../api/auth";

export function useTelegramAuth() {
  const tgWebApp = useTelegram();

  const initialToken = sessionStorage.getItem("token");
  const [token, setToken] = useState<string | null>(initialToken);

  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(!initialToken);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) return;
    
    if (import.meta.env.DEV) {
      const mockToken = "mock_dev_token_" + Date.now();
      sessionStorage.setItem("token", mockToken);
      setToken(mockToken);
      setIsLoading(false);

      return;
    }
    
    if (!tgWebApp?.initData) {
      setIsLoading(false);
      return;
    }

    postAuthTg(JSON.stringify(tgWebApp.initData))
      .then(res => {
        const newToken = res.data.token;
        sessionStorage.setItem("token", newToken);
        setToken(newToken);
      })
      .catch(() => setError("Ошибка авторизации"))
      .finally(() => setIsLoading(false));

  }, [tgWebApp?.initData]);


  useEffect(() => {
    if (!token || import.meta.env.DEV) return;

    getWhoAmI()
      .then(res => setUser(res.data))
      .catch(() => setError("Ошибка инициализации"));
  }, [token]);

  return { token, user, isLoading, error };
}