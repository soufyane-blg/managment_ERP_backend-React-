// src/api/ordersApi.js

import api from "./axios";

// ✅ GET ORDERS
export const getOrders = async () => {
  const res = await api.get("/orders/");
  return res.data;
};

// ✅ COMPLETE ORDER
export const completeOrder = async (id) => {
  const res = await api.patch(`/orders/${id}/complete/`);
  return res.data;
};