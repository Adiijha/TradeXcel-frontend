import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from "../../assets/home.png";
import leaderboard from "../../assets/leaderboard.png";
import market from "../../assets/market.png";
import portfolio from "../../assets/portfolio.png";
import contest from "../../assets/contest.png";
import faq from "../../assets/faq.png";
import home_w from "../../assets/home-w.png";
import leaderboard_w from "../../assets/leaderboard-w.png";
import market_w from "../../assets/market-w.png";
import portfolio_w from "../../assets/portfolio-w.png";
import contest_w from "../../assets/contest-w.png";
import faq_w from "../../assets/faq-w.png";

function Vheader({ darkMode }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const location = useLocation(); // Hook to get the current location

  // Define the menu items
  const menuItems = [
    { name: "Home", path: "/dashboard", icon: home, activeIcon: home_w },
    { name: "Portfolio", path: "/portfolio", icon: portfolio, activeIcon: portfolio_w },
    { name: "Contest", path: "/contest", icon: contest, activeIcon: contest_w },
    { name: "Market", path: "/market", icon: market, activeIcon: market_w },
    { name: "Leaderboard", path: "/leaderboard", icon: leaderboard, activeIcon: leaderboard_w },
    { name: "FAQ", path: "/faq", icon: faq, activeIcon: faq_w },
  ];

  // Filter out FAQ for mobile screens
  const filteredMenuItems = menuItems.filter(item => !(item.name === 'FAQ' && window.innerWidth < 1024));

  return (
    <div
      className={`relative ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-grey text-black'
      } font-pop transition-all duration-300`}
    >
      {/* Menu Items (Desktop: Vertical, Mobile: Horizontal) */}
      <div>
        {/* For Mobile (Horizontal Row with only 5 items) */}
        <div className="lg:hidden fixed bottom-0 w-full z-10">
          <div
            className={`flex justify-around items-center py-2 ${
              darkMode ? 'bg-gray-900' : 'bg-grey'
            }`}
          >
            {filteredMenuItems.map((item) => (
              <Link to={item.path} key={item.name} className="flex flex-col items-center">
                <span
                  className={`flex flex-col items-center ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-transparent text-white'
                      : 'bg-transparent text-black'
                  } p-2 rounded-lg transition-all duration-300 ease-in-out`}
                >
                  <img
                    src={darkMode ? item.activeIcon : location.pathname === item.path ? item.activeIcon : item.icon}
                    alt={item.name}
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ease-in-out ${
                      location.pathname === item.path ? 'scale-110' : ''
                    }`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium mt-1 ${
                      darkMode ? 'text-white' : location.pathname === item.path ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.name}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* For Desktop (Vertical Menu) */}
      <div
        className={`hidden md:block h-full text-center transition-all duration-500 ${
          menuOpen ? 'w-48' : 'w-16'
        } overflow-hidden`}
      >
        <div className="flex flex-col items-center pb-6 font-bold text-2xl">
          <button
            className="focus:outline-none p-2 self-start"
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-black'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul>
            <li className={`p-2 pt-6 ${menuOpen ? '' : 'flex justify-center'}`}>
              {menuOpen ? (
                <div className="flex flex-col justify-center text-center gap-6 text-lg">
                  {menuItems.map((item) => (
                    <Link to={item.path} key={item.name}>
                      <span
                        className={`text-lg font-medium text-center flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ease-in-out ${
                          location.pathname === item.path
                            ? 'bg-blue-500 text-white'
                            : darkMode
                            ? 'bg-transparent text-white'
                            : 'bg-transparent text-black'
                        }`}
                      >
                        <img
                          src={darkMode ? item.activeIcon : location.pathname === item.path ? item.activeIcon : item.icon}
                          alt={item.name}
                          className="w-6 h-6 transition-all duration-300 ease-in-out"
                        />
                        <span className="hidden md:inline">{item.name}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  {menuItems.map((item) => (
                    <Link to={item.path} key={item.name}>
                      <img
                        src={darkMode ? item.activeIcon : location.pathname === item.path ? item.activeIcon : item.icon}
                        alt={item.name}
                        className={`m-1 mb-5 p-2 rounded-lg transition-all duration-500 ease-in-out ${
                          location.pathname === item.path
                            ? 'bg-blue-500 w-10 h-10 transform scale-110'
                            : 'w-11 h-11'
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Vheader;

