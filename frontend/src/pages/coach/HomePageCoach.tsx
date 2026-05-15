import { useAuth } from "../../hooks/useAuth";

export default function HomePageCoach() {

const { user, logout } = useAuth();

  return (
    <div className="bg-bg-secondary font-display text-3xl text-white">
      <h1>Главная</h1>
      {user && <p className="font-script text-3xl text-green-400">Привет, {user.first_name}!</p>}
      <button onClick={logout}>Выйти</button>
    </div>
  );
}