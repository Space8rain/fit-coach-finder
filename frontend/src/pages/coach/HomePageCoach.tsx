import { HeaderProfile } from "../../components/coach/headerProfile/HeaderProfile";
import { UpcomingWorkouts } from "../../components/coach/UpcomingWorkouts/UpcomingWorkouts";
import { useAuth } from "../../hooks/useAuth";

export default function HomePageCoach() {

const { user } = useAuth();

  return (
    <>
      <HeaderProfile user={user!} />
      <UpcomingWorkouts />
    </>
  );
}