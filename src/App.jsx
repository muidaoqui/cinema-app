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
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
