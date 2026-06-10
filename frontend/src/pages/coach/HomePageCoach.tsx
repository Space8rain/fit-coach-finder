import { HeaderProfile } from "@/components/coach/headerProfile/HeaderProfile";
import { UpcomingWorkouts } from "../../components/coach/UpcomingWorkouts/UpcomingWorkouts";
import { useAuth } from "../../hooks/useAuth";
import { useTrainerStatus } from "../../hooks/useTrainerStatus";

export default function HomePageCoach() {

  const { user, logout } = useAuth();
  const { status, toggleStatus } = useTrainerStatus();

  return (
    <>
      <HeaderProfile user={user!} status={status} toggleStatus={toggleStatus} logout={logout} />
      <UpcomingWorkouts />
    </>
  );
}