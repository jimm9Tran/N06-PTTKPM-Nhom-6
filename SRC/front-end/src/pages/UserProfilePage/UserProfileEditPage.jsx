import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../services/userService";

const UserProfileEdit = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        if (response && !response.error) {
          setUserInfo(response.data);
          setFormData({
            fullName: response.data.fullName,
            email: response.data.email,
            phone: response.data.phone || ""
          });
        } else {
          setError(response.message || "Lỗi khi lấy thông tin người dùng");
        }
      } catch (err) {
        console.error("Fetch user info error:", err);
        setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const response = await updateUserInfo(formData);
      if (response && !response.error) {
        setUserInfo(response.data);
        navigate("/user/info");
      } else {
        setError(response.message || "Lỗi khi cập nhật thông tin");
      }
    } catch (err) {
      console.error("Update user error:", err);
      setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  dark:from-gray-900 dark:to-gray-900 dark:text-gray-200">
        Đang tải thông tin...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            Chỉnh sửa thông tin tài khoản
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Tên người dùng
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-center text-red-500">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors duration-200"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={() => navigate("/user/info")}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-full transition-colors duration-200"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
