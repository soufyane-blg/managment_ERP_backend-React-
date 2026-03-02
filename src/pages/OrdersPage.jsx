import { useState, useEffect } from "react";
import OrdersList from "../components/OrdersList";
import OrderStats from "../components/OrderStats";
import { getOrders, completeOrder } from "../api/ordersApi";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  async function handleCompleteOrder(id) {
    await completeOrder(id);
    const data = await getOrders();
    setOrders(data);
  }

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Orders</h1>

      <div className="grid">
        <OrderStats orders={orders} />
      </div>

      <div className="card">
        <OrdersList
          orders={orders}
          onComplete={handleCompleteOrder}
        />
      </div>
    </div>
  );
}

export default OrdersPage;