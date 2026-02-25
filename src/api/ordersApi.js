export async function getOrders() {
    const response = await fetch("http://127.0.0.1:8000/api/orders/");
    const data = await response.json();
    return data;
  }

export async function completeOrder(orderId) {
    await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/complete/`, {
      method: "PATCH",
    });
  }