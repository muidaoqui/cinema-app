// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './customer/home';
// import Cinema from './customer/cinema';
// import Product from './customer/product';
// import News from './customer/news';
// import Account from './customer/account';
// import Navbar from './customer/navbar';
// import Detail from './customer/detail';
// import SeatSelector from './customer/seatselector'; 
// import BookTicket from './customer/bookticket';
// import EditProfile from './customer/editprofile';
// import Login from './customer/login';
// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen pb-24">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cinema" element={<Cinema />} />
//           <Route path="/products" element={<Product />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/detail/:id" element={<Detail />} />
//           <Route path="/account" element={<Account />} />
//           <Route path="/seatselector/:id" element={<SeatSelector />} />
//           <Route path="/bookticket" element={<BookTicket />} />
//           <Route path="/edit-profile" element={<EditProfile />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//         <Navbar />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from './admin/themecontext'; // Import ThemeProvider
// import NavbarAdmin from './admin/navbar';
// import Account from './admin/home';
// import Movie from './admin/movie';
// import Cinema from './admin/cinema';
// import News from './admin/news';
// import Product from './admin/product';
// import Discount from './admin/discount';
// import Coming from './admin/coming';
// import ToolBar from './admin/toolbar'
// function App() {
//   return (
//     <ThemeProvider> {/* Bọc các component con bằng ThemeProvider */}
//       <BrowserRouter>
//         <div >
//           <ToolBar />
//           <NavbarAdmin />
//         </div>
//         <div>
//           <Routes>
//             <Route path="/account" element={<Account />} />
//             <Route path="/movie" element={<Movie />} />
//             <Route path="/cinema" element={<Cinema />} />
//             <Route path="/news" element={<News />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/discount" element={<Discount />} />
//             <Route path="/coming" element={<Coming />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './manager/homepos';
// import Movies from './manager/moviespos';
// import Products from './manager/productspos';
// import MovieDetails from './manager/moviedetails';  
// import SeatSelectorPOS from './manager/seatselectorpos';
// import ConfirmPOS from './manager/confirmpos';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/movies" element={<Movies />} />
//           <Route path="/products" element={<Products />} /> 
//           <Route path="/moviedetails/:movieId" element={<MovieDetails />} />
//           <Route path="/seatselector" element={<SeatSelectorPOS />} />
//           <Route path="/confirmpos" element={<ConfirmPOS />} />
//           {/* Thêm các route khác nếu cần */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./customer/login";
import Account from "./customer/account";
import PrivateRoute from "./privateRoute";

// Admin
import AdminHome from "./admin/home";
import ProductAdmin from "./admin/product";

// Manager
import ManagerHome from "./manager/homepos";
import ConfirmPOS from "./manager/confirmpos";

// Customer
import CustomerHome from "./customer/home";
import BookTicket from "./customer/bookticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <ProductAdmin />
            </PrivateRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager/home"
          element={
            <PrivateRoute allowedRoles={["Manager"]}>
              <ManagerHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager/confirm"
          element={
            <PrivateRoute allowedRoles={["Manager"]}>
              <ConfirmPOS />
            </PrivateRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoles={["Customer"]}>
              <CustomerHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PrivateRoute allowedRoles={["Customer"]}>
              <BookTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute allowedRoles={["Customer", "Admin", "Manager"]}>
              <Account />
            </PrivateRoute>
          }
        />

        {/* Redirect mặc định */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


