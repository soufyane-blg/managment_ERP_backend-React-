import OrderCard from "./OrderCard";

function OrdersList({ orders, onComplete }) {
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