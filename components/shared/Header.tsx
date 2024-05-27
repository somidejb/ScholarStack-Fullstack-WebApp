"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import NavItems from './NavItems';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Adjusted to match the md breakpoint
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
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-full w-full flex justify-between items-center relative z-50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
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

        {/* Hamburger menu for mobile and small devices */}
        <div className="md:hidden flex items-center">
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

        {/* Navigation items for medium and larger devices */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavItems />
        </nav>

        {/* Responsive buttons */}
        <div className="hidden md:flex items-center mt-1 gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button className="rounded-[15px] w-[113px] h-[55px] bg-white">
                <h2 className="text-black">Login</h2>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-[15px] w-[113px] h-[55px] bg-[#007bff]">
                <h2 className="text-white">Sign Up</h2>
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMobileMenuOpen && (
        <div className="absolute bg-white w-[248px] h-screen top-[87px] right-0 z-50 p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pl-5">
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
              <Link href="/sign-in">
                <Button className="rounded-[15px] w-full h-[55px] bg-white border border-gray-300">
                  <h2 className="text-black">Login</h2>
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="rounded-[15px] w-full h-[55px] bg-[#007bff]">
                  <h2 className="text-white">Sign Up</h2>
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
