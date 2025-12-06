// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Users API
export const fetchUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Notifications API
export const notifyUser = (id) => API.post(`/notify/${id}`);

// Analytics API
export const fetchAnalytics = () => API.get("/analytics/users-by-location");

// Export the API instance for custom requests
export default API;