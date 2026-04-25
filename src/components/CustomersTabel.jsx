import { useNavigate } from "react-router-dom";

function CustomersTable({ customers, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>
              <strong>{customer.name}</strong>
            </td>

            <td>{customer.phone}</td>

            <td style={{ color: "var(--muted)" }}>
              {customer.email}
            </td>

            <td>
              {new Date(customer.created_at).toLocaleDateString()}
            </td>

            {/* ✅ الإصلاح هنا */}
            <td>
              <div className="actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(customer)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() => onDelete(customer.id)}
                >
                  🗑 Delete
                </button>

                <button
                  className="btn-view"
                  onClick={() =>
                    navigate(`/customers/${customer.id}`)
                  }
                >
                  👁 Orders
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomersTable;