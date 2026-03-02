import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OrdersPage from "./pages/OrdersPage";
import ProductsDashboard from "./pages/ProductsDashboard";
import CustomersDashboard from "./pages/CustomerDashboard";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/customers" element={<CustomersDashboard />} />
            <Route path="/products" element={<ProductsDashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;