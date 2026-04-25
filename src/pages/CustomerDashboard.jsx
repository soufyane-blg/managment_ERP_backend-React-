import { useState, useEffect } from "react";
import CustomersTable from "../components/CustomersTabel";
import api from "../api/axios";

function CustomersDashboard() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // ✅ GET customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/customers/");
        console.log("CUSTOMERS:", res.data);
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error.response);
      }
    };

    fetchCustomers();
  }, []);

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      phone: Number(phone),
      email,
    };

    try {
      let res;

      if (editingCustomer) {
        // ✏️ update
        res = await api.patch(`/customers/${editingCustomer.id}/`, payload);

        setCustomers(
          customers.map((c) =>
            c.id === res.data.id ? res.data : c
          )
        );
      } else {
        // ➕ add
        res = await api.post("/customers/", payload);
        setCustomers([...customers, res.data]);
      }

      // 🧹 reset
      setName("");
      setPhone("");
      setEmail("");
      setEditingCustomer(null);
      setShowForm(false);

    } catch (error) {
      console.error("Error saving customer:", error.response);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}/`);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error.response);
    }
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="table-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Manage all your customers in one place
          </p>
        </div>

        {!showForm && (
          <button
            className="add-btn small"
            onClick={() => setShowForm(true)}
          >
            + Add Customer
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit} className="form">

            <input
              placeholder="Customer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit" className="add-btn">
                {editingCustomer ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingCustomer(null);
                  setName("");
                  setPhone("");
                  setEmail("");
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="card">
        <div className="table-header">
          <h3>Customer List</h3>
        </div>

        <CustomersTable
          customers={customers}
          onDelete={handleDelete}
          onEdit={(customer) => {
            setEditingCustomer(customer);
            setName(customer.name);
            setPhone(customer.phone);
            setEmail(customer.email);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
}

export default CustomersDashboard;