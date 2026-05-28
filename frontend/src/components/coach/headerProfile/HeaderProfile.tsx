import { NavLink } from "react-router-dom";
import type { User } from "../../../types/user";
import styles from "./HeaderProfile.module.css";
import { Settings } from "lucide-react";
import { useState } from "react";

export const HeaderProfile = ({ user }: { user: User }) => {

  const [avatarError, setAvatarError] = useState(false);
  const [isOnShift, setIsOnShift] = useState(false);
  const onToggleShift = () => {
    setIsOnShift(prev => !prev);
  };

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
          <p className={styles.firstName}>{user.first_name}</p>
          <p className={styles.lastName}>{user.last_name}</p>
        </div>

        <p className={styles.rating}>⭐️⭐️⭐️⭐️☆ 4</p>
      </div>

      <div className={styles.actions}>
        <NavLink to={'/profile'} className={styles.config}>
          <Settings size={20} />
        </NavLink>

        <button
          className={`${styles.shiftButton} ${isOnShift ? styles.shiftActive : styles.shiftInactive}`}
          onClick={onToggleShift}
        >
          {isOnShift ? 'Уйти со смены' : 'Выйти на смену'}
        </button>
      </div>
    </div>
  )
}