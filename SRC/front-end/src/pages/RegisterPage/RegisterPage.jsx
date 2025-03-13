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
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Mật khẩu không khớp, vui lòng nhập lại!");
    }
    try {
      const response = await register({ fullName, email, password, confirmPassword });
      toast.success(response.data.message || "Đăng ký thành công");
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.error || "Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-800 dark:to-gray-900">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <div
          className="hidden md:block md:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://authentic-shoes.com/wp-content/uploads/2023/04/ecomm-image-promo-templateecomm_image_01_ab4e86e10cb44ea9aa65d9aefb4a422a.png')" }}
        ></div>
        {/* Phần bên phải: form đăng ký */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Tạo tài khoản
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Đăng ký
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Bạn đã có tài khoản?{" "}
            <a href="/user/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
