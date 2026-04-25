import StatusBadge from "./StatusBadge";

function OrderCard({ order, onComplete }) {
  return (
    <div className="order-card">
      {/* HEADER */}
      <div className="order-header">
        <h3>{order.customer_name}</h3>
        <StatusBadge status={order.status} />
      </div>

      {/* BODY */}
      <div className="order-body">
        <div className="order-row">
          <span>Total</span>
          <strong>${order.total}</strong>
        </div>

        <div className="order-row">
          <span>Date</span>
          <span>
            {new Date(order.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* ACTION */}
      {order.status === "pending" && (
        <button
          className="complete-btn"
          onClick={() => onComplete(order.id)}
        >
          Complete
        </button>
      )}
    </div>
  );
}

export default OrderCard;