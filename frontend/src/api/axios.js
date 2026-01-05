import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1", // your backend
  withCredentials: true, // for cookies if JWT stored in httpOnly
});

export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (data) => API.post("/users/register", data);

export default API;
