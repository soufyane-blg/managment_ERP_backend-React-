import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>ERP Dashboard</h2>

      <NavLink to="/home">Home</NavLink>
      <NavLink to="/customers">Customers</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/orders">Orders</NavLink>

      {}
      <div style={{ margin: "20px 0", borderTop: "1px solid var(--border)" }} />

      <LogoutButton />
    </aside>
  );
}

export default Sidebar;