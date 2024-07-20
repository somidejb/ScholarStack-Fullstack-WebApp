"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsMenuButton, BsList } from "react-icons/bs"; // Hamburger icon
import { RxFileText } from "react-icons/rx";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-blue-900 p-3" // Reduced padding
      >
        <BsList className="h-5 w-5" /> {/* Reduced size */}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-56 h-screen shadow-md md:translate-x-0 md:relative md:w-64 md:shadow-none z-50`} // Reduced width
        style={{ top: '0px' }} // Adjust this value to move the sidebar down from the top
      >
        <div className="p-4 sm:p-6 md:p-9">
          <div className="flex items-center justify-between mb-5">
            {/* Close button */}
            <button
              onClick={toggleSidebar}
              className="text-blue-900 md:hidden text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2"
            >
              <BsList className="h-5 w-5" /> {/* Reduced size */}
              <span>Administration</span>
            </button>
          </div>

          <nav className="h-full">
            <div className="hidden sm:flex">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 items-center mb-8 flex items-center gap-2">
                <BsMenuButton className="h-5 w-5" /> {/* Reduced size */}
                <span>Administration</span>
              </h2>
            </div>
            <ul>
              <li className={`mb-3 sm:mb-4 md:mb-5 ${pathname === '/dashboard' ? 'font-bold' : ''}`}>
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 sm:gap-3 hover:text-blue-900">
                    <BsMenuButton className='h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7' /> {/* Reduced size */}
                    <span className="text-sm sm:text-base md:text-lg">Dashboard</span>
                  </div>
                </Link>
              </li>
              <li className={`${pathname === '/reports' ? 'font-bold' : ''}`}>
                <Link href="/reports">
                  <div className="flex items-center gap-2 sm:gap-3 hover:text-blue-900">
                    <RxFileText className='h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7' /> {/* Reduced size */}
                    <span className="text-sm sm:text-base md:text-lg">Reports</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'ml-56' : ''} md:ml-0`}> {/* Adjusted margin */}
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default Sidebar;
