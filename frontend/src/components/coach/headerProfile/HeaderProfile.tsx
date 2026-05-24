import type { User } from "../../../types/user";
import styles from "./HeaderProfile.module.css";

export const HeaderProfile = ({ user }: { user: User}) => {

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={user?.photo_url} alt="аватар" />
      </div>

      <div className={styles.info}>
        {user && <p className="font-script text-3xl text-green-400">{user.first_name}!</p>}
        <>⭐️⭐️⭐️⭐️☆ 4</>
      </div>
    </div>
  )
}