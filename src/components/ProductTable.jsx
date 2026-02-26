function ProductTable({ products, onDelete, onEdit }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              {new Date(product.created_at).toLocaleDateString()}
            </td>
            <td>
              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={() => onDelete(product.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default ProductTable;