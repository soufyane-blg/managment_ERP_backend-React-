import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderItemsTable from "../components/OrderItemsTable";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/orders/${id}/`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order #{order.id}</h2>

      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> {order.total}$</p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(order.created_at).toLocaleDateString()}
      </p>

      <hr />

      <h3>Customer</h3>
      <p>{order.customer_name}</p>
      <button
        onClick={() => navigate(`/customers/${order.customer_id}`)}
      >
        View Customer
      </button>

      <hr />

      <h3>Items</h3>
      {order.items.length === 0 ? (
        <p>No items</p>
      ) : (
        <OrderItemsTable items={order.items} />
      )}
    </div>
  );
}

export default OrderDetails;