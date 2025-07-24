// LayoutCustomer.jsx
import React from "react";
import NavBar from "./navbar";
import { Outlet } from "react-router-dom";

function LayoutCustomer() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="mt-4">
        <Outlet /> {/* Hiển thị trang con */}
      </div>
    </div>
  );
}

export default LayoutCustomer;
