import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAuth, postAuthRegister } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { APP_NAME } from "../../config/app";
import type { User } from "@/types/user";

type Tab = "login" | "register";

export default function LoginPage() {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    if (import.meta.env.DEV) {
      const mockToken = "mock_dev_token";

      const user = {
        id: 123456,
        first_name: "Иван",
        last_name: "Иванов",
        username: "pussyHunter",
        language_code: "en",
        photo_url: "https://avatarko.ru/img/kartinka/1/Crazy_Frog.jpg",
        // role: "coach",
      } as User;

      setToken(mockToken);
      sessionStorage.setItem("token", mockToken);
      setUser(user);

      setIsLoading(false);
      return;
    }

    try {
      const res = await postAuth(JSON.stringify({ phone, password }));
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch {
      setError("Неверный номер или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await postAuthRegister(JSON.stringify({ name, phone, password }));
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch {
      setError("Ошибка регистрации. Попробуй ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <i className="ti ti-barbell text-3xl text-bg-accent" aria-hidden="true" />
          <h1 className="font-display text-2xl text-text-primary mt-2 mb-1">{APP_NAME}</h1>
          <p className="text-sm text-text-secondary">Войди или создай аккаунт</p>
        </div>

        <div className="flex border-b border-white/8 mb-6">
          {(["login", "register"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); }}
              className={`
                flex-1 pb-3 font-display text-xs tracking-widest cursor-pointer
                border-b-2 transition-all duration-200 bg-transparent border-x-0 border-t-0
                ${tab === t
                  ? "text-bg-accent border-bg-accent"
                  : "text-text-secondary border-transparent hover:text-text-primary"
                }
              `}
            >
              {t === "login" ? "ВХОД" : "РЕГИСТРАЦИЯ"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {tab === "register" && (
            <div>
              <p className="text-[11px] font-display tracking-widest text-text-secondary mb-2">ИМЯ</p>
              <input
                type="text"
                placeholder="Иван"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-text-primary placeholder:text-white/25 outline-none focus:border-bg-secondary transition-colors text-sm"
              />
            </div>
          )}

          <div>
            <p className="text-[11px] font-display tracking-widest text-text-secondary mb-2">НОМЕР ТЕЛЕФОНА</p>
            <input
              type="tel"
              placeholder="+7 (999) 000-00-00"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-text-primary placeholder:text-white/25 outline-none focus:border-bg-secondary transition-colors text-sm"
            />
          </div>

          <div>
            <p className="text-[11px] font-display tracking-widest text-text-secondary mb-2">ПАРОЛЬ</p>
            <input
              type="password"
              placeholder={tab === "register" ? "Минимум 8 символов" : "••••••••"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-text-primary placeholder:text-white/25 outline-none focus:border-bg-secondary transition-colors text-sm"
            />
          </div>

          <div className="min-h-[20px]">
            {error && (
              <p className="text-red-400 text-xs font-display tracking-wide">{error}</p>
            )}
          </div>

          <button
            onClick={tab === "login" ? handleLogin : handleRegister}
            disabled={isLoading}
            className="w-full py-3.5 bg-bg-accent rounded-xl font-display text-sm tracking-widest text-white cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "..." : tab === "login" ? "ВОЙТИ →" : "СОЗДАТЬ АККАУНТ →"}
          </button>

          {tab === "login" && (
            <>
              <div className="flex items-center gap-3 text-white/20 text-xs">
                <span className="flex-1 h-px bg-white/8" />
                или
                <span className="flex-1 h-px bg-white/8" />
              </div>
              <button className="w-full py-3.5 bg-transparent border border-white/12 rounded-xl font-display text-xs tracking-widest text-text-secondary cursor-pointer hover:border-white/30 hover:text-text-primary transition-all duration-200">
                <i className="ti ti-brand-telegram text-base align-[-2px] mr-2" aria-hidden="true" />
                ВОЙТИ ЧЕРЕЗ TELEGRAM
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}