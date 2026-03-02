// src/api/ordersApi.js

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

export async function getOrders() {
  const response = await fetch("http://localhost:8000/api/orders/", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

export async function completeOrder(id) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/orders/${id}/complete/`,
    {
      method: "POST",
      credentials: "include", // 🔴 مهم
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to complete order");
  }
}