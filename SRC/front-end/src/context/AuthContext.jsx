// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { logout as apiLogout, getUserInfo } from "../services/productService";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Có lỗi khi đăng xuất");
    }
  };

  const loadUser = async () => {
    try {
      const res = await getUserInfo();
      setUser(res.data.infoUser);
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};