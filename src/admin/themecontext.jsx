import React, { createContext, useState, useContext } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd'; 

const ThemeContext = createContext(); 

export const useTheme = () => useContext(ThemeContext); 

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light'); 
  const { darkAlgorithm, defaultAlgorithm } = antdTheme; 

  const changeTheme = (checked) => {
    setCurrentTheme(checked ? 'dark' : 'light');
  };

  const algorithm = currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      <ConfigProvider theme={{ algorithm }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};