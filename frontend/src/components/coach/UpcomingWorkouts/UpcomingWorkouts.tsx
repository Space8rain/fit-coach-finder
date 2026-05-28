import { NavLink } from "react-router-dom";
import styles from "./UpcomingWorkouts.module.css";
import { ArrowBigRight } from "lucide-react";

const workoutsData = [
  {
    id: 1,
    date: "12.12.2024",
    time: "18:00",
    info: {
      name: 'Алексей Г.',
      type: 'Кардио',
      duration: '45 мин',
      price: '1500 руб'
    }
  }
];

export const UpcomingWorkouts = () => {
  return (
    <div className={styles.container} >
      <div className={styles.header}>
        <h2>Ближайшие тренировки</h2>

        <NavLink to={'/profile'} className={styles.viewAll}>
          Все <ArrowBigRight size={20} />
        </NavLink>
      </div>

      <div className={styles.workouts}>
        {workoutsData.map(workout => {
          return (
            <div className={styles.workout}>
              <p className={styles.date}>
                <p className={styles.time}>{workout.time}</p>
                {workout.date}
              </p>

              <p className={styles.info}>
                <div>
                  {workout.info.name}
                  {workout.info.type}
                </div>
                {workout.info.duration}
                {workout.info.price}
              </p>

              <NavLink to={'/profile'} className={styles.join}>
                Войти
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  );
};