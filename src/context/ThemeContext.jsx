import React, { createContext, useState, useEffect } from "react";

// Create the Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    return savedMode;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // Set the theme on component mount or when darkMode changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context for consumption
export default ThemeContext;
