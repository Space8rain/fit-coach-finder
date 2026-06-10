import { NavLink } from "react-router-dom";
import type { User } from "../../../types/user";
import styles from "./HeaderProfile.module.css";
import { Settings, Star } from "lucide-react";
import { useState } from "react";

export const HeaderProfile = ({ user, status, toggleStatus, logout }: { user: User; status: string; toggleStatus: () => void; logout: () => void }) => {

  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        {user?.photo_url && !avatarError ? (
          <img
            src={user.photo_url}
            alt="аватар"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user?.first_name?.[0]?.toUpperCase()}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div>
          <p className={styles.firstName}>{user.first_name} <button onClick={logout}>
            Выйти
          </button></p>
          <p className={styles.lastName}>{user.last_name}</p>
        </div>

        <p className={styles.rating}>
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="var(--color-bg-primary)" />
        </p>
      </div>

      <div className={styles.actions}>
        <NavLink to={'/profile'} className={styles.config}>
          <Settings size={20} />
        </NavLink>

        <button
          className={`${styles.shiftButton} ${status === 'online' ? styles.shiftActive : styles.shiftInactive}`}
          onClick={toggleStatus}
        >
          {status === 'online' ? 'Уйти со смены' : 'Выйти в онлайн'}
        </button>
      </div>
    </div>
  )
}