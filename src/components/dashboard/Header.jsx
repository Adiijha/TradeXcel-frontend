import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice.js';
import Cookies from 'js-cookie';
import logo from '../../assets/logo-full-bg.png';
import profile from '../../assets/profile.png';
import alert from '../../assets/alerts.png';
import wallet from '../../assets/wallet.png';
import wallet_w from '../../assets/wallet-w.png';
import alert_w from '../../assets/alerts-w.png';
import dark from '../../assets/dark.png';
import lighty from '../../assets/light-y.png';

function Header({ darkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    dispatch(logout());
    window.location.href = '/';
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`w-full h-16 md:h-20 flex justify-between items-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-grey text-black'
      } px-4 transition-all duration-300`}
    >
      {/* Logo */}
      <Link to="/dashboard">
        <div
          className={`flex flex-row gap-3 py-2 text-xl md:text-3xl font-bold font-pop ${
            darkMode ? 'text-blue-400' : 'text-blue-900'
          }`}
        >
          <img className="h-7 w-7 md:w-10 md:h-10" src={logo} alt="Logo" />
          <div className="hidden md:flex pt-1">TradeXcel</div>
        </div>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-xl bg-transparent border-0 cursor-pointer md:mr-4"
        >
          <img
            src={darkMode ? lighty : dark}
            alt={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>

        {/* Navigation */}
        <ul className="flex items-center font-pop font-medium text-md gap-1 md:gap-6">
          <Link to="/alerts">
            <li
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === '/alerts'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'text-white'
                  : 'text-black'
              } transition-all duration-300`}
            >
              <img
                className="w-6 h-6 sm:w-8 sm:h-8"
                src={location.pathname === '/alerts' || darkMode ? alert_w : alert}
                alt="Alerts"
              />
              <span className="hidden sm:inline ml-2">Alerts</span>
            </li>
          </Link>

          <Link to="/wallet">
            <li
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === '/wallet'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'text-white'
                  : 'text-black'
              } transition-all duration-300`}
            >
              <img
                className="w-6 h-6 sm:w-8 sm:h-8"
                src={location.pathname === '/wallet' || darkMode ? wallet_w : wallet}
                alt="Wallet"
              />
              <span className="hidden sm:inline ml-2">Wallet</span>
            </li>
          </Link>
        </ul>

        {/* Profile Picture */}
        <div
          ref={menuRef}
          className="relative"
        >
          <div
            onClick={handleProfileClick}
            className={`rounded-full ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } w-10 h-10 md:w-12 md:h-12 cursor-pointer overflow-hidden`}
          >
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className={`absolute right-0 mt-2 w-32 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
              } rounded-md shadow-lg z-10`}
            >
              <ul className="flex flex-col text-sm font-pop">
                <Link to="/edit-profile">
                  <li
                    className={`p-2 cursor-pointer ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    Edit Profile
                  </li>
                </Link>
                <li
                  onClick={handleLogout}
                  className={`p-2 cursor-pointer ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
