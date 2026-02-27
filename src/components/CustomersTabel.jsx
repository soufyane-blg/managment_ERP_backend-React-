function CustomersTable({ customers, onDelete, onEdit }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.email}</td>
            <td>
              {new Date(customer.created_at).toLocaleDateString()}
            </td>
            <td>
              <button onClick={() => onEdit(customer)}>Edit</button>
              <button onClick={() => onDelete(customer.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
export default CustomersTable;