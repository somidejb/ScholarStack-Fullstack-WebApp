import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

// The Header component is responsible for rendering the top navigation bar
const Header = () => {
  return (
    <header className="w-full border-b h-[64px] md:h-[85px] lg:h-[87px] h bg-[#31457b] relative">
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

        {/* The navigation items are displayed for medium and larger devices */}
        <SignedIn>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
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
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
