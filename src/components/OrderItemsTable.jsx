function OrderItemsTable({ items }) {
    if (!items || items.length === 0) {
      return <p>No items in this order</p>;
    }
  
    return (
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
  
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}$</td>
              <td>{item.quantity * item.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default OrderItemsTable;