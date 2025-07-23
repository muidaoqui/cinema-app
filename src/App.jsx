import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./customer/login";
import AdminPage from "./admin/home";
import ManagerPage from "./manager/homepos";
import CustomerPage from "./customer/home";

// Lấy user từ localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Route bảo vệ dựa vào role (hỗ trợ role dạng mảng)
const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  const userRoles = Array.isArray(user.role) ? user.role : [user.role];

  const hasPermission = userRoles.some(role => allowedRoles.includes(role));
  if (!hasPermission) return <Navigate to="/notfound" />;

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPage />} allowedRoles={["Admin"]} />}
        />
        <Route
          path="/manager"
          element={<ProtectedRoute element={<ManagerPage />} allowedRoles={["Manager"]} />}
        />
        <Route
          path="/customer"
          element={<ProtectedRoute element={<CustomerPage />} allowedRoles={["Customer"]} />}
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
