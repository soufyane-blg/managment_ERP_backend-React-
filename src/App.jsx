import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage";
import ProductsDashboard from "./pages/ProductsDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;