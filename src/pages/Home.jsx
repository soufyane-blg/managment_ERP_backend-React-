import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [customersRes, productsRes, ordersRes] = await Promise.all([
          api.get("/customers/"),
          api.get("/products/"),
          api.get("/orders/"),
        ]);

        // 🔥 حل مشكلة DRF pagination
        const customers = customersRes.data.results || customersRes.data;
        const products = productsRes.data.results || productsRes.data;
        const orders = ordersRes.data.results || ordersRes.data;

        // 🔥 تأكيد أنهم arrays
        const safeOrders = orders || [];
        const safeCustomers = customers || [];
        const safeProducts = products || [];

        // ✅ حساب revenue بدون crash
        const revenue = safeOrders.reduce((sum, order) => {
          return sum + (order.total || 0);
        }, 0);

        // ✅ آخر 5 طلبات
        const latestOrders = safeOrders.slice(-5).reverse();

        setStats({
          customers: safeCustomers.length,
          products: safeProducts.length,
          orders: safeOrders.length,
          revenue,
        });

        setRecentOrders(latestOrders);

      } catch (error) {
        console.error("Dashboard error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      {/* STATS */}
      <div className="grid">
        <div className="stat-card indigo">
          <div className="stat-value">{stats.customers}</div>
          <div className="stat-label">Total Customers</div>
        </div>

        <div className="stat-card teal">
          <div className="stat-value">{stats.products}</div>
          <div className="stat-label">Total Products</div>
        </div>

        <div className="stat-card amber">
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-label">Total Orders</div>
        </div>

        <div className="stat-card coral">
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-label">Revenue</div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card">
        <div className="table-header">
          <h3>Recent Orders</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {(recentOrders || []).map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer_name || order.customer}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;