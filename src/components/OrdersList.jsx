import OrderCard from "./OrderCard";

function OrdersList({ orders, onComplete }) {
  return (
    <div>
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