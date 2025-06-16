import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './admin/themecontext'; // Import ThemeProvider
import NavbarAdmin from './admin/navbar';
import Account from './admin/home';
import Movie from './admin/movie';
import Cinema from './admin/cinema';
import ToolBar from './admin/toolbar'
function App() {
  return (
    <ThemeProvider> {/* Bọc các component con bằng ThemeProvider */}
      <BrowserRouter>
        <div >
          <ToolBar />
          <NavbarAdmin />
        </div>
        <div>
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/cinema" element={<Cinema />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;