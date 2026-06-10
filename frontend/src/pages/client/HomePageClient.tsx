import { HeaderProfile } from "@/components/client/headerProfile/HeaderProfile";
import { useAuth } from "../../hooks/useAuth";

export default function HomePageClient() {

const { user, logout } = useAuth();

  return (
      <HeaderProfile user={user!} logout={logout} />
  );
}