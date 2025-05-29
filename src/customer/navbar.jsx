import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FaFilm, FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
function Navbar() {
  return (
    <div className="navbar">
      <footer className="mt-auto fixed z-10 bottom-0 left-0 right-0 bg-white shadow-lg pb-8 pt-4">
        <nav>
          <ul className="flex justify-center space-x-4 text-gray-500 text-sm">
  <li className="flex flex-col items-center hover:text-black cursor-pointer">
    <Link to="/" className="flex flex-col items-center">
      <AiOutlineHome size={24} />
      <span>Trang chủ</span>
    </Link>
  </li>
  <li className="flex flex-col items-center hover:text-black cursor-pointer">
    <Link to="/cinema" className="flex flex-col items-center">
      <FaFilm size={24} />
      <span>Rạp phim</span>
    </Link>
  </li>
  <li className="flex flex-col items-center hover:text-black cursor-pointer">
    <Link to="/products" className="flex flex-col items-center">
      <FaShoppingCart size={24} />
      <span>Sản phẩm</span>
    </Link>
  </li>
  <li className="flex flex-col items-center hover:text-black cursor-pointer">
    <Link to="/news" className="flex flex-col items-center">
      <MdLocalMovies size={24} />
      <span>Điện ảnh</span>
    </Link>
  </li>
  <li className="flex flex-col items-center hover:text-black cursor-pointer">
    <Link to="/account" className="flex flex-col items-center">
      <FaUser size={24} />
      <span>Tài khoản</span>
    </Link>
  </li>
</ul>
        </nav>
      </footer>
    </div>
  );
}

export default Navbar;