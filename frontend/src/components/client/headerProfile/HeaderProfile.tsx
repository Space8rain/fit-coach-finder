import { NavLink } from "react-router-dom";
import type { User } from "../../../types/user";
import styles from "./HeaderProfile.module.css";
import { Settings } from "lucide-react";
import UserInfo from "../UserInfo/UserInfo";

export const HeaderProfile = ({ user, logout }: { user: User; logout: () => void }) => {

  return (
    <div className={styles.container}>
      <UserInfo user={user} logout={logout} />
      <div className={styles.actions}>
        <NavLink to={'/profile'} className={styles.config}>
          <Settings size={20} />
        </NavLink>
      </div>
    </div>
  )
}