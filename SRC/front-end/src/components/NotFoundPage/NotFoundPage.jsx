import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-4">
      {/* Bạn có thể thay đường dẫn hình minh họa phù hợp */}
      <img 
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" 
        alt="Page not found" 
        className="w-60 md:w-80 mb-8"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Oops!</h1>
      <p className="text-lg md:text-2xl text-gray-600 mt-4 text-center max-w-md">
        Rất tiếc, chúng tôi không tìm thấy trang bạn đang tìm kiếm. Hãy thử quay trở lại trang chủ nhé!
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
