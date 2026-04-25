import OrderCard from "./OrderCard";

function OrdersList({ orders, onComplete }) {
  if (!orders.length) {
    return (
      <div className="empty-state">
        <h3>No orders yet</h3>
        <p>Orders will appear here once created</p>
      </div>
    );
  }

  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default OrdersList;