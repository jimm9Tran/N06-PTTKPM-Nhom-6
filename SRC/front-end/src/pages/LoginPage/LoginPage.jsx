// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/productService";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error(
        error.response?.data?.error ||
          "Đã xảy ra lỗi, vui lòng thử lại sau.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-800 dark:to-gray-900">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Phần bên trái: hình ảnh minh họa (chỉ hiển thị trên md trở lên) */}
        <div
          className="hidden md:block md:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://authentic-shoes.com/wp-content/uploads/2023/04/253389014_736918611035166_7098530911705211083_n_43028550aaa04188a970f7d06aa83ae2-1536x1536.png')",
          }}
        ></div>
        {/* Phần bên phải: form đăng nhập */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Đăng nhập tài khoản
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Đăng nhập
            </button>
          </form>
          <div className="mt-4 text-center">
            <a
              href="/user/password/forgot"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Quên mật khẩu?
            </a>
            <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>
            <a
              href="/user/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
