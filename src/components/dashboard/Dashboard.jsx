import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice.js";
import Cookies from "js-cookie";
import Header from "./Header.jsx";
import Vheader from "./Vheader.jsx";
import MainContent from "./MainContent.jsx";


function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <>
      <div className={darkMode ? "bg-gray-800 text-white min-h-screen transition-all duration-300" : "bg-white text-black min-h-screen transition-all duration-300"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex ">
        <Vheader darkMode={darkMode}  />
        <MainContent darkMode={darkMode} />
      </div>
      </div>
    </>
  );
}

export default Dashboard;
