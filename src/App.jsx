import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './customer/home';
import Cinema from './customer/cinema';
import Product from './customer/product';
import News from './customer/news';
import Account from './customer/account';
import Navbar from './customer/navbar';
import Detail from './customer/detail';
import SeatSelector from './customer/seatselector'; 
import BookTicket from './customer/bookticket';

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/products" element={<Product />} />
          <Route path="/news" element={<News />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/seatselector/:id" element={<SeatSelector />} />
          <Route path="/bookticket" element={<BookTicket />} />

        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;

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