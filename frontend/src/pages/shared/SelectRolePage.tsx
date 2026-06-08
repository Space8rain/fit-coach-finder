import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { postSetRole } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../../config/app";

interface RoleCardProps {
  title: string;
  description: string;
  onSelect: () => void;
  isLoading: boolean;
  variant: "secondary" | "accent";
}

function RoleCard({ title, description, onSelect, isLoading, variant }: RoleCardProps) {
  const isAccent = variant === "accent";

  return (
    <button
      onClick={onSelect}
      disabled={isLoading}
      className={`
        group
        flex-1 flex flex-col justify-between p-6 text-left cursor-pointer
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isAccent
          ? "bg-bg-accent hover:brightness-110"
          : "bg-bg-secondary border-r border-white/10 hover:brightness-110"
        }
      `}
    >
      <div>
        <h2 className="
          font-display text-3xl mb-2 leading-tight text-text-primary
          transition-transform duration-300 ease-out
          group-hover:translate-x-1
        ">
          {title}
        </h2>
        <p className="
          text-sm leading-relaxed text-text-secondary
          transition-opacity duration-300
          group-hover:opacity-80
        ">
          {description}
        </p>
      </div>

      <span className="
        mt-8 w-full p-3 rounded-lg font-display text-sm tracking-wider
        flex items-center justify-end gap-2
        transition-all duration-300 ease-out
        group-hover:gap-4
        bg-bg-primary text-text-primary
      ">
        {isLoading ? "..." : (
          <>
            ВЫБРАТЬ
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </>
        )}
      </span>
    </button>
  );
}

export default function SelectRolePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (role: "client" | "coach") => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    if (import.meta.env.DEV) {
      setUser(user ? { ...user, role } : null);
      setIsLoading(false);
      navigate("/");
      return;
    }

    try {
      const res = await postSetRole(role);
      setUser(res.data);
      navigate("/");
    } catch {
      setError("Не удалось сохранить роль. Попробуй ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden">

        <header className="px-6 py-5 bg-black/30 flex items-center gap-3">
          <span className="font-display text-text-primary text-lg tracking-wide">{APP_NAME}</span>
        </header>

        <div className="flex flex-col sm:flex-row">
          <RoleCard
            title="Я клиент"
            description="Найди своего тренера, следи за тренировками и достигай целей."
            onSelect={() => handleSelect("client")}
            isLoading={isLoading}
            variant="secondary"
          />
          <RoleCard
            title="Я тренер"
            description="Управляй клиентами, составляй программы и развивай свой бизнес."
            onSelect={() => handleSelect("coach")}
            isLoading={isLoading}
            variant="accent"
          />
        </div>

        <div className="px-6 py-4 bg-black/20 min-h-[48px] flex items-center justify-center">
          {error && (
            <p className="text-red-400 text-sm font-display tracking-wide">{error}</p>
          )}
        </div>

      </div>
    </div>
  );
}