import React from 'react'
import Header from './Header'
import Vheader from './Vheader'
import ComingSoon from '../error/ComingSoon'
import { useState, useEffect } from "react";

function EditProfile() {
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
      <div className="flex">
        <Vheader darkMode={darkMode}/>
        <ComingSoon darkMode={darkMode} />
      </div>
      </div>
    </>

  )
}

export default EditProfile