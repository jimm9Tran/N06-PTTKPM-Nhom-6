// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/productService";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      toast.success(response.data.message || "Đăng nhập thành công", {
        position: "top-right",
        autoClose: 3000,
      });
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi, vui lòng thử lại sau.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Đăng nhập tài khoản
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/user/password/forgot" className="text-blue-500 hover:underline">
            Quên mật khẩu?
          </a>
          <a href="/user/register" className="text-blue-500 hover:underline ml-20">
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;