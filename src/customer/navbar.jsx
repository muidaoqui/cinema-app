import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FaFilm, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';

function Navbar() {
  const location = useLocation();
  const current = location.pathname;

  const navItems = [
    { path: "/customer/home", icon: <AiOutlineHome size={24} />, label: "Trang chủ" },
    { path: "/customer/cinema", icon: <FaFilm size={24} />, label: "Rạp phim" },
    { path: "/customer/product", icon: <FaShoppingCart size={24} />, label: "Sản phẩm" },
    { path: "/customer/news", icon: <MdLocalMovies size={24} />, label: "Điện ảnh" },
    { path: "/customer/account", icon: <FaUser size={24} />, label: "Tài khoản" },
  ];

  return (
    <footer className="fixed z-10 bottom-0 left-0 right-0 bg-white shadow-lg pb-4 pt-2">
      <nav>
        <ul className="flex justify-around text-gray-500 text-sm">
          {navItems.map((item) => (
            <li key={item.path} className="flex flex-col items-center hover:text-black">
              <Link to={item.path} className="flex flex-col items-center">
                {item.icon}
                <span className={`${current === item.path ? "text-orange-600 font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
