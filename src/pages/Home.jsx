import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useEffect } from "react";

function Home() {
  
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8000/api/customers/", {
        credentials: "include",
      });
  
      if (res.status === 401) {
        window.location.href = "/login";
      }
    };
  
    checkAuth();
  }, []);
  
  return (
    <div>
      <h1>ERP Home</h1>

      <p>Choose a dashboard:</p>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/customers">Customers</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Home;