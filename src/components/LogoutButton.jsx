import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🧹 حذف التوكن
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("isAuthenticated");

    // 🔁 إعادة توجيه
    navigate("/login", { replace: true });
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;