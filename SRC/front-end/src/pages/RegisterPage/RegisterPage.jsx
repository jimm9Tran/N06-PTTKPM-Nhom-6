// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/productService";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ fullName, email, password });
      toast.success(response.data.message || "Đăng ký thành công");
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800 dark:text-white">Đăng ký tài khoản</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
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
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Mật khẩu</label>
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
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">Đăng ký</button>

          <div className="mt-4 text-right ">
            <a href="/user/login" className="text-blue-500 hover:underline">Bạn đã có tài khoản?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;