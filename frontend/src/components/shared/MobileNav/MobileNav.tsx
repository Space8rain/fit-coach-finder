import { NavLink } from "react-router-dom";
import { useNavigation } from "@/hooks/useNavigationRoutes";
import "./mobileNav.css";

export function MobileNav({ className }: { className?: string }) {
  const navItems = useNavigation();

  return (
    <nav className={`mobile-nav ${className || ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {Icon && <Icon size={24} />}
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}