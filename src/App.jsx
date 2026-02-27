import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ProductsDashboard from "./pages/ProductsDashboard";
import CustomersDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsDashboard />} />
        <Route path="/customers" element={<CustomersDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;