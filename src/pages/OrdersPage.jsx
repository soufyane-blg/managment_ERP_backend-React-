import { useState, useEffect } from "react";
import Header from "../components/Header";
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
    <div>
      <Header />
      <OrderStats orders={orders} />
      <OrdersList orders={orders} onComplete={handleCompleteOrder} />
    </div>
  );
}

export default OrdersPage;