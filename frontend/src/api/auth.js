import API from "./axios";

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const logoutUser = () => {
  return API.post("/users/logout");
};

export const loginUser = (data) => {
  return API.post("/users/login", data);
};

export const registerUser = (data) => {
  return API.post("/users/register", data);
};