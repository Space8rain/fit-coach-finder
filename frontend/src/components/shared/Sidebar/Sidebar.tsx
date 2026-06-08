import { NavLink } from "react-router-dom";
import { useNavigation } from "@/hooks/useNavigationRoutes";
import "./sidebar.css";

export function Sidebar({ className }: { className?: string }) {
  const navItems = useNavigation();

  return (
    <aside className={`sidebar ${className || ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {Icon && <Icon size={24} />}
            <span>{item.title}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}