import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});




API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const loginUser = (data) =>
  API.post("/users/login", data);

// FINAL submission (credentials + images)
export const registerUser = (formData) =>
  API.post("/users/register", formData);

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const logoutUser = () => API.post("/users/logout");

export default API;
