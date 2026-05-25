import { NavLink } from "react-router-dom";
import { NAVIGATION } from "../../../config/navigation";
import { useAuth } from "../../../hooks/useAuth";
import "./mobileNav.css";

export function MobileNav({ className }: { className?: string }) {
  const { user } = useAuth();

  const items = NAVIGATION[user?.role || ''];

  return (
    <nav className={`mobile-nav ${className || ''}`}>
      {items.map(i => {
        const Icon = i.icon;

        return (
          <NavLink
            key={i.path}
            to={i.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Icon size={24} />
            {i.label}
          </NavLink>
        );
      })}

    </nav>
  );
}
