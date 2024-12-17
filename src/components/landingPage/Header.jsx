import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-full-bg.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className="flex items-center justify-between w-full h-16 md:h-20 py-2 px-8 md:p-6 md:px-16 font-pop">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center gap-12">
        <Link to="/">
          <div className="flex flex-row gap-3 py-2 text-xl md:text-3xl font-bold text-blue-900">
            <img className="h-7 w-7 md:w-10 md:h-10" src={logo} alt="Logo" />
            <div className="hidden md:flex mt-1">TradeXcel</div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-8 text-gray-400">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/why-us">Why Us?</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* Right Section: Sign Up and Sign In Buttons */}
      <div className="hidden lg:flex gap-6 items-center">
        <Link
          to="/signup"
          className="border-2 px-7 py-2 rounded-lg text-btn-blue border-transparent hover:bg-gray-100 text-sm text-center"
        >
          Sign Up
        </Link>

        <Link to="/signin">
          <button className="border-2 py-2 px-7 rounded-lg bg-btn-blue border-transparent hover:bg-blue-500 text-white text-sm">
            Sign In
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-gray-400 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-full h-screen bg-white z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end mr-16 p-4">
          <button onClick={toggleMenu} aria-label="Close navigation menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col items-center space-y-6 mt-8 text-gray-400">
          <li>
            <Link to="/about" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/why-us" onClick={closeMenu}>
              Why Us?
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contactus" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/signup"
              className="border-2 px-7 py-2 rounded-lg text-btn-blue border-transparent text-sm text-center"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </li>
          <li className="my-2">
            <Link to="/signin" onClick={closeMenu}>
              <button className="border-2 py-2 px-7 rounded-lg bg-btn-blue border-transparent text-white text-sm">
                Sign In
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
