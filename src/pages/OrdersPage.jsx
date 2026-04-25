import { useState, useEffect } from "react";
import OrdersList from "../components/OrdersList";
import OrderStats from "../components/OrderStats";
import api from "../api/axios";
import { getOrders, completeOrder } from "../api/ordersApi";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  // ✅ GET ALL DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersData, customersRes, productsRes] = await Promise.all([
          getOrders(),
          api.get("/customers/"),
          api.get("/products/"),
        ]);

        // 🔥 حل DRF pagination
        setOrders(ordersData.results || ordersData);
        setCustomers(customersRes.data.results || customersRes.data);
        setProducts(productsRes.data.results || productsRes.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ COMPLETE order
  async function handleCompleteOrder(id) {
    try {
      await completeOrder(id);

      const data = await getOrders();
      setOrders(data.results || data);

    } catch (error) {
      console.error("Error completing order:", error);
    }
  }

  // ✅ CREATE order
  async function handleCreateOrder(e) {
    e.preventDefault();

    try {
      const res = await api.patch("/orders/", {
        customer_id: Number(customerId),
        items: [
          {
            product: Number(productId),
            quantity: Number(quantity),
          },
        ],
      });
      
      console.log("ORDER CREATED:", res.data);

      // 🔥 تحديث القائمة مباشرة
      const data = await getOrders();
      setOrders(data.results || data);

      // تنظيف الفورم
      setCustomerId("");
      setProductId("");
      setQuantity("");

    } catch (error) {
      console.error("ERROR:", error.response?.data);
    }
  }

  return (
    <div className="page">

      {/* HEADER */}
      <div className="table-header">
        <div>
          <h1 className="page-title">Orders</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Track and manage all orders
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="card form-card">
        <form className="form" onSubmit={handleCreateOrder}>

          {/* ✅ CUSTOMER DROPDOWN */}
          <select
              className="input"   // 🔥 نفس input
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* ✅ PRODUCT DROPDOWN */}
          <select
            className="input"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="form-actions">
            <button type="submit" className="add-btn">
              Save Order
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setCustomerId("");
                setProductId("");
                setQuantity("");
              }}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading...</p>
      ) : (
        <>
          <div className="grid">
            <OrderStats orders={orders} />
          </div>

          <div className="card">
            <div className="table-header">
              <h3>Orders List</h3>
            </div>

            <OrdersList
              orders={orders}
              onComplete={handleCompleteOrder}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;