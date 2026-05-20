import { Outlet } from "react-router-dom";
import { MobileNav } from "../../../components/shared/MobileNav/MobileNav";
import { Sidebar } from "../../../components/shared/Sidebar/Sidebar";
import "./layout.css";

export function Layout() {
  return (
    <div className="layout">
      <Sidebar className="desktop-only" />

      <main className="content">
        <Outlet />
      </main>

      <MobileNav className="mobile-only" />
    </div>
  );
}
