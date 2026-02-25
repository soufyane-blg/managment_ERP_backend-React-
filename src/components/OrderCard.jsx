import StatusBadge from "./StatusBadge";


function OrderCard({ order, onComplete }) {
    return (
      <div>
        <h3>{order.customer}</h3>
        <p>Total: ${order.total}</p>
        <p>Status: <StatusBadge status={order.status} /></p>
        <p>Date: {order.created_at}</p>
  
        {order.status === "pending" && (
        <button onClick={() => onComplete(order.id)}>
        Complete Order
        </button>
        )}
  
        <hr />
      </div>
    );
  }
  
  export default OrderCard;