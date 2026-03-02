import { useState, useEffect } from "react";
import CustomersTable from "../components/CustomersTabel";

function CustomersDashboard() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/customers/", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      phone: Number(phone),
      email,
    };

    const csrfToken = getCookie("csrftoken");

    try {
      let url = "http://localhost:8000/api/customers/";
      let method = "POST";

      if (editingCustomer) {
        url = `http://localhost:8000/api/customers/${editingCustomer.id}/`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save customer");
      }

      const savedCustomer = await response.json();

      if (editingCustomer) {
        setCustomers(
          customers.map((c) =>
            c.id === savedCustomer.id ? savedCustomer : c
          )
        );
      } else {
        setCustomers([...customers, savedCustomer]);
      }

      setName("");
      setPhone("");
      setEmail("");
      setEditingCustomer(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const csrfToken = getCookie("csrftoken");

      const response = await fetch(
        `http://localhost:8000/api/customers/${id}/`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setCustomers(customers.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Customers</h1>

      <button onClick={() => setShowForm(true)}>
        Add Customer
      </button>

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit">
              {editingCustomer ? "Update" : "Save"}
            </button>
          </form>
        </div>
      )}

      <div className="card">
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

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(
          cookie.substring(name.length + 1)
        );
        break;
      }
    }
  }
  return cookieValue;
}

export default CustomersDashboard;
  
