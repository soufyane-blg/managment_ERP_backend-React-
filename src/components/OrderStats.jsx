import { ORDER_STATUS } from "../constants/orderStatus";


function OrderStats({ orders }) {
    
    if (!orders || orders.length === 0) {
        return <p>No orders yet</p>;
      }
    
    const totalOrders = orders.length;
  
    const pendingOrders = orders.filter(
      (order) => order.status === ORDER_STATUS.PENDING
    ).length;
  
    const completedOrders = orders.filter(
      (order) => order.status === ORDER_STATUS.COMPLETED
    ).length;
  
    const cancelledOrders = orders.filter(
      (order) => order.status === ORDER_STATUS.CANCELLED
    ).length;
  
    return (
      <div style={{ marginBottom: "20px" }}>
        <h3>Stats</h3>
        <p>Total Orders: {totalOrders}</p>
        <p>Pending Orders: {pendingOrders}</p>
        <p>Completed Orders: {completedOrders}</p>
        <p>Cancelled Orders: {cancelledOrders}</p>
      </div>
    );
  }
  
  export default OrderStats;