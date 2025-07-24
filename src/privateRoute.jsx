// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  const userRoles = Array.isArray(user.role) ? user.role : [user.role];
  const hasPermission = userRoles.some(role => allowedRoles.includes(role));

  if (!hasPermission) return <Navigate to="/notfound" />;

  return children;
};

export default ProtectedRoute;
