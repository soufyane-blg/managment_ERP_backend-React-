import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/customers/${id}/`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setCustomer(data));

    fetch(`http://localhost:8000/api/orders/?customer=${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [id]);

  return (
    <div>
      <h2>{customer?.name}</h2>
      <p>{customer?.email}</p>

      <button
        onClick={() => navigate(`/orders/new?customer=${id}`)}
        style={{ marginBottom: "16px" }}
      >
        Add Order
      </button>

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
  );
}

export default CustomerDetails;