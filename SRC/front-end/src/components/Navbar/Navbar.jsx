// src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from 'react';
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import DarkMode from './DarkMode';
import UserMenu from '../UserMenu/UserMenu';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const MenuLinks = [
  { id: 1, name: "Trang chủ", link: "/" },
  { id: 2, name: "Giày", link: "/products" },
  { id: 3, name: "Giới thiệu", link: "/#about" },
  { id: 4, name: "Tin tức - Sự kiện", link: "/#blog" },
];

const DropdownLinks = [
  { id: 1, name: "Sản phẩm nổi bật", link: "/#" },
  { id: 2, name: "Sản phẩm bán chạy", link: "/#" },
  { id: 3, name: "Top Rated", link: "/#" },
];

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const cartQuantity = cart && cart.products 
    ? cart.products.reduce((sum, item) => sum + item.quantity, 0) 
    : 0;

  // console.log(cart)

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo và Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              JM Shoes
            </Link>
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      to={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {data.name}
                    </Link>
                  </li>
                ))}
                {/* Dropdown */}
                <li className="relative cursor-pointer group">
                  <Link
                    to="#"
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Tuỳ chọn
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </Link>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                    <ul className="space-y-2">
                      {DropdownLinks.map((data) => (
                        <li key={data.id}>
                          <Link
                            to={data.link}
                            className="text-gray-500 inline-block w-full p-2 font-semibold dark:hover:text-white duration-200 hover:bg-primary/20 rounded-md"
                          >
                            {data.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Phần bên phải Navbar */}
          <div className="flex justify-between items-center gap-4">
            {/* Thanh tìm kiếm */}
            <div className="relative group hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="search-bar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-3 duration-200">
                  <IoMdSearch className="text-xl text-gray-600 dark:text-gray-400 group-hover:text-primary" />
                </button>
              </form>
            </div>
            {/* Giỏ hàng */}
            <Link to="/cart">
              <button className="relative p-3">
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {cartQuantity}
                </div>
              </button>
            </Link>
            {/* Dark Mode */}
            <DarkMode />
            {/* User Menu */}
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;  