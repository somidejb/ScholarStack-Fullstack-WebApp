import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <>
      {/* Primary Header */}
      <header className="w-full border-b" style={{ backgroundColor: '#081f5c' }}>
        <div className="flex items-center justify-between max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          
          {/* Logo and Main Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/assets/images/logo.png" alt="Logo" className="h-8"/>
              <span className="text-xl text-white font-semibold">Scholar Stack</span>
            </Link>
          </div>

          {/* Main Navigation Links */}
          <nav className="md:flex hidden space-x-3">
            <Link href="/" className="text-lg font-medium text-white">Home</Link>
            <Link href="/books" className="text-lg font-medium text-white">Books</Link>
            <Link href="/upload" className="text-lg font-medium text-white">UploadBooks</Link>
            <Link href="/community" className="text-lg font-medium text-white">Community</Link>
          </nav>

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-3">
            <SignedOut>
              <Button asChild className="rounded-full" size="lg" style={{ width: 113, height: 55, borderRadius: 15, backgroundColor: 'white' }}>
                <Link className="text-black" href="/sign-in">
                  Login
                </Link>
              </Button>
              <Button asChild className="rounded-full" size="lg" style={{ width: 113, height: 55, borderRadius: 15, backgroundColor: 'blue' }}>
                <Link className="text-white" href="/sign-up">
                  Sign Up
                </Link>
              </Button>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div> {/* Placeholder for profile picture button */}
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Signed-In Navigation Header */}
      <SignedIn>
        <div className="w-full border-b" style={{ backgroundColor: '#081f5c', marginTop: '-1px' }}>
          <div className="flex items-center justify-between max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
            
            {/* Logo and Secondary Navigation Links */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/assets/images/logo.png" alt="Logo" className="h-8"/>
                <span className="text-xl text-white font-semibold">Scholar Stack</span>
              </Link>
              <Link href="/" className="text-lg font-medium text-white">Home</Link>
              <Link href="/books" className="text-lg font-medium text-white">Books</Link>
              <Link href="/upload" className="text-lg font-medium text-white">UploadBooks</Link>
              <Link href="/community" className="text-lg font-medium text-white">Community</Link>
            </div>

            {/* User Profile Button */}
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default Header
