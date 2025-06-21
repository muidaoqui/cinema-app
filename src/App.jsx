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

// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các component
import NavBar from './customer/navbar';
import Home from './customer/home';
import Cinema from './customer/cinema';
import News from './customer/news';
import Product from './customer/product';
import Account from './customer/account';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/news" element={<News />} />
          <Route path="/product" element={<Product />} />
          <Route path="/account" element={<Account />} />
          {/* Trang fallback nếu không khớp route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
