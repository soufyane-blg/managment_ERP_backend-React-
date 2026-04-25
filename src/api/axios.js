import axios from "axios";
import API_BASE_URL from "../config";

const api = axios.create({
  baseURL: "https://solas-production-eb6f.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token && !config.url.includes("/auth/token/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 response interceptor (Auto Refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❗ إذا 401 ولم نحاول refresh بعد
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          `${API_BASE_URL}/auth/token/refresh/`,
          {
            refresh: refresh,
          }
        );

        // ✅ حفظ access الجديد
        localStorage.setItem("access", res.data.access);

        // ✅ إعادة الطلب الأصلي
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (err) {
        console.log("REFRESH FAILED");

        // ❌ logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;