
import React from 'react';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { RxDividerVertical } from "react-icons/rx";
import { useTheme } from './ThemeContext.jsx';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-[#E8E9EB] dark:bg-gray-800 p-4 my-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <img src=".\src\assets\Job Finder.png" className="w-40 h-20" alt="Logo" />
          <ul className="flex items-center">
            <li>
              <a href="#findJobs" className="hover:underline transition duration-300 dark:text-white">
                Find Jobs
              </a>
            </li>
          </ul>
        </div>
        
        {/* Right Section */}
        <ul className="flex items-center space-x-6 text-black dark:text-white">
          <li>
            <a href="#home" className="hover:underline transition duration-300">
              Browse
            </a>
          </li>
          <div className="flex items-center space-x-2">
            <li>
              <a href="#Signin" className="hover:underline transition duration-300">
                Sign In
              </a>
            </li>
            <RxDividerVertical className="text-2xl" />
            <li>
              <a href="#Signup" className="hover:underline transition duration-300">
                Sign Up
              </a>
            </li>
          </div>
          <button
            onClick={toggleTheme}
            className="fixed top-9 right-5 bg-white dark:bg-gray-700 border-none p-3 h-8 w-14 rounded-2xl cursor-pointer shadow-md transition-colors duration-300 ease-in-out z-[9999] text-2xl"
          >
            {theme === 'dark' ? (
              <MdDarkMode className="text-white text-sm" />
            ) : (
              <MdOutlineLightMode className="text-yellow-500 text-sm" />
            )}
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
