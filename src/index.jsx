// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// // import Home from './customer/home';
// import Navbar from './customer/navbar';
// import Cinema from './customer/cinema';
// import Products from './customer/product';
// import News from './customer/news';
// import Account from './customer/account'; 
// import HomeAdmin from './admin/home'
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       {/* <Navbar /> */}
//       <HomeAdmin />
//       <Routes>
//         {/* <Route path="/" element={<Home />} />
//         <Route path="/cinema" element={<Cinema />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/news" element={<News />} />
//         <Route path="/account" element={<Account />} />
//         <Route path="*" element={<Navigate to="/" />} /> */}
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

