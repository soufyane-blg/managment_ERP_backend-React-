import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const isAuth = localStorage.getItem("isAuthenticated");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;