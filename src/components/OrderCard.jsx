import StatusBadge from "./StatusBadge";

function OrderCard({ order, onComplete }) {
  return (
    <div className="order-card">
      <div>
        <h3>{order.customer_name}</h3>

        <div className="order-meta">
          <div>
            <strong>Total:</strong> ${order.total}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            <StatusBadge status={order.status} />
          </div>

          <div>
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {order.status === "pending" && (
        <button onClick={() => onComplete(order.id)}>
          Complete Order
        </button>
      )}
    </div>
  );
}

export default OrderCard;