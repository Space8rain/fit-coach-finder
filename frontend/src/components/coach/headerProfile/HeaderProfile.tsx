import { NavLink } from "react-router-dom";
import type { User } from "../../../types/user";
import styles from "./HeaderProfile.module.css";
import { Settings } from "lucide-react";

export const HeaderProfile = ({ user }: { user: User}) => {

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={user?.photo_url} alt="аватар" />
      </div>

      <div className={styles.info}>
        <div>
          <p className="text-3xl">{user.first_name}</p>
          <p className="text-xl">{user.last_name}</p>
        </div>

        <p className={styles.rating}>⭐️⭐️⭐️⭐️☆ 4</p>
      </div>

      <NavLink to={'/profile'} className={styles.config}>
        <Settings size={20} />
      </NavLink>
    </div>
  )
}