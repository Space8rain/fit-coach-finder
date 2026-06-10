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
      type: 'Скакалка',
      duration: '30 мин',
      price: '1500 руб'
    }
  },
  {
    id: 2,
    date: "12.12.2024",
    time: "19:40",
    info: {
      name: 'Александр Ж.',
      type: 'Бокс',
      duration: '45 мин',
      price: '1500 руб'
    }
  },
  {
    id: 3,
    date: "12.12.2024",
    time: "19:40",
    info: {
      name: 'Александр Ж.',
      type: 'Бокс',
      duration: '45 мин',
      price: '1500 руб'
    }
  },
  {
    id: 4,
    date: "12.12.2024",
    time: "19:40",
    info: {
      name: 'Александр Ж.',
      type: 'Бокс',
      duration: '45 мин',
      price: '1500 руб'
    }
  },
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
        {workoutsData.length === 0 ?
          <p >Нет запланированных тренировок</p>
        :
          workoutsData.map((workout) => (
            <div key={workout.id} className={styles.workoutCard}>
              <div className={styles.date}>
                <p className={styles.time}>{workout.time}</p>
                <p className={styles.dateText}>{workout.date}</p>
              </div>

              <div className={styles.info}>
                <div className={styles.name}>{workout.info.name}</div>
                <div className={styles.type}>{workout.info.type}</div>

                <div className={styles.details}>
                  <span>{workout.info.duration}</span>
                </div>
              </div>

              <NavLink to="/profile" className={styles.join}>
                Войти
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};