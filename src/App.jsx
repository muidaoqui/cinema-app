import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./customer/login";

// ADMIN components
import AdminPage from "./admin/home";
import AdminCinema from "./admin/cinema";
import AdminMovie from "./admin/movie";
import AdminComing from "./admin/coming";
import AdminDiscount from "./admin/discount";
import AdminNews from "./admin/news";
import AdminProduct from "./admin/product";
import ToolBar from "./admin/toolbar";

// MANAGER components
import ManagerPage from "./manager/homepos";
import MoviesPOS from "./manager/moviespos";
import ProductsPOS from "./manager/productspos";
import SeatSelectorPOS from "./manager/seatselectorpos";
import ConfirmPOS from "./manager/confirmpos";
import MovieDetails from "./manager/moviedetails";

// CUSTOMER components
import CustomerPage from "./customer/home";
import Cinema from "./customer/cinema";
import BookTicket from "./customer/bookticket";
import Detail from "./customer/detail";
import EditProfile from "./customer/editprofile";
import News from "./customer/news";
import Product from "./customer/product";
import SeatSelector from "./customer/seatselector";
import Account from "./customer/account";
import Confirm from "./customer/confirm";
import MyTickets from "./customer/mytickets";

// Layouts
import CustomerLayout from "./customer/customerlayout";
import AdminLayout from "./admin/adminlayout";

import { ThemeProvider } from "./admin/themecontext";

// Lấy user từ localStorage
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Route bảo vệ dựa vào role
const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />;

  const userRoles = Array.isArray(user.role) ? user.role : [user.role];
  const hasPermission = userRoles.some(role => allowedRoles.includes(role));

  return hasPermission ? element : <Navigate to="/notfound" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
              element={
                <ThemeProvider>
                  <AdminLayout />
                </ThemeProvider>
              }
            />
          }
        >
          <Route path="/admin/home" element={<AdminPage />} />
          <Route path="/admin/cinema" element={<AdminCinema />} />
          <Route path="/admin/movie" element={<AdminMovie />} />
          <Route path="/admin/coming" element={<AdminComing />} />
          <Route path="/admin/discount" element={<AdminDiscount />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/toolbar" element={<ToolBar />} />
        </Route>

        {/* MANAGER */}
        <Route path="/manager/homepos" element={<ProtectedRoute element={<ManagerPage />} allowedRoles={["Manager"]} />} />
        <Route path="/manager/moviespos" element={<ProtectedRoute element={<MoviesPOS />} allowedRoles={["Manager"]} />} />
        <Route path="/manager/productspos" element={<ProtectedRoute element={<ProductsPOS />} allowedRoles={["Manager"]} />} />
        <Route path="/manager/seatselectorpos" element={<ProtectedRoute element={<SeatSelectorPOS />} allowedRoles={["Manager"]} />} />
        <Route path="/manager/confirmpos" element={<ProtectedRoute element={<ConfirmPOS />} allowedRoles={["Manager"]} />} />
        <Route path="/manager/moviedetails" element={<ProtectedRoute element={<MovieDetails />} allowedRoles={["Manager"]} />} />

        {/* CUSTOMER Layout */}
        <Route element={<ProtectedRoute element={<CustomerLayout />} allowedRoles={["Customer"]} />}>
          <Route path="/customer/home" element={<CustomerPage />} />
          <Route path="/customer/cinema" element={<Cinema />} />
          
          <Route path="/customer/detail/:id" element={<Detail />} />
          <Route path="/customer/edit-profile" element={<EditProfile />} />
          <Route path="/customer/news" element={<News />} />
          <Route path="/customer/product" element={<Product />} />
          <Route path="/customer/seatselector" element={<SeatSelector />} />
          <Route path="/customer/account" element={<Account />} />
          
          <Route path="/customer/my-tickets" element={<MyTickets />} />
        </Route>
        <Route path="/customer/bookticket" element={<BookTicket />} />
        <Route path="/customer/confirm" element={<Confirm />} />
        {/* Not Found */}
        <Route path="/notfound" element={<div>Không có quyền truy cập.</div>} />
        <Route path="*" element={<div>404 - Không tìm thấy trang.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
