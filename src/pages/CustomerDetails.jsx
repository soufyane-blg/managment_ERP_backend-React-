import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import OrdersTable from "../components/OrdersTable";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ axios بدل fetch
        const [customerRes, ordersRes] = await Promise.all([
          api.get(`/customers/${id}/`),
          api.get(`/orders/?customer=${id}`),
        ]);

        setCustomer(customerRes.data);

        // 🔥 حل pagination (مهم جدًا)
        const ordersData = ordersRes.data;
        setOrders(ordersData.results || ordersData);

      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!customer) {
    return <p>Customer not found</p>;
  }

  return (
    <div className="page">
      {/* CUSTOMER INFO */}
      <div className="card">
        <h2 className="page-title">{customer.name}</h2>
        <p>{customer.email}</p>
      </div>

      {/* ACTION */}
      <div style={{ marginBottom: "16px" }}>
        <button
          className="add-btn small"
          onClick={() => navigate(`/orders/new?customer=${id}`)}
        >
          Add Order
        </button>
      </div>

      {/* ORDERS */}
      <div className="card">
        <h3>Orders</h3>

        {orders.length === 0 ? (
          <p>No orders for this customer</p>
        ) : (
          <OrdersTable
            orders={orders}
            onView={(orderId) => navigate(`/orders/${orderId}`)}
          />
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;