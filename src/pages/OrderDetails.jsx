import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import OrderItemsTable from "../components/OrderItemsTable";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FORM STATE
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  // ✅ GET ORDER
  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}/`);
      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD ITEM TO ORDER
  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/orders/${id}/add_item/`, {
        product: Number(productId),
        quantity: Number(quantity),
      });

      await fetchOrder();

      // تنظيف + إخفاء
      setProductId("");
      setQuantity("");
      setShowForm(false);

    } catch (error) {
      console.error("ERROR:", error.response?.data);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="page">
      <h2 className="page-title">Order #{order.id}</h2>

      {/* ORDER INFO */}
      <div className="card">
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.total}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* CUSTOMER */}
      <div className="card">
        <h3>Customer</h3>
        <p>{order.customer_name || order.customer}</p>

        <button
          className="add-btn small"
          onClick={() => navigate(`/customers/${order.customer_id}`)}
        >
          View Customer
        </button>
      </div>

      {/* ADD ITEM BUTTON */}
      {!showForm && (
        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Item
        </button>
      )}

      {/* FORM */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleAddItem} className="form">

            <input
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />

            <input
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit" className="add-btn">
                Save
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setProductId("");
                  setQuantity("");
                }}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ITEMS */}
      <div className="card">
        <h3>Items</h3>

        {!order.items || order.items.length === 0 ? (
          <p>No items</p>
        ) : (
          <OrderItemsTable items={order.items} />
        )}
      </div>
    </div>
  );
}

export default OrderDetails;