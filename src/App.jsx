import React from 'react';
import { ThemeProvider } from './admin/themecontext'; // Import ThemeProvider
import NavbarAdmin from './admin/navbar';
import HomeAdmin from './admin/home';
import ToolBar from './admin/toolbar'
function App() {
  return (
    <ThemeProvider> {/* Bọc các component con bằng ThemeProvider */}
      <div> {/* Sử dụng flex để Navbar và HomeAdmin nằm cạnh nhau */}
        <ToolBar />
        <NavbarAdmin />
        <HomeAdmin />
      </div>
    </ThemeProvider>
  );
}

export default App;