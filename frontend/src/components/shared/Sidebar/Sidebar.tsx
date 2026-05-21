import { Link } from "react-router-dom";
import { NAVIGATION } from "../../../config/navigation";
import { useAuth } from "../../../hooks/useAuth";
import "./sidebar.css";

export function Sidebar({className}: {className?: string}) {
  const { user } = useAuth();

  const items = NAVIGATION[user?.role || ''];

  return (
    <aside className={`sidebar ${className || ''}`}>
      {items.map(i => {
        const Icon = i.icon;

        return (
          <Link key={i.path} to={i.path}>
            <Icon size={24} />
            <span>

            {i.label}
            </span>
          </Link>
        );
      })}

    </aside>
  );
}
