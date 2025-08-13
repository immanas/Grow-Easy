// src/api.js

export const API_URL = "https://y2x0b848uf.execute-api.ap-south-1.amazonaws.com/prod/GrowEasyDashboardDataAPI";

// Fetch all dashboard data
export async function fetchDashboard() {
  try {
    const res = await fetch(`${API_URL}/dashboard`);
    if (!res.ok) throw new Error("Failed to fetch dashboard");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    return {};
  }
}

// Fetch all products
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// Apply new price to a product
export async function applyPrice(productId, newPrice) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    });
    if (!res.ok) throw new Error("Failed to update price");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error updating price:", err);
    return null;
  }
}

// Fetch forecast data
export async function fetchForecast() {
  try {
    const res = await fetch(`${API_URL}/forecast`);
    if (!res.ok) throw new Error("Failed to fetch forecast");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching forecast:", err);
    return [];
  }
}
