import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const loginUser = (data) =>
  API.post("/users/login", data);

// FINAL submission (credentials + images)
export const registerUser = (formData) =>
  API.post("/users/register", formData);

export default API;
