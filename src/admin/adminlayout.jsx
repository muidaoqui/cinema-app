// src/admin/AdminLayout.jsx
import React from "react";
import ToolBar from "./toolbar";
import NavbarAdmin from "./navbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar nằm trên cùng */}
      <ToolBar />

      <div className="flex w-full">
        {/* Navbar bên trái */}
        <div className="w-1/6 bg-gray-100">
          <NavbarAdmin />
        </div>

        {/* Outlet bên phải */}
        <div className="w-5/6 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
