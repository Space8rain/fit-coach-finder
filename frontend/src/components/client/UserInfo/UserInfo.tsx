import type { User } from "@/types/user";
import { useState } from "react";
import styles from "./UserInfo.module.css";
import { Star } from "lucide-react";

export default function UserInfo({ user, logout }: { user: User; logout: () => void }) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        {user?.photoUrl && !avatarError ? (
          <img
            src={user.photoUrl}
            alt="аватар"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user?.firstName?.[0]?.toUpperCase()}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div>
          <p className={styles.firstName}>{user.firstName} <button onClick={logout}>
            Выйти
          </button></p>
          <p className={styles.lastName}>{user.lastName}</p>
        </div>

        <p className={styles.rating}>
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="var(--color-bg-primary)" />
        </p>
      </div>
    </div>
  )
}