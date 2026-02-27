import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ProductsDashboard from "./pages/ProductsDashboard";
import CustomersDashboard from "./pages/CustomerDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes element={<RequireAuth />} >
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsDashboard />} />
        <Route path="/customers" element={<CustomersDashboard />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;