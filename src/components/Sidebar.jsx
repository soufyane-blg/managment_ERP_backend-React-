import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ERP System</h2>

      <nav className="nav-links">
        <NavLink to="/home" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/customers" className="nav-item">
          Customers
        </NavLink>

        <NavLink to="/products" className="nav-item">
          Products
        </NavLink>

        <NavLink to="/orders" className="nav-item">
          Orders
        </NavLink>
      </nav>

      <div className="divider" />

      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </aside>
  );
}

export default Sidebar;