import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";

function EditProfile() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("John Doe");
  const [age, setAge] = useState(28);
  const [address, setAddress] = useState("8502 Preston Rd. Inglewood, USA");
  const [email, setEmail] = useState("john.doe@example.com");

  const handleUpdate = async () => {
    const updatedUser = {
      name: fullname,
      age: age,
      address: address,
      email: email,
    };

    try {
      const userId = "684ada100e6a89f4a538536b"; // ID mẫu
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, updatedUser);
      alert("Cập nhật thành công!");
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi cập nhật người dùng:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }

    try {
      const userId = "684ada100e6a89f4a538536b"; // ID mẫu
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, updatedUser);
      alert("Cập nhật thành công!");
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi cập nhật người dùng:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 relative">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="absolute left-4 top-4 text-xl text-gray-600">
        <IoChevronBack size={24} />
      </button>

      <h2 className="text-center text-xl font-semibold mb-6">Edit Profile</h2>

      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Avatar"
          className="w-full h-full rounded-full object-cover border-4 border-white shadow"
        />
        <div className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full cursor-pointer">
          <FaCamera className="text-white text-sm" />
        </div>
      </div>

      {/* Fullname */}
      <div className="mb-4">
        <label className="text-sm text-red-500 font-medium ml-1">Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Age */}
      <div className="mb-4">
        <label className="text-sm text-red-500 font-medium ml-1">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="text-sm text-red-500 font-medium ml-1">Enter Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        />
      </div>

      {/* Update button */}
      <button
        onClick={handleUpdate}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Update
      </button>
    </div>
  );
}

export default EditProfile;
