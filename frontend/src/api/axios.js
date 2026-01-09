import axios from "axios";
import toast from "react-hot-toast";

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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export const loginUser = (data) =>
  API.post("/users/login", data);

// FINAL submission (credentials + images)
export const registerUser = (formData) =>
  API.post("/users/register", formData);

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const logoutUser = () =>{
 return API.post("/users/logout")
};


export const updateAvatar = (file) => {
  const formData = new FormData();
  formData.append("avataar", file);

  return API.patch("/users/avatar", formData);
};

export const updateCover = (file) => {
  const formData = new FormData();
  formData.append("coverImage", file);

  return API.patch("/users/cover", formData);
};

export default API;
