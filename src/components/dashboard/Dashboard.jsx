import React from "react";
import { useState, useEffect, useContext } from "react";
import Header from "./Header.jsx";
import Vheader from "./Vheader.jsx";
import MainContent from "./MainContent.jsx";
import ThemeContext, { ThemeProvider } from "../../context/ThemeContext.jsx";


function Dashboard() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
    <ThemeProvider>
      <div className={darkMode ? "bg-gray-800 text-white min-h-screen transition-all duration-300" : "bg-white text-black min-h-screen transition-all duration-300"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex ">
        <Vheader darkMode={darkMode}  />
        <MainContent darkMode={darkMode} />
      </div>
      </div>
      </ThemeProvider>
    </>
  );
}

export default Dashboard;
