function OrdersTable({ orders, onView }) {
    if (!orders || orders.length === 0) {
      return <p>No orders</p>;
    }
  
    return (
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
  
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.total}$</td>
              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td>
                <button onClick={() => onView(order.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default OrdersTable;