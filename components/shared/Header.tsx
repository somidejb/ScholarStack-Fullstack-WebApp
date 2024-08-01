"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation'; // Use next/navigation instead

const Header = () => {
  const pathname = usePathname(); // Get the current pathname

  // Ensure pathname is safely handled
  const safePathname: string = pathname || '';

  return (
    <header className="w-full border-b h-[64px] md:h-[85px] bg-[#31457b] relative">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-full w-full flex justify-between items-center relative z-50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/scholarstacklogo.png"
              alt="ScholarStackLogo"
              width={37.38}
              height={35}
            />
            <h2 className="text-[12px] md:text-[15px] lg:text-[24px] text-white font-semibold font-['PT_Serif']">
              ScholarStack
            </h2>
          </Link>
        </div>

        <SignedIn>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {/* Conditional rendering and type assertion combined */}
            {pathname !== null && <NavItems pathname={safePathname} />}
          </nav>
        </SignedIn>

        <div className="flex items-center">
          <SignedIn>
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <MobileNav />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-3">
              <Button asChild className="rounded-full bg-white" size="lg">
                <Link href="/sign-in">
                  <h2 className="text-black text-sm">Login</h2>
                </Link>
              </Button>
              <Button asChild className="rounded-full bg-[#007bff]" size="lg">
                <Link href="/sign-up">
                  <h2 className="text-white text-sm">Sign Up</h2>
                </Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
