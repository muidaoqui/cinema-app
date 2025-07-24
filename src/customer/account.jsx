import React, { useEffect, useState } from 'react';
import { FiSettings } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { BiBarcode } from "react-icons/bi";
import { FaMedal, FaBarcode, FaUserEdit, FaTicketAlt, FaLock, FaShieldAlt, FaFileContract, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Nếu chưa login, chuyển về login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { icon: <FaUserEdit />, label: "Chỉnh sửa thông tin", onClick: () => navigate('/customer/edit-profile') },
    { icon: <FaTicketAlt />, label: "Vé đã mua", onClick: () => navigate('/customer/my-tickets') },
    { icon: <FaLock />, label: "Thay đổi mật khẩu", onClick: () => console.log("Change Password") },
    { icon: <FaShieldAlt />, label: "Chính sách bảo mật", onClick: () => console.log("Privacy Policy") },
    { icon: <FaFileContract />, label: "Điều khoản", onClick: () => console.log("Terms & Conditions") },
  ];

  if (!user) return null;

  return (
    <div className='mb-28 mt-4 px-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold">Tài Khoản</h1>
        <button className='mt-1'>
          <FiSettings size={24} color="blue" />
        </button>
      </div>

      {/* Avatar và thông tin */}
      <div className='flex justify-between items-center mt-6'>
        <div className='flex items-center gap-4'>
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="avatar"
            className="w-20 h-20 rounded-lg shadow-lg"
          />
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FaMedal size={20} color="gold" />
              <p className="font-semibold">{user.fullname}</p>
            </div>
            <div className='flex items-center gap-2'>
              <BiBarcode size={20} color="#333" />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaBarcode size={20} />
          <p className="text-sm">ID: {user._id?.slice(-4)}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white shadow rounded-2xl mt-8 divide-y divide-gray-200">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition"
            onClick={item.onClick}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl text-gray-600">{item.icon}</span>
              <span className="text-gray-800 font-medium">{item.label}</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>
        ))}
      </div>

      {/* Nút đăng xuất */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-semibold transition"
      >
        <FaSignOutAlt className="inline mr-2" /> Đăng xuất
      </button>
    </div>
  );
}

export default Account;
