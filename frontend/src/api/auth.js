import API from "./axios";

export const getCurrentUser = () => {
  return API.get("/users/me");
};

export const logoutUser = () => {
  return API.post("/users/logout");
};