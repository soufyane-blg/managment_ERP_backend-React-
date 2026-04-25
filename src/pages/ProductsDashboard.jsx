import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import api from "../api/axios";

function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // ✅ GET products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/");
        console.log("PRODUCTS:", res.data);
        setProducts(res.data.results || res.data);
      } catch (error) {
        console.error("Error fetching products:", error.response);
      }
    };

    fetchProducts();
  }, []);

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      price,
      quantity: Number(quantity),
      min_stock_alert: 0,
    };

    try {
      let res;

      if (editingProduct) {
        // ✏️ update
        res = await api.patch(`/products/${editingProduct.id}/`, payload);

       
        setProducts((prevProducts) =>
          (prevProducts || []).map((p) =>
            p.id === res.data.id ? res.data : p
          )
        );
      } else {
        // ➕ add
        res = await api.post("/products/", payload);
        setProducts([...products, res.data]);
      }

      resetForm();

    } catch (error) {
      console.error("Error saving product:", error.response);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}/`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.response);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="table-header">
        <h1 className="page-title">Products</h1>

        {!showForm && (
          <button
            className="add-btn small"
            onClick={() => setShowForm(true)}
          >
            + Add Product
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="card form-card">
          <form onSubmit={handleSubmit} className="form">

            <input
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit" className="add-btn">
                {editingProduct ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="card">
        <ProductTable
          products={products}
          onDelete={handleDelete}
          onEdit={(product) => {
            setEditingProduct(product);
            setName(product.name);
            setPrice(product.price);
            setQuantity(product.quantity);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
}

export default ProductsDashboard;