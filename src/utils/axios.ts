import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// For protected routes
// Automatically attach JWT token if available in local storage
api.interceptors.request.use((config) => {
  console.log("Intercepted");

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("Inter TOken: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
