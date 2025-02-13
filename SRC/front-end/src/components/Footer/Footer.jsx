import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 font-sans">
      {/* Phần nội dung chính của Footer */}
      <div className="px-4 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Cột 1: Thông tin JM Shoes */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase dark:text-white">
              JM Shoes
            </h3>
            <p className="text-sm dark:text-gray-400">
              Jimm9 Shoes là địa chỉ tin cậy cung cấp các sản phẩm giày chính hãng đến từ nhiều thương hiệu nổi tiếng như Nike, Adidas, Jordan,...
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-sm dark:text-gray-400">
                Địa chỉ: Số 123, Đường ABC, Quận XYZ, TP. HN
              </p>
              <p className="text-sm dark:text-gray-400">
                Hotline: 0909 999 999
              </p>
              <p className="text-sm dark:text-gray-400">
                Email: support@jimm9-shoes.com
              </p>
            </div>
          </div>

          {/* Cột 2: Chính sách */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase dark:text-white">
              Chính sách
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Chính sách vận chuyển
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase dark:text-white">
              Hỗ trợ
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Hỏi đáp - FAQ
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Kiểm tra đơn hàng
                </a>
              </li>
              <li>
                <a href="# " className="hover:underline dark:text-gray-300">
                  Tư vấn khách hàng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Phần thanh toán và mạng xã hội */}
      <div className="px-4 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Logo các hình thức thanh toán */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <img
              src="https://via.placeholder.com/60x30.png?text=VISA"
              alt="visa"
              className="h-6 object-contain"
            />
            <img
              src="https://via.placeholder.com/60x30.png?text=Master"
              alt="master"
              className="h-6 object-contain"
            />
            <img
              src="https://via.placeholder.com/60x30.png?text=MOMO"
              alt="momo"
              className="h-6 object-contain"
            />
            <img
              src="https://via.placeholder.com/60x30.png?text=PAYPAL"
              alt="paypal"
              className="h-6 object-contain"
            />
          </div>

          {/* Icon mạng xã hội */}
          <div className="flex gap-4 justify-center md:justify-end">
            <a
              href="# "
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {/* Facebook Icon */}
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-blue-600"
              >
                <path d="M22.525 0H1.468C.655 0 0 .655 0 1.468v21.057C0 23.345.655 24 1.468 24h11.349v-9.289H9.845v-3.62h2.972V8.41c0-2.941 1.796-4.549 4.42-4.549 1.256 0 2.336.093 2.648.135v3.073h-1.818c-1.428 0-1.703.678-1.703 1.672v2.193h3.404l-.444 3.62h-2.96V24h5.803c.813 0 1.468-.655 1.468-1.468V1.468C23.993.655 23.338 0 22.525 0z" />
              </svg>
            </a>
            <a
              href="# "
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {/* Instagram Icon */}
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-pink-600"
              >
                <path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07c1.17,0.054,1.978,0.24,2.438,0.403c0.61,0.21,1.045,0.46,1.506,0.922 c0.462,0.462,0.713,0.896,0.922,1.506c0.163,0.46,0.349,1.268,0.403,2.438c0.058,1.266,0.07,1.646,0.07,4.85 s-0.012,3.584-0.07,4.85c-0.054,1.17-0.24,1.978-0.403,2.438c-0.21,0.61-0.46,1.045-0.922,1.506 c-0.462,0.462-0.896,0.713-1.506,0.922c-0.46,0.163-1.268,0.349-2.438,0.403c-1.266,0.058-1.646,0.07-4.85,0.07 s-3.584-0.012-4.85-0.07c-1.17-0.054-1.978-0.24-2.438-0.403c-0.61-0.21-1.045-0.46-1.506-0.922 c-0.462-0.462-0.713-0.896-0.922-1.506c-0.163-0.46-0.349-1.268-0.403-2.438C2.175,15.746,2.163,15.366,2.163,12 s0.012-3.584,0.07-4.85c0.054-1.17,0.24-1.978,0.403-2.438c0.21-0.61,0.46-1.045,0.922-1.506 c0.462-0.462,0.896-0.713,1.506-0.922c0.46-0.163,1.268-0.349,2.438-0.403C8.416,2.175,8.796,2.163,12,2.163 M12,0 C8.74,0,8.332,0.015,7.052,0.072C5.773,0.13,4.832,0.315,4.06,0.596c-0.78,0.29-1.438,0.676-2.093,1.33 C1.314,2.58,0.928,3.238,0.638,4.018C0.357,4.79,0.172,5.731,0.114,7.01C0.057,8.29,0.042,8.698,0.042,12 s0.015,3.71,0.072,4.99c0.058,1.279,0.243,2.22,0.524,2.992c0.29,0.78,0.676,1.438,1.33,2.093 c0.655,0.655,1.312,1.04,2.093,1.33c0.772,0.28,1.713,0.466,2.992,0.524C8.332,23.985,8.74,24,12,24 s3.71-0.015,4.99-0.072c1.279-0.058,2.22-0.243,2.992-0.524c0.78-0.29,1.438-0.676,2.093-1.33 c0.655-0.655,1.04-1.312,1.33-2.093c0.28-0.772,0.466-1.713,0.524-2.992C23.985,15.71,24,15.302,24,12s-0.015-3.71-0.072-4.99 c-0.058-1.279-0.243-2.22-0.524-2.992c-0.29-0.78-0.676-1.438-1.33-2.093c-0.655-0.655-1.312-1.04-2.093-1.33 C19.21,0.357,18.269,0.172,16.99,0.114C15.71,0.057,15.302,0.042,12,0L12,0z" />
                <path d="M12 5.838A6.163 6.163 0 1 0 12 18.164 6.163 6.163 0 1 0 12 5.838zM12 15.499A3.499 3.499 0 1 1 12 8.501a3.499 3.499 0 1 1 0 6.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 1 0 0-2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="bg-gray-200 dark:bg-gray-800 mt-10 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Jimm9 Shoes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
