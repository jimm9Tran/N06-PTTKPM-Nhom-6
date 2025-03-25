// src/services/userService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, 
});

export const getUserInfo = async () => {
  try {
    const response = await API.get("/user/info");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (data) => {
  try {
    const response = await API.patch("/user/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
