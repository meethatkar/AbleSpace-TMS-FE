import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEST_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if available in local storage
// api.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });
