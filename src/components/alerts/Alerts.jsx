import React from 'react'
import Header from '../dashboard/Header'
import Vheader from '../dashboard/Vheader'
import ComingSoon from '../error/ComingSoon'
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../context/ThemeContext.jsx";


function Alerts() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className={darkMode ? "bg-gray-800 text-white min-h-screen transition-all duration-300" : "bg-white text-black min-h-screen transition-all duration-300"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex">
        <Vheader darkMode={darkMode}/>
        <ComingSoon darkMode={darkMode} />
      </div>
      </div>
    </>
  )
}

export default Alerts