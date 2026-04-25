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
            <td>
              <strong>{product.name}</strong>
            </td>

            <td>${product.price}</td>

            <td>{product.quantity}</td>

            <td>
              {new Date(product.created_at).toLocaleDateString()}
            </td>

            {/* ✅ الأزرار بشكل احترافي */}
            <td>
              <div className="actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => onDelete(product.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;