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
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Content-Type"] = "application/json";
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Automatically handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        // Clear token
        localStorage.removeItem("token");

        // Redirect to login only if not already on the auth page
        if (!window.location.pathname.includes("/auth")) {
          // Use absolute URL to avoid Next.js no-location-assign-relative-destination lint error
          window.location.href = `${window.location.origin}/auth`;
        }
      }
    }
    return Promise.reject(error);
  },
);
