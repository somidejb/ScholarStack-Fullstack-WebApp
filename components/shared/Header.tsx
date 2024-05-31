"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import NavItems from './NavItems';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

// The Header component is responsible for rendering the top navigation bar
const Header = () => {
  // isMobileMenuOpen state variable is used to keep track of whether the mobile menu is open or not
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // toggleMobileMenu function is used to toggle the value of isMobileMenuOpen state variable
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // The useEffect hook is used to add and remove an event listener for the resize event
  // It is used to close the mobile menu when the window width is greater than or equal to 768 pixels
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { 
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="w-full border-b h-[87px] bg-[#31457b] relative">
      {/* Mobile menu backdrop is used to close the mobile menu when clicked */}
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-full w-full flex justify-between items-center relative z-50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            {/* The Scholar Stack logo is displayed */}
            <Image
              src="/assets/images/scholarstacklogo.png"
              alt="ScholarStackLogo"
              width={37.38}
              height={35}
            />
            <h2 className="text-[24px] text-white font-semibold font-['PT_Serif']">
              Scholar Stack
            </h2>
          </Link>
        </div>

        {/* The hamburger menu is displayed for mobile and small devices */}
        <div className="md:hidden flex items-center gap-2">
          <SignedOut>
            <div className="block md:hidden">
              {/* The user's profile picture is displayed */}
              <Image
                src="/assets/images/profile-icon.png"
                alt="Placeholder profile picture"
                width={27}
                height={24}
                className="rounded-full"
              />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="block md:hidden">
              {/* The user button component is used to display the user's profile and sign out functionality */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          {/* The hamburger menu button is used to toggle the mobile menu */}
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* The navigation items are displayed for medium and larger devices */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavItems />
        </nav>

        {/* The responsive buttons are displayed */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            {/* The login button is used to navigate to the sign-in page */}
            <Link href="/sign-in">
              <Button className="rounded-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white">
                <h2 className="text-black text-sm sm:text-base">Login</h2>
              </Button>
            </Link>
            {/* The sign up button is used to navigate to the sign-up page */}
            <Link href="/sign-up">
              <Button className="rounded-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#007bff]">
                <h2 className="text-white text-sm sm:text-base">Sign Up</h2>
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="hidden md:flex items-center">
              {/* The user button component is used to display the user's profile and sign out functionality */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* The mobile menu content is displayed when the mobile menu is open */}
      {isMobileMenuOpen && (
        <div className="absolute bg-white w-[248px] h-screen top-[87px] right-0 z-50 p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pl-5">
              {/* The mobile Scholar Stack logo is displayed */}
              <Image
                src="/assets/images/mobilelogo.png"
                alt="ScholarStackLogo"
                width={24}
                height={25}
              />
              <h2 className="text-[24px] text-[#31457b] font-semibold font-['PT_Serif']">
                Scholar Stack
              </h2>
            </div>
            <MobileNav />
          </div>
          <div className="flex flex-col gap-3 border-t pt-4">
            <SignedOut>
              {/* The login button is used to navigate to the sign-in page */}
              <Link href="/sign-in">
                <Button className="rounded-lg w-full px-4 py-3 bg-white">
                  <h2 className="text-black text-sm">Login</h2>
                </Button>
              </Link>
              {/* The sign up button is used to navigate to the sign-up page */}
              <Link href="/sign-up">
                <Button className="rounded-lg w-full px-4 py-3 bg-[#007bff]">
                  <h2 className="text-white text-sm">Sign Up</h2>
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;