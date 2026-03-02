import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/theme.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;