import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../services/userService";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        if (response && !response.error) {
          setUserInfo(response.data);
        } else {
          setError(response.message || "Lỗi khi lấy thông tin người dùng");
        }
      } catch (err) {
        console.error(err);
        setError("Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br  dark:from-gray-900 dark:to-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Phần ảnh đại diện */}
          <div className="md:w-1/3 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
            <div className="relative w-40 h-40">
              <img
                src={userInfo.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXKkELt_XuteDLQY_HKcilbvgT3LDOm5WkQ&s"}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-md"
              />
            </div>
          </div>
          {/* Phần thông tin chi tiết */}
          <div className="md:w-2/3 p-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {userInfo.fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <strong>Số điện thoại:</strong> {userInfo.phone || "Chưa cập nhật"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              <strong>Ngày tham gia:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Trạng thái:</strong> <span className="text-green-600 dark:text-green-400">{userInfo.status}</span>
            </p>
            {/* Nút điều hướng */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/user/edit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow transition-colors duration-200 text-center"
              >
                Chỉnh sửa thông tin
              </Link>
              <Link
                to="/user/change-password"
                className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow transition-colors duration-200 text-center"
              >
                Đổi mật khẩu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
