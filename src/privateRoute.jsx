import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <Navigate to="/login" />;
  }

  const userRole = storedUser.role?.[0];

  // Nếu role không phù hợp
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
