import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";

function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/products/", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name,
      price,
      quantity: Number(quantity),
      min_stock_alert: 0,
    };
  
    const csrfToken = getCookie("csrftoken");
  
    try {
      let url = "http://localhost:8000/api/products/";
      let method = "POST";
  
      
      if (editingProduct) {
        url = `http://localhost:8000/api/products/${editingProduct.id}/`;
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
        throw new Error("Failed to save product");
      }
  
      const savedProduct = await response.json();
  
      
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === savedProduct.id ? savedProduct : p
          )
        );
      } else {
        setProducts([...products, savedProduct]);
      }
  
      
      setName("");
      setPrice("");
      setQuantity("");
      setEditingProduct(null);
      setShowForm(false);
  
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const csrfToken = getCookie("csrftoken");

      const response = await fetch(
        `http://localhost:8000/api/products/${id}/`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Products Dashboard</h1>

      <button onClick={() => setShowForm(true)}>Add Product</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button type="submit">
            {editingProduct ? "Update" : "Save"}
          </button>
        </form>
      )}

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

export default ProductsDashboard;
  
