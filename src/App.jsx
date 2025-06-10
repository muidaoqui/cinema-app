import React from 'react';
import { ThemeProvider } from './admin/themecontext'; // Import ThemeProvider
import NavbarAdmin from './admin/navbar';
import HomeAdmin from './admin/home';

function App() {
  return (
    <ThemeProvider> {/* Bọc các component con bằng ThemeProvider */}
      <div> {/* Sử dụng flex để Navbar và HomeAdmin nằm cạnh nhau */}
        <NavbarAdmin />
        <HomeAdmin />
      </div>
    </ThemeProvider>
  );
}

export default App;